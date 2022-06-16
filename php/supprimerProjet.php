<?php
try{
    if(isset($_POST['nom'])){
        $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare(' DELETE FROM projets
                                WHERE name = :name');
        $sql -> bindParam(':name', $_POST['nom']);
        $sql -> execute();
        echo 'Succès';  
    }else{
        echo "Erreur lors de la demande.";
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}