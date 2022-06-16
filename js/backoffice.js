/****************************************************************/
/****************************************************************/
/***********************  Deconnection  *************************/
/****************************************************************/
/****************************************************************/



/****************************************************************/
/****************************************************************/
/**********************  Ajout d'image  *************************/
/****************************************************************/
/****************************************************************/


let suppression = document.getElementsByClassName('suppression');

let ajout = document.getElementsByClassName('ajout');
let ajoutImage = document.getElementsByClassName('ajoutImage');

for(let ii=0; ii<ajoutImage.length; ii++){
  ajoutImage[ii].addEventListener('dragover', (e)=>{
    e.preventDefault();
    ajoutImage[ii].style.transform = 'scale(1.2)';
  })

  ajoutImage[ii].addEventListener('dragleave', ()=>{
    ajoutImage[ii].style.transform = 'scale(1)';
  })

  ajoutImage[ii].addEventListener('drop', (e)=>{
    e.preventDefault();
    let fichier = e.dataTransfer.files[0];
    ajouterImage(fichier, ajoutImage[ii]);
    ajoutImage[ii].style.transform = 'scale(1)';
  })

  ajoutImage[ii].lastElementChild.addEventListener('change', ()=>{
    let fichier = ajoutImage[ii].lastElementChild.files[0];
    ajouterImage(fichier, ajoutImage[ii]);
  })
}

function ajouterImage(fichier, element){
  if(/image/.test(fichier.type)){
    let form_data = new FormData();
    form_data.append('file', fichier);
    let images = [];
    let replaceImage = 'non';
    let imageName = fichier.name;
    if(element.parentElement.children.length > 0){
      for(let mesImages = 0; mesImages < element.parentElement.children.length - 1; mesImages++){
        images.push(element.parentElement.children[mesImages].firstElementChild.getAttribute('src').split('/')[element.parentElement.children[mesImages].firstElementChild.getAttribute('src').split('/').length - 1]);
      }
    }
    if(images.includes(fichier.name)){
      let replaceImageChoice = window.confirm('Une image porte déjà ce nom. Souhaitez vous la remplacer ?');
      if (!replaceImageChoice){
        imageName = window.prompt('Veuillez entrer un nouveau nom.', imageName);
        if(imageName == '' || imageName == null){
          alert('Le fichier doit avoir un nom.');
          return;
        }else if(!imageName.includes('.')){
          if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'jpeg'){
            imageName = imageName.concat('.', 'jpg');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'png'){
            imageName = imageName.concat('.', 'png');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'webp'){
            imageName = imageName.concat('.', 'webp');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'svg+xml'){
            imageName = imageName.concat('.', 'svg');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'apng'){
            imageName = imageName.concat('.', 'apng');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'avif'){
            imageName = imageName.concat('.', 'avif');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'gif'){
            imageName = imageName.concat('.', 'gif');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'bmp'){
            imageName = imageName.concat('.', 'bmp');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'x-icon'){
            imageName = imageName.concat('.', 'ico');
          }else if(fichier.type.split('/')[fichier.type.split('/').length - 1] == 'tiff'){
            imageName = imageName.concat('.', 'tif');
          }
        }
      }else{
        replaceImage = 'oui';
      }
    }
    let description = window.prompt('Veuillez entrer une brêve description pour l\'image');
    if(description == null){
      alert('La description est obligatoire.')
      return;
    }
    form_data.append('description', description);
    form_data.append('projet', element.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    form_data.append('replaceImage', replaceImage);
    form_data.append('imageName', imageName);
    $.ajax({
      type: 'post',
      url: 'ajouterImage.php',
      contentType: false,
      processData: false,
      data: form_data,
      success:function(response){
        if(response == 'Ajout réussie'){
          location.reload();
        }else{
          alert(response);
        }
        ;
      }
    })
  }else{
    alert('Le fichier doit être une image.');
  }
}

for(let i=0;i<ajout.length;i++){
  ajout[i].addEventListener('mouseover', ()=>{
    ajout[i].style.transform = 'scale(1.2)';
  })
  ajout[i].addEventListener('mouseleave', ()=>{
    ajout[i].style.transform = 'scale(1)';
  })
}


/****************************************************************/
/****************************************************************/
/**********************  MODIFIER TITRE *************************/
/****************************************************************/
/****************************************************************/

