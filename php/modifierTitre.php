<?php
try{
    if(isset($_POST['titre']) && isset($_POST['nouveauTitre'])){
        $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare(' UPDATE projets
                                SET name = :newname
                                WHERE name = :name');
        $sql -> bindParam(':newname', $_POST['nouveauTitre']);
        $sql -> bindParam(':name', $_POST['titre']);
        $sql -> execute();
        echo 'Succès';  
    }else{
        echo "Erreur lors de la demande.";
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}