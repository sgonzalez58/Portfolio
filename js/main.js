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

if(window.innerWidth > 1023){
    window.addEventListener('scroll', ()=>{
        rangementMenuCheck.checked = true;
        rangementMenu[0].style.opacity = '0.1';
        zoneHaute[0].style.height = '3rem';
        zoneHaute[0].style.maxHeight = '3rem';
    })

    zoneHaute[0].addEventListener('mouseover', ()=>{
        rangementMenu[0].style.opacity = '1';
        zoneHaute[0].style.maxHeight = '0';
    })


    rangementMenu[0].addEventListener('mouseleave', ()=>{
        rangementMenu[0].style.opacity = '0.1';
        zoneHaute[0].style.height = '3rem';
        zoneHaute[0].style.maxHeight = '3rem';
    })
}else{
    rangementMenuCheck.checked = true;
}


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

/*Opacity section Mes Compétences + Mes Projets et placement */

let deuxiemePartie = document.getElementsByClassName('deuxiemePartie')[0];
let categories = document.getElementsByClassName('categories');
let k;

if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
    for(k = 0; k <categories.length; k++){
        categories[k].style.opacity = 1;
        categories[k].style.transitionDelay = (k+1)/2 +'s';
    }
    deuxiemePartie.style.zIndex = 2;
    deuxiemePartie.style.opacity = 1;
}else{
    for(k = 0; k <categories.length; k++){
        categories[k].style.opacity = 0;
        categories[k].style.transitionDelay = 0 + 's';
    }
    deuxiemePartie.style.opacity = 0;
}

window.addEventListener('scroll', apparitionCompetences=>{
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        for(k = 0; k <categories.length; k++){
            categories[k].style.opacity = 1;
            categories[k].style.transitionDelay = (k+1)/2 +'s';
        }
        deuxiemePartie.lastElementChild.firstElementChild.style.position = 'fixed';
        deuxiemePartie.style.zIndex = 2;
        deuxiemePartie.style.opacity = 1;
    }else{
        for(k = 0; k <categories.length; k++){
            categories[k].style.opacity = 0;
            categories[k].style.transitionDelay = 0 + 's';
        }   
        deuxiemePartie.lastElementChild.firstElementChild.style.position = 'relative'; 
        deuxiemePartie.style.zIndex = 0;
        deuxiemePartie.style.opacity = 0;
    }
})

function placementCompetencesProjets(){
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        deuxiemePartie.style.top = xStartingPositionParallax[1] - window.scrollY / 2 + 'px';
        deuxiemePartie.style.height = deuxiemePartie.clientHeight + (xStartingPositionParallax[1] - window.scrollY / 2)  + 'px';
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
        rangementMenuCheck.checked = !rangementMenuCheck.checked;   
    })
}

/* ordre accueil paysage ou portrait */

let accueil = document.getElementsByClassName('contenu-principal')[0];

if (window.innerHeight > window.innerWidth){
    accueil.style.flexDirection = 'column';
    accueil.lastElementChild.style.maxHeight = '40%';
    accueil.lastElementChild.style.maxWidth = '80%';
}else{
    accueil.style.flexDirection = 'row';
    accueil.lastElementChild.style.maxHeight = '80%';
    accueil.lastElementChild.style.maxWidth = '40%';
}

/* order contact paysage ou portrait */

contact = document.getElementsByClassName('volet')[0];

if (window.innerHeight > window.innerWidth && window.innerWidth > 599){
    contact.style.padding = '2%';
    contact.style.justifyContent = 'center';
    contact.style.flexDirection = 'column';
    contact.children[0].style.display = 'flex';
    document.getElementsByClassName('contactGauche')[0].firstElementChild.remove();
    document.getElementsByClassName('contactGauche')[0].firstElementChild.remove();
    document.getElementsByClassName('contactGauche')[0].style.width = '60%';
    document.getElementsByClassName('contactDroite')[0].style.width = '40%';
    document.getElementsByClassName('contactDroite')[0].style.marginRight = '5%';
    document.getElementsByClassName('contactDroite')[0].style.backgroundColor = 'transparent';
}else{
    
}

/* ajax formulaire*/

function envoyerMessage(){
    let nom = document.getElementById('nom').value;
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
        
    let mail = document.getElementById('mail').value;
    if(mail==''){        
        $('#erreure').html('Le mail est obligatoire');
        return;
    }else if(!regexMail.test(mail)){
        $('#erreure').html('Veuillez entrer un mail valide.');
        return;
    }

    let message = document.getElementById('message').value;
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
          $('.erreure').html(response);
        }
      });
    
      return false;
}

/* delay animation accueil presentation */

let lettres = document.getElementsByClassName('animationAEC');

for(let ij=0; ij<lettres.length; ij++){
    lettres[ij].style.animationDelay = ij/8 + 's';
    lettres[ij].addEventListener('mouseenter', ()=>{
        if(lettres[ij].style.animationName == ''){
            lettres[ij].style.animationDelay = '0s';
            lettres[ij].style.animationIterationCount = 'infinite';
            lettres[ij].style.animationName = 'AECHover';
            lettres[ij].addEventListener('animationiteration', ()=>{
                lettres[ij].style.animationPlayState = 'paused';
            })
        }else{
            lettres[ij].style.animationPlayState = 'running';
        }
    })
}

/* animation telephone */

let animationTelephone = document.getElementsByClassName('animTelephone')[0];
let messagesTelephone = document.getElementsByClassName('innerAnimTelephone');
let menuTelephone = document.getElementsByClassName('menuAnimTelephone')[0];
let rondTelephone = document.getElementsByClassName('rondAnimTelephone');

lettres[lettres.length - 1].addEventListener('animationend', ()=>{
    animationTelephone.style.height = animationTelephone.parentElement.lastElementChild.clientHeight/1.55 + 'px';
    animationTelephone.style.width = animationTelephone.parentElement.lastElementChild.clientWidth/3 + 'px';
    for(let kk=0; kk<rondTelephone.length; kk++){
        rondTelephone[kk].style.width = rondTelephone[kk].clientHeight + 'px';
        if(kk%2 == 1){
            rondTelephone[kk].parentElement.style.flexDirection = 'row-reverse';
        }        
    }
    setInterval(()=>{
        animationTelephone.style.top = animationTelephone.parentElement.lastElementChild.offsetTop + 'px';
        animationTelephone.style.left = animationTelephone.parentElement.lastElementChild.clientWidth/100 * 68 + animationTelephone.parentElement.lastElementChild.offsetLeft +'px';
    }, 1000/60);
    menuTelephone.style.opacity = 1;
    menuTelephone.lastElementChild.addEventListener('click', ()=>{
        for(let kki=0; kki<rondTelephone.length; kki++){            
            rondTelephone[kki].parentElement.style.animationDelay = kki/2 + 's';
            rondTelephone[kki].parentElement.style.animationName = 'ATPclick';
        }
    })
    menuTelephone.firstElementChild.addEventListener('click', ()=>{
        for(let kki=0; kki<rondTelephone.length; kki++){            
            rondTelephone[kki].parentElement.style.animationDelay = kki + 1 + 's';
            rondTelephone[kki].parentElement.style.animationName = 'ATP';
        }
    })
    for(let jj=0; jj<messagesTelephone.length; jj++){
        messagesTelephone[jj].style.animationDelay = jj + 1 +'s';
        messagesTelephone[jj].style.animationName = 'ATP';
    }
})
