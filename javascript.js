const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false 
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody=[];
let velocityX=0, velocityY = 0;
let setIntervalid;
let score =0;



let highscore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML= `High Score : ${highscore}`; 



const changFoodposition =() =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
   
}
const handleGamerOver = () => {
    clearInterval(setIntervalid);
    name= prompt("dime tu nombre"); 
    alert("muy bien jugado"+" "+name+" vuelve a jugar 😛");
    location.reload();
}

const changeDirection= (e) => {
    
     if(e.key==="ArrowUp" && velocityY != 1) {
       velocityX = 0;
       velocityY = -1;
    }
    else if(e.key==="ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
     }
     else if(e.key==="ArrowLeft"  && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
     }
     else if(e.key==="ArrowRight"  && velocityX !=-1) {
        velocityX = 1;
        velocityY = 0 ;
     }
     
}

const initgame = ()=> {
    if(gameOver)return handleGamerOver();
    let htmlmarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX=== foodX && snakeY === foodY){
        changFoodposition();
        snakeBody.push([foodX,foodY]);
        score++;

        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score",highscore);    
        scoreElement.innerHTML = `score :${score}`;
        highScoreElement.innerHTML= `High Score : ${highscore}`;
      
    }
    for( let i = snakeBody.length - 1 ; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
  snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
       gameOver = true;

    }

    for(let i = 0; i < snakeBody.length; i++){
        htmlmarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i!== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver=true;


        }
    }
    playBoard.innerHTML = htmlmarkup;
}

changFoodposition();

setIntervalid = setInterval(initgame,125);

document.addEventListener("keydown",changeDirection);