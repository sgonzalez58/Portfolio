let connection = document.getElementById('connection');
let suppression = document.getElementsByClassName('suppression');

connection.addEventListener('click', ()=>{
    let regexMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    let password = '';
    let mail = document.getElementById('mail');
    if (mail != null){
      mail = mail.value;
      if(mail==''){        
          $('#text').html('Le mail est obligatoire');
          return;
      }else if(!regexMail.test(mail)){
          $('#text').html('Veuillez entrer un mail valide.');
          return;
      }
      password = document.getElementsByTagName('input')[1].value;
    }
    $.ajax({
        type: 'post',
        url: 'connection.php',
        data: {
          mail:mail,
          password:password
        },
        success: function (response) {
          if (response == 'Connection réussie' || response == 'Déconnection'){
            window.location = 'backoffice.php';
          }else{
            $('#text').html(response);
          }
        }
    });
})

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
    let description = window.prompt('Veuillez entrer une brêve description pour l\'image');
    if(description == null){
      return;
    }
    form_data.append('description', description);
    form_data.append('projet', element.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
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

let modifierTitre = document.getElementsByClassName('modifierTitre');

for(let j=0;j<modifierTitre.length;j++){
  modifierTitre[j].addEventListener('click', ()=>{
    let nouveauTitre = window.prompt('Veuillez entrer le nouveau titre du projet.');
    if (nouveauTitre == null || nouveauTitre == ''){
      return;
    }else{
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
      }
    })

    let textOu = document.createElement('p');
    textOu.innerHTML='Ou';
    choix.appendChild(textOu);

    let skillInsert = document.createElement('div');
    skillInsert.setAttribute('id', 'creationSkill');
    choix.appendChild(skillInsert);
    skillInsert.innerHTML=('<p>Ajouter une nouvelle compétence&nbsp;?</p><div><label for=\'skillname\'>Nom*:</label><input type=\'text\' id=\'skillname\'></div><div><label for=\'skillimage\'>Logo:</label><input type=\'file\' id=\'skillimage\'></div>')
    
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
  })
}

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

    let currentRealisation = modal.parentElement.firstElementChild.innerHTML;
    
    let realisationList = currentRealisation.split(' avec ');

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
    }else{
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
