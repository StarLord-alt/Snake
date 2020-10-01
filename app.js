let grid=document.querySelector(".grid")
let title=document.querySelector(".title")
let code=100;
let snake=[];
let cible=[]
let direction="droite"
const start_x=10;
const start_y=10;
let occurence=0;
let nextsquare=[]
let score=0;
const squareSize=25//max 20 blocks de 25px de coté

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#F9DDC4';
ctx.fillRect(0, 0, 500, 500);

function init(){
    refreshScore()
    cible.x=14;
    cible.y=4;
    for(let i=0;i<20;i++){
        snake.splice(0,0,new  SetPoint(start_x+i,start_y));
    }
}
function randTarget(){
    let rand_x= Math.floor(Math.random() * Math.floor(20));
    let rand_y= Math.floor(Math.random() * Math.floor(20));

    while(!snake.some(e => e.y === rand_y)&& !snake.some(e => e.x === rand_x )){
         rand_y= Math.floor(Math.random() * Math.floor(20));
        rand_x= Math.floor(Math.random() * Math.floor(20));
    }
    cible.x=rand_x;
    cible.y=rand_y;
    display();
}
let terminator
function main(){
    document.onkeypress =  zx;
    init()
    display();


    for(let i=0;i<10000;i++){
        terminator=setTimeout(function(){
            switch (code) {
                case 122:
                            if(direction==="bas"){

                                vertical(0,1)

                            }
                            else{
                                vertical(1,0)
                            }

                    break;
                case 115:
                    if(direction==="haut"){
                        vertical(1,0)

                    }else{
                        vertical(0,1)
                    }

                    break;
                case 113:
                            if(direction==="droite"){
                                horizontal(0,1)

                            }else{
                                horizontal(1,0)
                            }

                    break;
                    case 100:
                            if(direction=== "gauche"){
                                horizontal(1,0)

                            }else{
                                horizontal(0,1)
                            }

                    break;
                default:
                    //continuer dans la meme direction
                    break;
            }
            if(nextsquare.x>20){
                nextsquare.x=0;
            }
            if(nextsquare.y>20){
                nextsquare.y=0;
            }
            if(cible!== null)
            if(snake[0].x===cible.x && snake[0].y===cible.y){
                snake.splice(0,0,new  SetPoint(cible.x,cible.y));
                randTarget();
                score++;
                refreshScore()
                display()
            }

            for(let i=2;i<snake.length;i++){
                if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
                    occurence++;
                }
            }
            if(occurence!==0){

                snake=[]
                cible=null
                ctx.font = "30px Arial";
                ctx.fillText("Game Over !!!", 200, 200);
                clearInterval(terminator)

            }
            occurence=0;





        },100*i,i)}






   // horizontal(0,1)

}
function refreshScore(){
    document.querySelector(".score").innerHTML="<h2>Score: "+score+"</h2>";
}
function zx(e){
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode
        code=charCode

}

function display() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#F9DDC4';
    ctx.fillRect(0, 0, 500, 500);

    if(snake!==null){
        for(let i=0;i<snake.length;i++){
            ctx.fillStyle = '#261D14';
            ctx.fillRect(snake[i].x*squareSize, snake[i].y*squareSize, squareSize, squareSize);
        }
        ctx.fillStyle = '#FF0000';
        if(cible!== null)
        ctx.fillRect(cible.x*squareSize, cible.y*squareSize, squareSize, squareSize);
    }


}
function horizontal(gauche,droite){
    if(droite===1){
        for(let j=snake.length-1;j>=0;j--){

            if(j!==0){
                snake[j].y=snake[j-1].y
                snake[j].x=snake[j-1].x
            }else{
                snake[0].x++;
            }
            if(snake[0].x>20){
                snake[0].x=0;
            }


        }
        direction="droite"
    }else{
        for(let j=snake.length-1;j>=0;j--){

            if(j!==0){
                snake[j].y=snake[j-1].y
                snake[j].x=snake[j-1].x
            }else{
                snake[0].x--;
            }
            if(snake[0].x<0){
                snake[0].x=20;
            }

        }
        direction="gauche"
    }
    display()

}
function vertical(haut,bas){
    if(haut===1){
        for(let j=snake.length-1;j>=0;j--){

            if(j!==0){
                snake[j].y=snake[j-1].y
                snake[j].x=snake[j-1].x
            }else{
                snake[0].y--;
            }
            if(snake[0].y<0){
                snake[0].y=20;
            }

        }
        direction="haut"
    }else{
        for(let j=snake.length-1;j>=0;j--){

            if(j!==0){
                snake[j].y=snake[j-1].y
                snake[j].x=snake[j-1].x
            }else{
                snake[0].y++;
            }

            if(snake[0].y>20){
                snake[0].y=0;
            }

        }
        direction="bas"
    }
    display()
}
function print_r(array){
    console.log(JSON.stringify(array, null,1)+"\n\n")
}
function SetPoint(x,y){
    let point={};
    point.x=x;
    point.y=y;
    return point;
}

main()