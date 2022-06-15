<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($_POST['projet']) && isset($_POST['name']) && isset($_POST['column']) && isset($_POST['supImage'])){
        $sql = $con -> prepare("SELECT * FROM projets
                                WHERE name = :name");
        $sql -> bindParam(':name', $_POST['projet']);
        $sql -> execute();
        $textes = $sql -> fetchAll(PDO::FETCH_ASSOC);
        if (count($textes) == 1){
            $texte = $textes[0][$_POST['column']];
            $listeImage = explode(',', $texte);
            $clef = array_search($_POST['name'], $listeImage);
            unset($listeImage[$clef]);
            $newTexte = array_shift($listeImage);
            for($i=0;$i<count($listeImage);$i++){
                $newTexte = $newTexte.','.$listeImage[$i];
            }
            $sql = $con -> prepare('UPDATE projets
                                    SET '.$_POST['column'].' = :newvalue
                                    WHERE name = :name');
            $sql -> bindParam(':newvalue', $newTexte);
            $sql -> bindParam(':name', $_POST['projet']);
            $sql -> execute();
            if($_POST['supImage'] == 'oui'){
                if(unlink('../img/'.explode(' ', $_POST['name'])[0])){
                    echo 'Image supprimé du dossier.';
                }else{
                    echo 'Erreure lors de la suppression de l\'image.';
                }
            }else{
                echo 'Succès';
            }
        }else{
            echo 'Erreure lors de la récupération de la colonne.';
        }
    }else{
        echo 'Erreure lors de l\'envoi de la demande.';
    }
    ;
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}