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
                    Retour au site
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
                try{
                    ?>
                    <button class='ajouterProjet'><h1>Ajouter un projet</h1></button>
                    <?php
                    $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
                    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $sql = $conn -> prepare('SELECT * FROM projets');
                    $sql -> execute();
                    $projets = $sql -> fetchAll(PDO::FETCH_ASSOC);
                    foreach($projets as $projet){
                        ?>
                        <div class='projet'>
                            <div class='nom'>
                                <h2><?=$projet['name']?></h2>
                                <button id='modifierTitre' class='modifier'>[modifier]</button>
                            </div>
                            <h3>Photos</h3>
                            <div class='photos'>
                                <?php
                                $photos = $projet['photos'];
                                $listePhotos = explode(',', $photos);
                                foreach($listePhotos as $photo){
                                    $image = explode(' ', $photo);
                                    ?>
                                    <div class='conteneurPhoto'>
                                        <img src='../img/<?= $image[0] ?>' alt='<?= $image[1] ?>' title='<?= $image[1] ?>' class='photo'>
                                        <button class='suppression'>X</button>
                                    </div>
                                    <?php
                                }
                                ?>
                                <div id = 'ajoutImage' class='conteneurPhoto ajout'>
                                    <label for='newPhoto'>
                                        <img src='../img/Logo ajouter image.svg' alt='logo ajouter image' class='photo'>
                                    </label>
                                    <input type='file' name='newPhoto' id='newPhoto'>
                                </div>
                            </div>
                            <h3>Compétences</h3>
                            <div class='competences'>
                                <?php
                                $skills = $projet['skills'];
                                $listeSkills = explode(',', $skills);
                                foreach($listeSkills as $skill){
                                    ?>
                                    <div class='conteneurLogo'>
                                        <img src='../img/<?= $skill?> logo blanc.svg' alt='<?= $skill ?>' title='<?= $skill ?>' class='logo'>
                                        <button class='suppression'>X</button>
                                    </div>
                                    <?php
                                }
                                ?>
                                <div class='conteneurLogo ajout'>
                                    <label for='newLogo'>
                                        <img src='../img/Logo ajouter image.svg' alt='logo ajouter image' class='logo'>
                                    </label>
                                    <input type='file' name='newLogo' id='newLogo'>
                                </div>
                            </div>
                            <h3>Réalisation</h3>
                            <div class='equipe'>
                                <?php
                                $team = $projet['team'];
                                $listeTeam = explode('#', $team);
                                ?>
                                <p><?=$listeTeam[0]?><a href='<?=explode('@', $listeTeam[1])[1]?>'><?=explode('@', $listeTeam[1])[0]?></a></p>
                                <button class='modifier'>[modifier]</button>
                            </div>
                        </div>
                        <?php  
                    }
                }
                catch(PDOException $e){
                    echo "Erreur : ".$e->getMessage();
                }
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