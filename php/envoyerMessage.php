<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($_POST['nom']) && isset($_POST['mail']) && isset($_POST['message'])){
        $nom = htmlspecialchars(stripslashes(trim($_POST['nom'])));
        $mail = htmlspecialchars(stripslashes(trim($_POST['mail'])));
        $message = htmlspecialchars(stripslashes(trim($_POST['message'])));
        $sql = $con -> prepare("INSERT INTO message(nom, mail, message)
                                VALUES(?, ?, ?)");
        $sql -> bindParam(1, $nom);
        $sql -> bindParam(2, $mail);
        $sql -> bindParam(3, $message);
        $sql -> execute();
        echo 'Le message a bien été envoyé.';
    }else{
        echo 'Tous les champs sont obligatoires.';
    }
    ;
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}