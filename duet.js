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

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawDuet();      
    //drawBricks();
   // getBricks();
   drawScore();
   
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
   

    
    setTimeout(animate, 30);

//timeoutId = setInterval(makeEnemy, timeBetweenEnemies);

}
//timeoutId = setInterval(makeEnemy, timeBetweenEnemies);
//setInterval(makeEnemy,200);
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
setInterval(increaseSpeed,50000);

 var enemyLength =  40;
  var enemyBreadth =20;
function makeEnemy() {
  var enemyX = 450 + Math.floor(Math.random()*450);
 
  var enemyY = 0;
  var enemySpeed = enemyBaseSpeed;
  //enemies.push(makeSquare(enemyX, enemyY, enemySize, enemySpeed));
  

enemies.push(makeSquare(enemyX, enemyY, enemyLength, enemyBreadth, enemySpeed));
//score++;
}
function getScore(){
	score++;
}
setInterval(getScore,1000);

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
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
let interval = setInterval(makeEnemy,2000);
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

 animate();
