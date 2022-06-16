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
        <?php
        if(isset($_SESSION['name'])){
            ?>
            <script src="../js/backoffice.js" defer></script>
            <?php
        }else{
            ?>
            <script src="../js/connection.js" defer></script>
            <?php
        }
        ?>
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
                <form method='post'>
                    <button type='submit' formaction='connection.php'>
                        Se déconnecter
                    </button>
                </form>

                <?php
            } 
            
            ?>
        </header>
        <main>
            <?php
            if(isset($_SESSION['name'])){
                try{
                    $conn = new PDO('mysql:host=localhost;dbname=portfolio;charset=utf8', 'root', 'root');
                    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $sql = $conn -> prepare('SELECT * FROM projets');
                    $sql -> execute();
                    $projets = $sql -> fetchAll(PDO::FETCH_ASSOC);
                    $sql = $conn -> prepare('SELECT * FROM skills');
                    $sql -> execute();
                    $skillList = $sql -> fetchAll(PDO::FETCH_ASSOC);
                    $skillnames = [];
                    foreach($skillList as $skillname){
                        array_push($skillnames, $skillname['nom']);
                    }
                    $j = 0;
                    foreach($projets as $projet){
                        ?>
                        <div class='projet'>
                            <div class='nom'>
                                <h2><?=$projet['name']?></h2>
                                <button class='modifier modifierTitre'>[modifier]</button>
                                <button class='supprimerProjet'>X</button>
                                <div class='archiverProjet'>
                                <?php 
                                if($projet['archiver'] == 'oui'){
                                    ?>
                                    <input type='checkbox' id='archiver<?=$j?>' class='archivage' checked>
                                <?php
                                }else{
                                    ?>
                                    <input type='checkbox' id='archiver<?=$j?>' class='archivage'>
                                <?php
                                }
                                ?>
                                    <label for='archiver<?=$j?>'></label>
                                </div>
                            </div>
                            <h3>Photos</h3>
                            <div class='photos'>
                                <?php
                                if($projet['photos'] != NULL){
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
                                }
                                ?>
                                <div class='conteneurPhoto ajout ajoutImage'>
                                    <label for='newPhoto<?=$j?>'>
                                        <img src='../img/Logo ajouter image.svg' alt='logo ajouter image' class='photo'>
                                    </label>
                                    <input type='file' name='newPhoto' id='newPhoto<?=$j?>'>
                                </div>
                            </div>
                            <h3>Compétences</h3>
                            <div class='competences'>
                                <?php
                                if($projet['skills'] != NULL){
                                    $skills = $projet['skills'];
                                    $listeSkills = explode(',', $skills);
                                    foreach($listeSkills as $skill){
                                        $key = array_search($skill, $skillnames);
                                        ?>
                                        <div class='conteneurLogo'>
                                            <img src='../img/<?= $skillList[$key]['image']?>' alt='<?= $skill ?>' title='<?= $skill ?>' class='logo'>
                                            <button class='suppression'>X</button>
                                        </div>
                                        <?php
                                    }
                                }
                                ?>
                                <div class='conteneurLogo ajout skillAjout'>
                                    <label for='newLogo'>
                                        <img src='../img/Logo ajouter image.svg' alt='logo ajouter image' class='logo'>
                                    </label>
                                </div>
                            </div>
                            <h3>Réalisation</h3>
                            <div class='equipe'>
                                <?php
                                $team = $projet['team'];
                                $listeTeam = explode(' avec', $team);
                                ?>
                                <p><?=$listeTeam[0]?>
                                <?php
                                    for($i=1; $i<count($listeTeam);$i++){
                                        $liste = explode('#', $listeTeam[$i]);
                                ?> 
                                        avec<?=$liste[0]?>
                                <?php
                                        $lien = explode('@', $liste[1]);
                                        if(count($lien) > 1){
                                ?>
                                            <a href='<?=$lien[1]?>'><?=$lien[0]?></a>
                                <?php
                                        }else{
                                ?>
                                            <?=$lien[0]?>
                                <?php
                                        }
                                    }
                                ?>
                                </p>
                                <button class='modifier modifierEquipe'>[modifier]</button>
                            </div>
                            <div class='cover'>
                                <p>archivé<p>
                            </div>
                        </div>
                        <?php  
                        $j++;
                    }
                    ?>
                    <button id='ajouterProjet'><h1>Ajouter un projet</h1></button>
                    <?php
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