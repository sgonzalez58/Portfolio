<?php
try{
    if(isset($_POST['projet']) && isset($_POST['archiver'])){
        $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = $conn->prepare(' UPDATE projets
                                SET archiver = :archiver
                                WHERE name = :name');
        $sql -> bindParam(':archiver', $_POST['archiver']);
        $sql -> bindParam(':name', $_POST['projet']);
        $sql -> execute();
        $mesProjets = $sql->fetchAll(PDO::FETCH_ASSOC);
        if($_POST['archiver'] == 'oui'){
            echo $_POST['projet'].' archivé.';
        }else{
            echo $_POST['projet'].' désarchivé.';
        }
    }else{
        echo "Erreur lors de l'envoi de fichier";
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}