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