let modifierTitre = document.getElementsByClassName('modifierTitre');
let titresProjets = document.getElementsByClassName('nom');
let noms = [];
for(let nom = 0;nom < titresProjets.length;nom++){
  noms.push(titresProjets[nom].firstElementChild.innerHTML);
}

for(let j=0;j<modifierTitre.length;j++){
  modifierTitre[j].addEventListener('click', ()=>{
    let nouveauTitre = window.prompt('Veuillez entrer le nouveau titre du projet.');
    if (nouveauTitre == null || nouveauTitre == ''){
      return;
    }else{
      while(noms.includes(nouveauTitre)){
        nouveauTitre = window.prompt('Ce titre de projet existe déjà. Veuillez en choisir un autre.');
      }
      let titre = modifierTitre[j].previousElementSibling.innerHTML;
      $.ajax({
        type:'post',
        url:'modifierTitre.php',
        data :{
          titre:titre,
          nouveauTitre:nouveauTitre
        },
        success: function(response){
          if(response == 'Succès'){
            location.reload();
          }else{
            alert(response);
          }
        }
      })
    }
  })
}

/****************************************************************/
/****************************************************************/
/********************  BOUTON SUPPRESSION  **********************/
/****************************************************************/
/****************************************************************/


for (let k=0;k<suppression.length;k++){
  suppression[k].addEventListener('click', ()=>{
    let column;
    let name;
    let supImage = 'non';
    if (suppression[k].previousElementSibling.getAttribute('class') == 'photo'){
      column = 'photos';
      name =  suppression[k].previousElementSibling.getAttribute('src').split('/')[2].concat(' ', suppression[k].previousElementSibling.getAttribute('alt'));
      if(!window.confirm('Voulez-vous vraiment supprimer '.concat(suppression[k].previousElementSibling.getAttribute('src').split('/')[2], ' ?'))){
        return;
      }
      if(window.confirm('Voulez-vous également supprimer '.concat(suppression[k].previousElementSibling.getAttribute('src').split('/')[2], ' de votre dossier ?'))){
        supImage = 'oui';
      }
    }else{
      column = 'skills';
      name =  suppression[k].previousElementSibling.getAttribute('alt');
      if(!window.confirm('Voulez-vous vraiment supprimer '.concat(suppression[k].previousElementSibling.getAttribute('alt'), ' ?'))){
        return;
      }
    }
    let projet = suppression[k].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
    $.ajax({
      type:'post',
      url:'suppression.php',
      data:{
        projet:projet,
        name:name,
        column:column,
        supImage: supImage
      },
      success:function(success){
        if(success == 'Succès'){
          location.reload();
        }else if(success == 'Image supprimé du dossier.'){
          alert(success);
          location.reload();
        }else{
          alert(success);
        }
      }
    })
  })
}

/****************************************************************/
/****************************************************************/
/*********************  AJOUT COMPETENCE  ***********************/
/****************************************************************/
/****************************************************************/

let skillAjout = document.getElementsByClassName('skillAjout');

