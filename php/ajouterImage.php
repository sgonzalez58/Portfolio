<?php
try{
    if(isset($_POST['projet']) && isset($_FILES['file'])){
        $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare(' SELECT * FROM projets
                                WHERE name = :name');
        $sql -> bindParam(':name', $_POST['projet']);
        $sql -> execute();
        $mesProjets = $sql->fetchAll(PDO::FETCH_ASSOC);
        if(count($mesProjets) == 1){
            $projet = $mesProjets[0];  
            $photos = $projet['photos'].','.$_FILES['file']['name'].' '.$_POST['description'];
            if (is_uploaded_file($_FILES['file']['tmp_name'])){
                if (move_uploaded_file($_FILES['file']['tmp_name'], '../img/'.basename($_FILES['file']['name']))){
                    $sql = $conn ->prepare('UPDATE projets
                                            SET photos = :photo
                                            WHERE name = :name');
                    $sql -> bindParam(':photo', $photos);
                    $sql -> bindParam(':name', $_POST['projet']);
                    $sql -> execute();
                    echo 'Ajout réussie';
                }else{
                    echo 'Erreur lors de l\'ajout d\'image : \n';
                    print_r($_FILES);
                }
            }else{
                echo 'Problème lors du chargement du fichier : \n';
                echo $_FILES['file']['tmp_name'];
            }
        }else{
            echo "Erreur lors de la recherche de projet";
        }
        
    }else{
        echo "Erreur lors de l'envoi de fichier";
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}