let connection = document.getElementById('connection');

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
let ajoutImage = document.getElementById('ajoutImage');

ajoutImage.addEventListener('dragover', (e)=>{
  e.preventDefault();
  ajoutImage.style.transform = 'scale(1.2)';
})

ajoutImage.addEventListener('dragleave', ()=>{
  ajoutImage.style.transform = 'scale(1)';
})

ajoutImage.addEventListener('drop', (e)=>{
  e.preventDefault();
  let fichier = e.dataTransfer.files[0];
  if(/image/.test(fichier.type)){
    let form_data = new FormData();
    form_data.append('file', fichier);
    let description = window.prompt('Veuillez entrer une brêve description pour l\'image');
    if(description == null){
      return;
    }
    
    form_data.append('description', description);
    form_data.append('projet', ajoutImage.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    $.ajax({
      type: 'post',
      url: 'ajouterImage.php',
      contentType: false,
      processData: false,
      data: form_data,
      success:function(response){
        if(response == 'Ajout réussie'){
          let image = ajoutImage.previousElementSibling.cloneNode(true);
          image.firstElementChild.setAttribute('src', '../img/'.concat(fichier.name));
          image.firstElementChild.setAttribute('alt', description);
          image.firstElementChild.setAttribute('title', description);
          ajoutImage.parentElement.insertBefore(image, ajoutImage)
        }else{
          alert(response);
        }
        ;
      }
    })
  }else{
    alert('Le fichier doit être une image.');
  }
  ajoutImage.style.transform = 'scale(1)';
})

ajoutImage.lastElementChild.addEventListener('change', ()=>{
  let fichier = ajoutImage.lastElementChild.files[0];
  if(/image/.test(fichier.type)){
    let form_data = new FormData();
    form_data.append('file', fichier);
    let description = window.prompt('Veuillez entrer une brêve description pour l\'image');
    if(description == null){
      return;
    }
    
    form_data.append('description', description);
    form_data.append('projet', ajoutImage.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML);
    $.ajax({
      type: 'post',
      url: 'ajouterImage.php',
      contentType: false,
      processData: false,
      data: form_data,
      success:function(response){
        if(response == 'Ajout réussie'){
          let image = ajoutImage.previousElementSibling.cloneNode(true);
          image.firstElementChild.setAttribute('src', '../img/'.concat(fichier.name));
          image.firstElementChild.setAttribute('alt', description);
          image.firstElementChild.setAttribute('title', description);
          ajoutImage.parentElement.insertBefore(image, ajoutImage)
        }else{
          alert(response);
        }
        ;
      }
    })
  }else{
    alert('Le fichier doit être une image.');
  }
})


for(let i=0;i<ajout.length;i++){
  ajout[i].addEventListener('mouseover', ()=>{
    ajout[i].style.transform = 'scale(1.2)';
  })
  ajout[i].addEventListener('mouseleave', ()=>{
    ajout[i].style.transform = 'scale(1)';
  })
}

let modifierTitre = document.getElementById('modifierTitre');

modifierTitre.addEventListener('click', ()=>{
  let nouveauTitre = window.prompt('Veuillez entrer le nouveau titre du projet.');
  if (nouveauTitre == null || nouveauTitre == ''){
    return;
  }else{
    let titre = modifierTitre.previousElementSibling.innerHTML;
    $.ajax({
      type:'post',
      url:'modifierTitre.php',
      data :{
        titre:titre,
        nouveauTitre:nouveauTitre
      },
      success: function(response){
        if(response == 'Succès'){
          modifierTitre.previousElementSibling.innerHTML = nouveauTitre;
        }else{
          alert(response);
        }
      }
    })
  }
})

let suppression = document.getElementsByClassName('suppressoin');

for (let k=0;k<suppression.length;k++){
  suppression[k].addEventListener('click', ()=>{
    
  })
}