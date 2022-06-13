<?php
session_start();
if(isset($_SESSION['name'])){
    session_unset();
    echo 'Déconnection';
}else{
    try{
        if(isset($_POST['mail'])){
            $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = $conn->prepare(' SELECT * FROM users
                                    WHERE mail = :mail');
            $sql -> bindParam(':mail', $_POST['mail']);
            $sql -> execute();
            $mails = $sql->fetchAll(PDO::FETCH_ASSOC);
            if (count($mails) == 1){
                if(isset($_POST['password'])){
                    $sql = $conn -> prepare('   SELECT * FROM users
                                                WHERE mail = :mail AND password = :password');
                    $sql -> bindParam(':mail', $_POST['mail']);
                    $sql -> bindParam(':password', $_POST['password']);
                    $sql -> execute();
                    $mails = $sql -> fetchAll(PDO::FETCH_ASSOC);
                    if(count($mails) == 1){
                        $_SESSION['name'] = $mails[0]['name'];
                        echo 'Connection réussie';
                    }else{
                        echo 'Le mot de passe est incorrecte';
                    }
                }else{
                    echo 'Veuillez entrer votre mot de passe.';
                }
            }else if(count($mails) == 0){
                echo 'Ce mail ne correspond à aucun compte.';
            }else{
                echo 'Une erreure est survenue.';
            }
        }
        else{
            echo'Veuillez entrer votre mail';
        }
    }
    catch(PDOException $e){
        echo "Erreur : ".$e->getMessage();
    }
}