<?php
try{
    $con = new PDO("mysql:host=localhost;dbname=portfolio;charset:utf8", 'root', 'root');
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if(isset($_POST['skills']) && isset($_POST['projet'])){
        $sql = $con -> prepare("SELECT * FROM skills");
        $sql -> execute();
        $skills = $sql -> fetchAll(PDO::FETCH_ASSOC);
        $i=1;
        echo '<div id=\'skillExistant\'>';
        foreach($skills as $skill){
            if(!in_array($skill['nom'], $_POST['skills'])){
                echo '  <div class=\'skill\'>
                            <label for=\'skill'.$i.'\'>'.$skill['nom'].'</label>
                            <input type=\'checkbox\' id=\'skill'.$i.'\'>
                        </div>';
                $i++;
            }
        }
        echo '</div>';
    }else{
        echo 'Erreure lors de la demande.';
    }
}
catch(PDOException $e){
    echo "Erreur : ".$e->getMessage();
}