for(let ij=0; ij<skillAjout.length;ij++){

    skillAjout[ij].addEventListener('click',()=>{

    let modal = document.createElement('div');
    modal.setAttribute('id','modal');
    skillAjout[ij].parentElement.appendChild(modal);

    let prompt = document.createElement('div');
    prompt.setAttribute('id', 'prompt');
    modal.appendChild(prompt);

    let exit = document.createElement('button');
    exit.setAttribute('class', 'suppression');
    exit.innerHTML = 'X';
    prompt.appendChild(exit);
    exit.addEventListener('click', ()=>{
      modal.remove();
    })

    let question = document.createElement('p');
    question.innerHTML = 'Voulez vous...';
    prompt.appendChild(question);

    let choix = document.createElement('div');
    choix.setAttribute('id', 'choix');
    prompt.appendChild(choix);

    let skillCheck = document.createElement('div');
    skillCheck.setAttribute('id', 'skills');
    choix.appendChild(skillCheck);
    skillCheck.innerHTML=('<p>Ajouter une de ces compétences&nbsp;?</p>')

    let skillCheckButton = document.createElement('button');
    skillCheckButton.setAttribute('class', 'skillbutton');
    skillCheckButton.innerHTML = 'Valider';
    skillCheckButton.addEventListener('click', ()=>{
      let competences = [];
      for (let check=0; check<skillCheckButton.previousElementSibling.children.length; check++){
        if(skillCheckButton.previousElementSibling.children[check].lastElementChild.checked){
          competences.push(skillCheckButton.previousElementSibling.children[check].firstElementChild.innerHTML);
        }
      }
      if(competences.length == 0){
        modal.remove();
        return;
      }
      let projet = skillCheckButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      $.ajax({
        type:'post',
        url:'ajouterSkills.php',
        data:{
          projet:projet,
          competences:competences
        },
        success:function(success){
          if(success == 'Succès'){
            location.reload();
          }else{
            alert(success);
          }
        }
      })
    })

    let skills = [];
    for(let s=0;s<skillAjout[ij].parentElement.children.length - 1; s++){
      skills.push(skillAjout[ij].parentElement.children[s].firstElementChild.getAttribute('alt'));
    }
    let projet = skillAjout[ij].parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;

    let textOu = document.createElement('p');
    textOu.innerHTML='Ou';
    choix.appendChild(textOu);


    $.ajax({
      type:'post',
      url:'recupererSkills.php',
      data:{
        projet:projet,
        skills:skills
      },
      success:function(success){
        skillCheck.innerHTML += success;
        skillCheck.appendChild(skillCheckButton);
        if(document.getElementById('skillExistant').innerHTML == ''){
          question.remove();
          skillCheck.remove();
          textOu.remove();
        }
      }
    })

    let skillInsert = document.createElement('div');
    skillInsert.setAttribute('id', 'creationSkill');
    choix.appendChild(skillInsert);
    skillInsert.innerHTML=('<p>Ajouter une nouvelle compétence&nbsp;?</p><div><label for=\'skillname\'>Nom*:</label><input type=\'text\' id=\'skillname\'></div><div><label for=\'skillimage\'>Logo:</label><input type=\'file\' id=\'skillimage\'></div>')
    
    let skillInsertButton = document.createElement('button');
    skillInsertButton.setAttribute('class', 'skillbutton');
    skillInsertButton.innerHTML = 'Valider';
    skillInsert.appendChild(skillInsertButton);
    let remplacerSkill = 'non';
    skillInsertButton.addEventListener('click', ()=>{
      let competence = document.getElementById('skillname').value;
      let skillExistant = [];
      for(let skill = 0;skill<document.getElementById('skillExistant').children.length;skill++){
        skillExistant.push(document.getElementById('skillExistant').children[skill].firstElementChild.innerHTML);
      };
      if (competence == ''){
        alert('Le nom de la compétence est obligatoire');
        return;
      }else if(skills.includes(competence) || skillExistant.includes(competence)){
        if(window.confirm('Ce nom de compétence existe déjà. Voulez-vous le remplacer ?')){
          remplacerSkill = 'oui';
        }else{
          alert('Veuillez changer le nom.');
          return;
        }
      }
      let projet = skillInsertButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      let form_data = new FormData();
      form_data.append('nom', competence);
      form_data.append('projet', projet);
      form_data.append('changement', remplacerSkill);
      if(document.getElementById('skillimage').files.length == 1){
        if(/image/.test(document.getElementById('skillimage').files[0].type)){
          form_data.append('file', document.getElementById('skillimage').files[0]);
        }else{
          alert('Le fichier doit être une image.');
          return;
        }
      }
      $.ajax({
        type:'post',
        url:'creerSkill.php',
        contentType: false,
        processData: false,
        data: form_data,
        success:function(success){
          if(success == 'succès'){
            location.reload();
          }else if(success == 'Compétence créée avec succès' || success == 'Compétence changée.'){
            alert(success);
            location.reload();
          }else{
            alert(success);
          }
        }
      })
    })
  })
  
  skillAjout[ij].addEventListener('dragover', (e)=>{
    e.preventDefault();
    skillAjout[ij].style.transform = 'scale(1.2)';
  })

  skillAjout[ij].addEventListener('dragleave', ()=>{
    skillAjout[ij].style.transform = 'scale(1)';
  })

  skillAjout[ij].addEventListener('drop', (e)=>{
    e.preventDefault();
    let fichier = e.dataTransfer.files;
    if (fichier.length > 1){
      alert('Une seule image est autorisée.');
      return;
    }
    let modal = document.createElement('div');
    modal.setAttribute('id','modal');
    skillAjout[ij].parentElement.appendChild(modal);

    let prompt = document.createElement('div');
    prompt.setAttribute('id', 'prompt');
    modal.appendChild(prompt);

    let exit = document.createElement('button');
    exit.setAttribute('class', 'suppression');
    exit.innerHTML = 'X';
    prompt.appendChild(exit);
    exit.addEventListener('click', ()=>{
      modal.remove();
    })

    let choix = document.createElement('div');
    choix.setAttribute('id', 'choix');
    prompt.appendChild(choix);

    let skillInsert = document.createElement('div');
    skillInsert.setAttribute('id', 'creationSkill');
    choix.appendChild(skillInsert);
    skillInsert.innerHTML=('<p>Ajouter une nouvelle compétence&nbsp;?</p><div><label for=\'skillname\'>Nom*:</label><input type=\'text\' id=\'skillname\'></div><div><label for=\'skillimage\'>Logo:</label><input type=\'file\' id=\'skillimage\'></div>')
    
    document.getElementById('skillimage').files = fichier;
    document.getElementById('skillname').value = fichier[0]['name'].split('/')[fichier[0]['name'].split('/').length - 1].split('.')[0];

    let skillInsertButton = document.createElement('button');
    skillInsertButton.setAttribute('class', 'skillbutton');
    skillInsertButton.innerHTML = 'Valider';
    skillInsert.appendChild(skillInsertButton);
    skillInsertButton.addEventListener('click', ()=>{
      let competence = document.getElementById('skillname').value;
      if (competence == ''){
        return;
      }
      let projet = skillInsertButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      let form_data = new FormData();
      form_data.append('nom', competence);
      form_data.append('projet', projet);
      if(document.getElementById('skillimage').files.length == 1){
        if(/image/.test(document.getElementById('skillimage').files[0].type)){
          form_data.append('file', document.getElementById('skillimage').files[0]);
        }else{
          alert('Le fichier doit être une image.');
          return;
        }
      }
      $.ajax({
        type:'post',
        url:'creerSkill.php',
        contentType: false,
        processData: false,
        data: form_data,
        success:function(success){
          if(success == 'succès'){
            location.reload();
          }else if(success == 'Compétence créée avec succès'){
            alert(success);
            location.reload();
          }else{
            alert(success);
          }
        }
      })
    })

    skillAjout[ij].style.transform = 'scale(1)';
  })
}


