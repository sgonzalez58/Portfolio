<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($_POST['competences']) && isset($_POST['projet'])){
        $sql = $con -> prepare("SELECT * FROM projets
                                WHERE name = :name");
        $sql -> bindParam(':name', $_POST['projet']);
        $sql -> execute();
        $projets = $sql -> fetchAll(PDO::FETCH_ASSOC);
        if(count($projets) == 1){
            $projet = $projets[0];
            if($projet["skills"] == '' || $projet["skills"] == null){
                $listeCompetences = [];
            }else{
                $listeCompetences = explode(',', $projet['skills']);
            }
            foreach($_POST['competences'] as $competence){
                if(!in_array($competence,$listeCompetences)){
                    array_push($listeCompetences, $competence);
                }else{
                    echo 'Une erreure interne est survenue. Veuillez contacter l\'administrateur';
                }
            }
            if($listeCompetences == []){
                $nouvelleCompetences = [];
            }else{
                $nouvelleCompetences = $listeCompetences[0];            
                for($i=1; $i<count($listeCompetences); $i++){
                    $nouvelleCompetences = $nouvelleCompetences.','.$listeCompetences[$i];
                }
            }
            $sql = $con-> prepare(" UPDATE projets
                                    SET skills = :skills
                                    WHERE name = :name");
            $sql -> bindParam(':name', $_POST['projet']);
            $sql -> bindParam(':skills', $nouvelleCompetences);
            $sql -> execute();
            echo 'Succès';
        }else{
            echo 'Erreure lors de la récupération du projet.';
        }
    }else{
        echo 'Erreure lors de la demande.';
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}