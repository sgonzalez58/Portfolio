<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $con->query('SET NAMES utf8');
    if(isset($_POST['projet']) && isset($_POST['nomPartenaire']) && isset($_POST['lienPartenaire']) && isset($_POST['equipe']) && isset($_POST['nomFournisseur']) && isset($_POST['lienFournisseur']) && isset($_POST['maquette'])){
        $nouvelleRealisation = 'Réalisé '.$_POST['equipe'];
        if($_POST['equipe'] == 'en équipe'){
            $nouvelleRealisation = $nouvelleRealisation.' avec #'.$_POST['nomPartenaire'];
            if($_POST['lienPartenaire'] != ""){
                $nouvelleRealisation = $nouvelleRealisation.'@'.$_POST['lienPartenaire'];
            }
        }
        if($_POST['maquette'] == 'Fournie'){
            $nouvelleRealisation = $nouvelleRealisation.' avec une maquette fournie par #'.$_POST['nomFournisseur'];
            if($_POST['lienFournisseur'] != ""){
                $nouvelleRealisation = $nouvelleRealisation.'@'.$_POST['lienFournisseur'];
            }
        }
        $sql = $con -> prepare("UPDATE projets
                                SET team = :team
                                WHERE name = :nom");
        $sql -> bindParam(':team', $nouvelleRealisation);
        $sql -> bindParam(':nom', $_POST['projet']);
        $sql -> execute();
        echo 'Succès.';
    }else{
        echo 'Erreure lors de la demande.';
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}