/****************************************************************/
/****************************************************************/
/*******************  MODIFIER REALISATION  *********************/
/****************************************************************/
/****************************************************************/

let modifierEquipe = document.getElementsByClassName('modifierEquipe');

for(let equipe = 0; equipe<modifierEquipe.length;equipe++){
  modifierEquipe[equipe].addEventListener('click', ()=>{

    let modal = document.createElement('div');
    modal.setAttribute('id','modal');
    modifierEquipe[equipe].parentElement.appendChild(modal);

    let prompt = document.createElement('div');
    prompt.setAttribute('id', 'prompt');
    modal.appendChild(prompt);

    let exit = document.createElement('button');
    exit.setAttribute('class', 'suppression');
    exit.innerHTML = 'X';
    prompt.appendChild(exit);
    exit.addEventListener('click', ()=>{
      modal.remove();
    })

    let choix = document.createElement('div');
    choix.setAttribute('id', 'choix');
    prompt.appendChild(choix);

    let team = document.createElement('div');
    team.setAttribute('class', 'flex-column');
    team.innerHTML = '<p>Travail seul ou à plusieurs ?</p><div class=\'flex\'><label for=\'seul\'>Seul</label><input type=\'checkbox\' id=\'seul\'></div>';
    choix.appendChild(team);

    let enEquipe = document.createElement('div');
    enEquipe.setAttribute('class', 'flex');
    enEquipe.innerHTML = '<label for=\'equipe\'>En&nbsp;equipe</label><input type=\'checkbox\' id=\'equipe\'><p>avec</p>';
    team.appendChild(enEquipe);

    let equipier = document.createElement('div');
    equipier.setAttribute('class', 'flex-column');
    equipier.innerHTML = '<div class=\'flex\'><label for=\'nomEquipier\'>Nom</label><input type=\'text\' id=\'nomEquipier\'></div><div class=\'flex\'><label for=\'lienEquipier\'>lien(optionnel)</label><input type=\'text\' id=\'lienEquipier\'></div>'
    enEquipe.appendChild(equipier);

    team.innerHTML += '</div><p>La maquette vous a-t-elle été fournie ?</p><div class=\'flex\'><label for=\'nonFournie\'>Non</label><input type=\'checkbox\' id=\'nonFournie\'></div>';

    let maquette = document.createElement("div");
    maquette.setAttribute('class', 'flex');
    maquette.innerHTML = '<label for=\'fournie\'>Oui</label><input type=\'checkbox\' id=\'fournie\'><p>par</p>';

    team.appendChild(maquette);

    let fournisseur = document.createElement('div');
    fournisseur.setAttribute('class', 'flex-column');
    fournisseur.innerHTML = '<div class=\'flex\'><label for=\'nomfournisseur\'>Nom</label><input type=\'text\' id=\'nomfournisseur\'></div><div class=\'flex\'><label for=\'lienfournisseur\'>lien(optionnel)</label><input type=\'text\' id=\'lienfournisseur\'></div>'
    maquette.appendChild(fournisseur);

    let realisationButton = document.createElement('button');
    realisationButton.setAttribute('class', 'skillbutton');
    realisationButton.innerHTML = 'Valider';
    team.appendChild(realisationButton);

    document.getElementById('seul').addEventListener('change', ()=>{document.getElementById('equipe').checked = !document.getElementById('seul').checked;});
    document.getElementById('equipe').addEventListener('change', ()=>{document.getElementById('seul').checked = !document.getElementById('equipe').checked;});

    document.getElementById('nonFournie').addEventListener('change', ()=>{document.getElementById('fournie').checked = !document.getElementById('nonFournie').checked;});
    document.getElementById('fournie').addEventListener('change', ()=>{document.getElementById('nonFournie').checked = !document.getElementById('fournie').checked;});

    let currentRealisation = modal.parentElement.firstElementChild;
    
    let realisationList = currentRealisation.innerHTML.split(' avec ');

    if(/seul/.test(realisationList[0])){
      document.getElementById('seul').checked = true;
      if(realisationList.length > 1){
        document.getElementById('fournie').checked = true;
        let monFournisseur = realisationList[1].split('href');
        monFournisseur = monFournisseur[1].split("\"");
        let lienMonFournisseur = monFournisseur[1];
        let nomMonFournisseur = monFournisseur[2].split('<')
        nomMonFournisseur = nomMonFournisseur[0].replace(/>/, "");
        document.getElementById('nomfournisseur').value = nomMonFournisseur;
        document.getElementById('lienfournisseur').value = lienMonFournisseur;
      }else{
        document.getElementById('nonFournie').checked = true;
      }
    }else if(currentRealisation.innerText != ""){
      document.getElementById('equipe').checked = true;
      let monPartenaire = '';
      let lienMonPartenaire = '';
      let nomMonPartenaire = '';
      if(/href/.test(realisationList[1])){
        monPartenaire = realisationList[1].split('href');
        monPartenaire = monPartenaire[1].split("\"");
        lienMonPartenaire = monPartenaire[1];
        nomMonPartenaire = monPartenaire[2].split('<')
        nomMonPartenaire = nomMonPartenaire[0].replace(/>/, "");
      }else{
        nomMonPartenaire = realisationList[1];
      }
      document.getElementById('nomEquipier').value = nomMonPartenaire;
      document.getElementById('lienEquipier').value = lienMonPartenaire;
      if(realisationList.length > 2){
        document.getElementById('fournie').checked = true;
        let monFournisseur = '';
        let lienMonFournisseur = '';
        let nomMonFournisseur = '';
        if(/href/.test(realisationList[2])){
          monFournisseur = realisationList[2].split('href');
          monFournisseur = monFournisseur[1].split("\"");
          lienMonFournisseur = monFournisseur[1];
          nomMonFournisseur = monFournisseur[2].split('<')
          nomMonFournisseur = nomMonFournisseur[0].replace(/>/, "");
        }else{
          nomMonFournisseur = realisationList[2];
        }
        document.getElementById('nomfournisseur').value = nomMonFournisseur;
        document.getElementById('lienfournisseur').value = lienMonFournisseur;
      }else{
        document.getElementById('nonFournie').checked = true;
      }
    }
    realisationButton.addEventListener('click', ()=>{
      let projet = modal.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      let nomPartenaire = document.getElementById('nomEquipier').value;
      let lienPartenaire = document.getElementById('lienEquipier').value;
      let equipe = '';
      if(document.getElementById('seul').checked){
         equipe = 'seul';
      }else if(!document.getElementById('seul').checked && !document.getElementById('equipe').checked){
        alert('Choisissez au moins un choix pour la première question.')
        return;
      }else{
        equipe = 'en équipe';
        if(nomPartenaire == ''){
          alert('Le nom du partenaire est obligatoire.');
          return;
        }
      }
      let nomFournisseur = document.getElementById('nomfournisseur').value;
      let lienFournisseur = document.getElementById('lienfournisseur').value;
      let maquette = '';
      if(document.getElementById('fournie').checked){
        maquette = 'Fournie';
        if(nomFournisseur == ''){
          alert('Le nom du fournisseur de maquette est obligatoire.');
          return;
        }
      }else if(!document.getElementById('fournie').checked && !document.getElementById('nonFournie').checked){
        alert('Choisissez au moins un choix pour la seconde question.')
        return;
      }else{
        maquette = 'Non fournie';
      }
      $.ajax({
        type:'post',
        url:'changerRealisation.php',
        data:{
          projet:projet,
          nomPartenaire:nomPartenaire,
          lienPartenaire:lienPartenaire,
          equipe:equipe,
          nomFournisseur:nomFournisseur,
          lienFournisseur:lienFournisseur,
          maquette:maquette
        },
        success:function(success){
          if(success == 'Succès.'){
            location.reload();
          }else{
            alert(success);
          }
        }
      })
    })
  })
}



