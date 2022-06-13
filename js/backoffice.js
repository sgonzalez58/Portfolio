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