<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/backoffice.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="../js/backoffice.js" defer></script>
    </head>
    <body>
        <header>
            <a href="../index.html">
                <p>
                    Go back
                </p>
            </a>
            
            <?php

            if(isset($_SESSION['name'])){

                ?>

                <button id = 'connection' formaction='deconnection.php'>
                    Se déconnecter
                </button>

                <?php
            } 
            
            ?>
        </header>
        <main>
            <?php

            if(isset($_SESSION['name'])){
                echo 'Ceci est le backOffice';
            }else{

            ?>
                
                <div id='formulaire'>
                    <p id='text'>
                        Page réservée aux administrateurs.<br>
                        Merci de vous connecter avant de continuer.
                    </p>
                    <div>
                        <label>
                            <p>mail</p>
                        </label>
                        <input type='mail' id='mail' name='mail'>
                    </div>
                    <div>
                        <label>
                            <p>mot de passe</p>
                        </label>
                        <input type='password' id='password' name='password'>
                    </div>
                    <button id='connection'>
                        <p>Connection</p>
                    </button>
                </div>
            
            <?php

            }

            ?>
        </main>
    </body>
</html>