var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
 canvas.width = window.innerWidth;

 var xBig=window.innerWidth/2;
 var yBig=window.innerHeight-70;

const bigRadius = 50;
const blueRadius = 7;
const redRadius = 7;

 var xBlue = xBig;
 var yBlue =yBig - 50;
 
 var xRed = xBig;
 var yRed = yBig+50;

 const speed = 7;
 var angleBlue = 0;
 var angleRed = 180;


var rightPressed = false;
var leftPressed = false;

var paused = false;

/*var brickWidth = Math.random()*100;
var brickHeight= 40;

var brickPadding = 30;*/



 
var score = 0;

function makeSquare(x, y, length,breadth, speed) {
  return {
    x: x,
    y: y,
    l: length,
    b:breadth,
    s: speed,
    draw: function() {
      ctx.fillRect(this.x, this.y, this.l, this.b);
    }
  };
}
//var timeBetweenEnemies = 5 * 1000;
// ID to track the spawn timeout
//var timeoutId = null;





function animate() {
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height); 
 if(paused){
 	return;
 }


    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawDuet();      
    //drawBricks();
   // getBricks();
   drawScore();
   drawButton();
   draw();
       //drawScore();
    //collisionDetection();
    
    var newXBlue  = bigRadius * Math.cos(angleBlue * (Math.PI/180));
    var newYBlue = bigRadius * Math.sin(angleBlue * (Math.PI/180));
    
     xBlue = newXBlue + xBig;
     yBlue = newYBlue + yBig;

    var newXRed = bigRadius * Math.cos(angleRed * (Math.PI/180));
    var newYRed = bigRadius * Math.sin(angleRed * (Math.PI/180));  

     xRed = xBig + newXRed;
     yRed = yBig + newYRed; 
    
    
	if(rightPressed) { 
     angleBlue += speed; 
    angleRed += speed;;
		}
	else if(leftPressed) {
     angleBlue -= speed; 
    angleRed -= speed;;
		}

	
		//yBrick+=brickSpeed ;
   

    
    //setTimeout(animate, 30);

//timeoutId = setInterval(makeEnemy, timeBetweenEnemies);

}
//timeoutId = setInterval(makeEnemy, timeBetweenEnemies);
//setInterval(makeEnemy,200);
//setInterval(animate,30);
function drawDuet(){

	 ctx.beginPath();
	ctx.arc(xBig,yBig,50,0,Math.PI*2,true);
	ctx.strokeStyle = 'grey';
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(xBlue,yBlue,blueRadius,0,Math.PI*2,true);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(xRed,yRed,redRadius,0,Math.PI*2,true);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
}
//var xBrick = Math.floor(Math.random()*(window.innerWidth-brickWidth));

/*var bricks = [];
	bricks[0]={
	(x+0):xBrick,
	(y+0):0
	};*/

	var enemies = [];

// Add an enemy object to the array
var enemyBaseSpeed = 2;

function increaseSpeed(){
	enemyBaseSpeed++;
}
//setInterval(increaseSpeed,50000);

 var enemyLength =  40;
  var enemyBreadth =20;
function makeEnemy() {
	if(paused){
		return;
	}
  var enemyX = (innerWidth/3) + Math.floor(Math.random()*innerWidth/3);
 
  var enemyY = 0;
  var enemySpeed = enemyBaseSpeed;
  //enemies.push(makeSquare(enemyX, enemyY, enemySize, enemySpeed));
  
enemies.push(makeSquare(enemyX, enemyY, enemyLength, enemyBreadth, enemySpeed));
//score++;
}
function getScore(){
	if(paused){
		return;
	}
	score++;
}
//setInterval(getScore,1000);

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

 /*function Pause()
{
    if (paused==false)
    {
        paused = true;
    } else if (paused==true)
    {
       paused= false;
    }

}*/
/*function getBricks(){
	

	for(var i=0 ; i < bricks.length;i++){
		
		bricks[i][y+i] = yBrick;
			
		ctx.fillStyle='green';
		ctx.fillRect(bricks[i][x+i],bricks[i][y+i],brickWidth,brickHeight);
		console.log(bricks.length);

		if(bricks[i][y+i]===window.innerHeight/2){
       console.log(bricks);
    
       //for(j=1;j<bricks.length;j++){

 		var obj = {};
		obj["x+i"] = 0 ;
		obj["y+i"] = 0;
		bricks.push(obj);

		console.log(bricks);
			bricks[i][x+i]= Math.floor(Math.random()*(window.innerWidth-brickWidth));
			bricks[i][y+i]=y+i;
			(y+i)= (y+i)+0.5;

		
			
				}		}

	}
*/
//let interval=setInterval(makeEnemy,2000);
let brickTime =2000;
if(score>=50&&score<100){
 brickTime = 1500;
}
else if(score>=100&&score<150){
 bricktime =1000;
}
else if (score>=150){
	bricktime=500;
}

	 setInterval(animate,30);
	 let interval = setInterval(makeEnemy,brickTime);
	 setInterval(increaseSpeed,50000);
	 setInterval(getScore,1000);

	


function draw() {
  //erase();

  // Move and draw the enemies
  enemies.forEach(function(enemy) {
    enemy.y += enemyBaseSpeed;
    
    ctx.fillStyle = '#00FF00';

    enemy.draw();

    if(enemy.x<xBlue && xBlue<enemy.x+enemyLength && enemy.y<yBlue && yBlue<enemy.y+enemyBreadth || enemy.x<xRed && xRed<enemy.x+enemyLength && enemy.y<yRed && yRed<enemy.y+enemyBreadth){
    		alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
    }
  });
}

console.log(enemies);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
/*if(!paused)
	{ 
	 setInterval(animate,30);
	 let interval=setInterval(makeEnemy,2000);
	 setInterval(increaseSpeed,50000);
	 setInterval(getScore,1000);

	}*/
document.addEventListener('keydown',pause,false); 

function pause(e){
	if(e.keyCode === 80){
		paused = !paused;
	}
}

 var buttonX = 120;
    var buttonY = 20;
    var buttonW = 80;
    var buttonH = 30;
 
    // Render button
    function drawButton(){
    	ctx.font = '20px serif';
  ctx.fillText('Restart', 124, 40);

    ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
    ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
}


document.addEventListener("click",restart);

function restart(event){
	if(event.x > buttonX && 
        event.x < buttonX + buttonW &&
        event.y > buttonY && 
        event.y < buttonY + buttonH){
		document.location.reload();
            clearInterval(interval);
	}
}

/*if (e.key == "80")// spacebar key
{
    if (paused==false)
    {
        paused = true;
    } else if (paused==true)
    {
       paused= false;
    }

}
});*/


console.log(paused);

 animate();