/****************************************************************/
/****************************************************************/
/*******************  BOUTON AJOUTER PROJET  ********************/
/****************************************************************/
/****************************************************************/

document.getElementById('ajouterProjet').addEventListener('click', ()=>{
  let nouveauTitre = window.prompt('Veuillez entrer le titre du nouveau projet.');
  if (nouveauTitre == null || nouveauTitre == ''){
    return;
  }else{
    while(noms.includes(nouveauTitre)){
      nouveauTitre = window.prompt('Ce titre de projet existe déjà. Veuillez en choisir un autre.');
    }
    $.ajax({
      type:'post',
      url:'ajouterProjet.php',
      data:{
        titre:nouveauTitre
      },
      success:function(success){
        if(success == 'Succès'){
          location.reload();
        }else{
          alert(success);
        }
      }
    })
  }
})


/****************************************************************/
/****************************************************************/
/******************  BOUTON SUPPRIMER PROJET  *******************/
/****************************************************************/
/****************************************************************/

let projetSuppression = document.getElementsByClassName('supprimerProjet');
for(let clefProjet = 0; clefProjet<projetSuppression.length;clefProjet++){
  
  projetSuppression[clefProjet].addEventListener('click', ()=>{
    let projet = projetSuppression[clefProjet].parentElement.firstElementChild.innerHTML;
    
    let modal = document.createElement('div');
    modal.setAttribute('id','modal');
    projetSuppression[clefProjet].parentElement.appendChild(modal);

    let prompt = document.createElement('div');
    prompt.setAttribute('id', 'prompt');
    modal.appendChild(prompt);

    let exit = document.createElement('button');
    exit.setAttribute('class', 'suppression');
    exit.innerHTML = 'X';
    prompt.appendChild(exit);
    exit.addEventListener('click', ()=>{
      modal.remove();
    })

    let instruction = document.createElement('p');
    instruction.innerText = 'Veuillez confirmer votre identité:';
    prompt.appendChild(instruction);

    let mail = document.createElement('div');
    mail.setAttribute('class', 'flex center');
    mail.innerHTML = '<label for=\'confirmerMail\'>Mail</label><input type=\'mail\' id=\'confirmerMail\'>';
    prompt.appendChild(mail);

    let password = document.createElement('div');
    password.setAttribute('class', 'flex center');
    password.innerHTML = '<label for=\'confirmerPassword\'>Password</label><input type=\'password\' id=\'confirmerPassword\'>';
    prompt.appendChild(password);

    let confirmation = document.createElement('button');
    confirmation.setAttribute('class', 'skillbutton');
    confirmation.innerHTML = 'Valider';
    prompt.appendChild(confirmation);
    let connectionReussie = false;
    confirmation.addEventListener('click', ()=>{
      let connection = document.getElementById('confirmerMail').value;
      let motDePasse = document.getElementById('confirmerPassword').value;
      let regexMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (connection == ''){
        alert('Veuillez entrer votre mail.');
        return;
      }else if(!regexMail.test(connection)){
        alert('Veuillez entrer un mail valide.');
        return;
      }else if(motDePasse == ''){
        alert('Veuillez entre votre mot de passe.')
      }else{
        $.ajax({
          type: 'post',
          url: 'connection.php',
          data: {
            mail:connection,
            password:motDePasse
          },
          success: function (response) {
            if (response == 'Connection réussie'){
              connectionReussie = true;
              console.log(connectionReussie);
              if (connectionReussie){
                if(window.confirm('Etes-vous sûr de vouloir supprimer le projet '.concat(projet, '?'))){
                  $.ajax({
                    type:'post',
                    url:'supprimerProjet.php',
                    data:{
                      nom:projet
                    },
                    success:function(success){
                      if(success == 'Succès'){
                        location.reload();
                      }else{
                        alert(success);
                      }
                    }
                  })
                }
              }
            }else{
              connectionReussie = false;
              alert(response);
            }
          }
      });
      }
    })
  })
}


