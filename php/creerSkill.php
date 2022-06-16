<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($_POST['nom']) && isset($_POST['projet']) && isset($_POST['changement'])){
        if($_POST['changement'] == 'non'){
            $sql = $con -> prepare("INSERT INTO skills(nom)
                                    VALUE(:nom)");
            $sql -> bindParam(':nom', $_POST['nom']);
            $sql -> execute();
        }
        if(isset($_FILES['file'])){
            if (is_uploaded_file($_FILES['file']['tmp_name'])){
                if (move_uploaded_file($_FILES['file']['tmp_name'], '../img/'.basename($_FILES['file']['name']))){
                    $sql = $con -> prepare("UPDATE skills
                                            SET image = :image
                                            WHERE nom = :nom");
                    $sql -> bindParam(':image', $_FILES['file']['name']);
                    $sql -> bindParam(':nom', $_POST['nom']);
                    $sql -> execute();
                }else{
                    echo 'Erreur lors de l\'ajout de l\'image.';
                }
            }else{
                echo 'Erreur lors du téléchargement de l\'image.';
            }
        }
        if($_POST['changement'] == 'non'){
            $sql = $con -> prepare("SELECT * FROM projets
                                    WHERE name = :name");
            $sql -> bindParam(':name', $_POST['projet']);
            $sql -> execute();
            $projets = $sql -> fetchAll(PDO::FETCH_ASSOC);
            if(count($projets) == 1){
                $projet = $projets[0];
                $listeCompetences = explode(',', $projet['skills']);
                array_push($listeCompetences, $_POST['nom']);
                $nouvelleCompetences = $listeCompetences[0];
                for($i=1; $i<count($listeCompetences); $i++){
                    $nouvelleCompetences = $nouvelleCompetences.','.$listeCompetences[$i];
                }
                $sql = $con-> prepare(" UPDATE projets
                                        SET skills = :skills
                                        WHERE name = :name");
                $sql -> bindParam(':name', $_POST['projet']);
                $sql -> bindParam(':skills', $nouvelleCompetences);
                $sql -> execute();
                echo 'Compétence créée avec succès';
            }else{
                echo 'Erreure lors de la récupération du projet.';
            }
        }else{
            echo 'Compétence changée.';
        }
    }else{
        echo 'Erreure lors de la demande.';
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}