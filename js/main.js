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
    rangementMenu[0].style.opacity = '0';
    zoneHaute[0].style.height = '200px';
    zoneHaute[0].style.maxHeight = '200px';
})

zoneHaute[0].addEventListener('mouseover', ()=>{
    rangementMenu[0].style.opacity = '1';
    zoneHaute[0].style.maxHeight = '0';
})

rangementMenu[0].addEventListener('mouseleave', ()=>{
    rangementMenu[0].style.opacity = '0';
    zoneHaute[0].style.height = '200px';
    zoneHaute[0].style.maxHeight = '200px';
})

/*parallax*/

let parallax = document.getElementsByClassName('parallax');
let xStartingPositionParallax = [];
let xPositionParallax = [];
for(let j=0; j<parallax.length; j++){
    xPositionParallax.push(parallax[j].offsetTop);
    xStartingPositionParallax.push(parallax[j].style.top);
}

xPositionParallax[0] = xStartingPositionParallax[0] - window.scrollY * 2.5;
    xPositionParallax[1] = xStartingPositionParallax[1] - window.scrollY / 2;
    parallax[0].style.top = xPositionParallax[0] + 'px';
    parallax[1].style.top = xPositionParallax[1] + 'px';

window.addEventListener('scroll', ()=>{    
    xPositionParallax[0] = xStartingPositionParallax[0] - window.scrollY * 2.5;
    xPositionParallax[1] = xStartingPositionParallax[1] - window.scrollY / 2;
    parallax[0].style.top = xPositionParallax[0] + 'px';
    parallax[1].style.top = xPositionParallax[1] + 'px';
})

/*Opacity section Mes Compétences */

let mesCompetences = document.getElementsByClassName('mesCompetences')[0];
let categoriesCompetences = document.getElementsByClassName('categorieCompetences');
let k;

if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
    for(k = 0; k <categoriesCompetences.length; k++){
        categoriesCompetences[k].style.opacity = 1;
        categoriesCompetences[k].style.transitionDelay = (k+1) +'s';
    }
    mesCompetences.style.opacity = 1;
}else{
    for(k = 0; k <categoriesCompetences.length; k++){
        categoriesCompetences[k].style.opacity = 0;
        categoriesCompetences[k].style.transitionDelay = 0 + 's';
    }
    mesCompetences.style.opacity = 0;
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + parallax[1].clientHeight + xStartingPositionParallax[1] - window.scrollY / 2 < window.scrollY){
        for(k = 0; k <categoriesCompetences.length; k++){
            categoriesCompetences[k].style.opacity = 1;
            categoriesCompetences[k].style.transitionDelay = (k+1) +'s';
        }
        mesCompetences.style.opacity = 1;
    }else{
        for(k = 0; k <categoriesCompetences.length; k++){
            categoriesCompetences[k].style.opacity = 0;
            categoriesCompetences[k].style.transitionDelay = 0 + 's';
        }
        mesCompetences.style.opacity = 0;
    }
})

