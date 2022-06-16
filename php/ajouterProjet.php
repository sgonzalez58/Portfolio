<?php
try{
    if(isset($_POST['titre'])){
        $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare(' INSERT INTO projets(name)
                                VALUE(:nom)');
        $sql -> bindParam(':nom', $_POST['titre']);
        $sql -> execute();
        echo 'Succès';
    }else{
        echo "Erreur lors de la demande.";
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}