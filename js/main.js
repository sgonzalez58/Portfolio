/*Page en haut de page lors de l'actualisation*/

window.onbeforeunload = function(){
    window.scrollTo(0,0);
}

window.addEventListener('resize', ()=>{
    window.location = 'index.html';
})

/*balises flottantes dans la section accueil*/

const section = document.getElementById("accueil");
const anim = document.getElementsByClassName("fond-anim");
const fps = 60;
let i;


let xPosition = [];
let yPosition = [];
let xSpeed = [];
let ySpeed = [];

for(i=0;i<anim.length;i++){
    xPosition.push(anim[i].offsetLeft);
    yPosition.push(anim[i].offsetTop);
    xSpeed.push(Math.floor(Math.random() * 4 - 2));
    ySpeed.push(Math.floor(Math.random() * 4 - 2));
    while(xSpeed[i] < 0.5 && xSpeed[i] > -0.5){
        xSpeed[i] = Math.floor(Math.random() * 4 - 2);
    }
    while(ySpeed[i] < 0.5 && ySpeed[i] > -0.5){
        ySpeed[i] = Math.floor(Math.random() * 4 - 2);
    }
}
function update(){
    for(i = 0; i < anim.length; i++){
        anim[i].style.left = xPosition[i] + 'px';
        anim[i].style.top = yPosition[i] + 'px';
    }
}

setInterval(function(){
    for(i = 0; i < anim.length; i++){
        if(xPosition[i] + anim[i].clientWidth >= window.innerWidth +10){
            xSpeed[i] = -Math.abs(xSpeed[i]);
        }
        if(xPosition[i] <= -10){
            xSpeed[i] = Math.abs(xSpeed[i]);
        }
        if(yPosition[i] + anim[i].clientHeight >= window.innerHeight +10){
            ySpeed[i] = -Math.abs(ySpeed[i]);
        }
        if(yPosition[i] <= -10){
            ySpeed[i] = Math.abs(ySpeed[i]);
        }
        xPosition[i] += xSpeed[i];
        yPosition[i] += ySpeed[i];
    }
    update();
},1000/fps);

/*rangement menu*/

let rangementMenuCheck = document.getElementById('mon-menu-burger');
let rangementMenu = document.getElementsByClassName('rangement-menu');
let zoneHaute = document.getElementsByClassName('zoneHaute');

window.addEventListener('scroll', ()=>{
    rangementMenuCheck.checked = true;
    rangementMenu[0].style.opacity = '0.1';
    zoneHaute[0].style.height = '2rem';
    zoneHaute[0].style.maxHeight = '2rem';
})

zoneHaute[0].addEventListener('mouseover', ()=>{
    rangementMenu[0].style.opacity = '1';
    zoneHaute[0].style.maxHeight = '0';
})

rangementMenu[0].addEventListener('mouseleave', ()=>{
    rangementMenu[0].style.opacity = '0.1';
    zoneHaute[0].style.height = '2rem';
    zoneHaute[0].style.maxHeight = '2rem';
})

/*parallax*/

let parallax = document.getElementsByClassName('parallax');
let xStartingPositionParallax = [];
let xPositionParallax = [];
for(let j=0; j<parallax.length; j++){
    xPositionParallax.push(parallax[j].offsetTop);
    xStartingPositionParallax.push(parallax[j].style.top);
}

function effetParallax(){
    xPositionParallax[0] = xStartingPositionParallax[0] - Math.floor(window.scrollY * 3);
    xPositionParallax[1] = xStartingPositionParallax[1] - Math.floor(window.scrollY / 2);
    parallax[0].style.top = xPositionParallax[0] + 'px';
    parallax[1].style.top = xPositionParallax[1] + 'px';
}

effetParallax();
window.addEventListener('scroll', effetParallax, true)

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        window.removeEventListener('scroll', effetParallax, true);
    }else{
        window.addEventListener('scroll', effetParallax, true)
    }
})

/*Opacity section Mes Compétences + Mes Projets */

let deuxiemePartie = document.getElementsByClassName('deuxiemePartie')[0];
let categoriesCompetences = document.getElementsByClassName('categorieCompetences');
let k;

if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
    for(k = 0; k <categoriesCompetences.length; k++){
        categoriesCompetences[k].style.opacity = 1;
        categoriesCompetences[k].style.transitionDelay = (k+1)/2 +'s';
    }
    deuxiemePartie.style.opacity = 1;
}else{
    for(k = 0; k <categoriesCompetences.length; k++){
        categoriesCompetences[k].style.opacity = 0;
        categoriesCompetences[k].style.transitionDelay = 0 + 's';
    }
    deuxiemePartie.style.opacity = 0;
}