/****************************************************************/
/****************************************************************/
/*******************  BOUTON ARCHIVER PROJET  *******************/
/****************************************************************/
/****************************************************************/

let archivage = document.getElementsByClassName('archivage');

for(let clefArchivage = 0; clefArchivage < archivage.length; clefArchivage++){
  let nomProjet = archivage[clefArchivage].parentElement.parentElement.firstElementChild.innerHTML;
  if(archivage[clefArchivage].checked){
    archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.top = archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.clientHeight / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientHeight + archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 4 + 'px';
    archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.left = archivage[clefArchivage].parentElement.parentElement.parentElement.clientWidth / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 2 + 'px';
    window.addEventListener('resize',()=>{
      archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.top = archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.clientHeight / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientHeight + archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 4 + 'px';
      archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.left = archivage[clefArchivage].parentElement.parentElement.parentElement.clientWidth / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 2 + 'px';
    })
    $.ajax({
      type:'post',
      url:'archiver.php',
      data:{
        projet:nomProjet,
        archiver:'oui'
      },
      success:function(response){
        if(response != nomProjet.concat(' archivé.')){
          alert(response);
        }else{
          archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.style.opacity = '1';
        }
      }
    })
  }else{
    $.ajax({
      type:'post',
      url:'archiver.php',
      data:{
        projet:nomProjet,
        archiver:'non'
      },
      success:function(response){
        if(response != nomProjet.concat(' désarchivé.')){
          alert(response);
        }else{
          archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.style.opacity = '0';
        }
      }
    })
  }
  archivage[clefArchivage].addEventListener('change', ()=>{
    let nomProjet = archivage[clefArchivage].parentElement.parentElement.firstElementChild.innerHTML;
    if(archivage[clefArchivage].checked){
      archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.top = archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.clientHeight / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientHeight + archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 4 + 'px';
      archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.left = archivage[clefArchivage].parentElement.parentElement.parentElement.clientWidth / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 2 + 'px';
      window.addEventListener('resize',()=>{
        archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.top = archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.clientHeight / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientHeight + archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 4 + 'px';
        archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.style.left = archivage[clefArchivage].parentElement.parentElement.parentElement.clientWidth / 2 - archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.firstElementChild.clientWidth / 2 + 'px';
      })
      $.ajax({
        type:'post',
        url:'archiver.php',
        data:{
          projet:nomProjet,
          archiver:'oui'
        },
        success:function(response){
          if(response != nomProjet.concat(' archivé.')){
            alert(response);
          }else{
            archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.style.opacity = '1';
          }
        }
      })
    }else{
      $.ajax({
        type:'post',
        url:'archiver.php',
        data:{
          projet:nomProjet,
          archiver:'non'
        },
        success:function(response){
          if(response != nomProjet.concat(' désarchivé.')){
            alert(response);
          }else{
            archivage[clefArchivage].parentElement.parentElement.parentElement.lastElementChild.style.opacity = '0';
          }
        }
      })
    }
  })
}