window.addEventListener('scroll', apparitionCompetences=>{
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        for(k = 0; k <categoriesCompetences.length; k++){
            categoriesCompetences[k].style.opacity = 1;
            categoriesCompetences[k].style.transitionDelay = (k+1)/2 +'s';
        }
        deuxiemePartie.style.opacity = 1;
    }else{
        for(k = 0; k <categoriesCompetences.length; k++){
            categoriesCompetences[k].style.opacity = 0;
            categoriesCompetences[k].style.transitionDelay = 0 + 's';
        }
        deuxiemePartie.style.opacity = 0;
    }
})

function placementCompetencesProjets(){
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        deuxiemePartie.style.top = parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 + 'px';
        window.removeEventListener('scroll', placementCompetencesProjets)
    }
}

window.addEventListener('scroll', placementCompetencesProjets);

/* menu smooth scroll vers section */
lienMenu = document.getElementsByTagName('li');
mesSections = [0, 0, parallax[1].clientHeight + Math.floor(window.innerHeight * 0.1), parallax[1].clientHeight + deuxiemePartie.firstElementChild.clientHeight - 20, 0];

for(let ii = 0; ii<mesSections.length; ii++){
    lienMenu[ii].addEventListener('click', ()=>{
        let tmp = setInterval(()=>{
            if(ii==0){
                if(window.scrollY > 0){
                    window.scrollTo(0, Math.floor(window.scrollY - Math.max(1, (Math.floor((mesSections[ii] + window.scrollY)/10)))));
                }else{
                    clearInterval(tmp);
                }
            }else if(ii==4){
                if(window.scrollY < document.body.scrollHeight - window.innerHeight){
                    window.scrollTo(0, Math.floor(window.scrollY + Math.max(1, (Math.floor((document.body.scrollHeight - window.innerHeight - window.scrollY)/20)))));
                }else{
                    clearInterval(tmp);
                }
            }else{
                if(window.scrollY < mesSections[ii] + window.innerHeight + parallax[1].offsetTop){
                    window.scrollTo(0, Math.floor(window.scrollY + Math.max(1, (Math.floor((mesSections[ii] + window.innerHeight + parallax[1].offsetTop - window.scrollY)/20)))));
                }else if(window.scrollY > mesSections[ii] + window.innerHeight + parallax[1].offsetTop){
                    window.scrollTo(0, Math.floor(window.scrollY - Math.max(1, (Math.floor((window.scrollY - (mesSections[ii] + window.innerHeight + parallax[1].offsetTop))/20)))));
                }else{
                    clearInterval(tmp);
                }
            }
            
        }, 1000/60)
    })
}

/* ordre accueil paysage ou portrait */

let accueil = document.getElementsByClassName('contenu-principal')[0];

if (window.innerHeight > window.innerWidth){
    accueil.style.flexDirection = 'column';
    accueil.lastElementChild.style.maxHeight = '50%';
    accueil.lastElementChild.style.maxWidth = '70%';
}else{
    accueil.style.flexDirection = 'row';
    accueil.lastElementChild.style.maxHeight = '70%';
    accueil.lastElementChild.style.maxWidth = '50%';
}

/* ajax formulaire*/

function envoyerMessage(e){
    let nom = e.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.value;
    if(nom==""){
        $('#erreure').html('Le nom est obligatoire');
        return;
    }else if(nom.length > 30 || nom.length < 2){
        $('#erreure').html('Le nom doit être composé de 2 à 30 lettres.');
        return;
    }else if(/[^a-zA-Z '-]/.test(nom)){
        $('#erreure').html('Le nom peut être composé de lettres, de tirets, d\'apostrophes et d\'espaces uniquement.');
        return;
    }

    let regexMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
    let mail = e.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
    if(mail==''){        
        $('#erreure').html('Le mail est obligatoire');
        return;
    }else if(!regexMail.test(mail)){
        $('#erreure').html('Veuillez entrer un mail valide.');
        return;
    }

    let message = e.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value;
    if(message==''){
        $('#erreure').html('Le message est obligatoire');
        return;
    }else if(message.length < 5){
        $('#erreure').html('Le message n\'est pas assez long.');
        return;
    }

    $.ajax({
        type: 'post',
        url: 'php/envoyerMessage.php',
        data: {
          nom:nom,
          mail:mail,
          message:message
        },
        success: function (response) {
          $('#erreure').html(response);
        }
      });
    
      return false;
}