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

var brickWidth = Math.random()*100;
var brickHeight= 40;

var brickPadding = 30;


var yBrick=0;
 
var brickSpeed = 0.5;
var score = 0;



function animate() {
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawDuet();      
    //drawBricks();
    getBricks();
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

		yBrick+=brickSpeed ;
    
    
    setTimeout(animate, 30);
}

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
var xBrick = Math.floor(Math.random()*(window.innerWidth-brickWidth));

function getBricks(){
	
	
	var bricks = [];
	bricks[0]={
	x:xBrick,
	y:0
	};

	for(var i=0 ; i < bricks.length;i++){
		
		bricks[i].y = yBrick;
		

		ctx.fillStyle='green';
		ctx.fillRect(bricks[i].x,bricks[i].y,brickWidth,brickHeight);

		var newX=Math.floor(Math.random()*(window.innerWidth-brickWidth));
		//console.log(window.innerHeight/2);
		//console.log(-bricks[i].y);

		if(bricks[i].y===window.innerHeight/2){
     //console.log(bricks[0]);
     var obj = {};
		obj["x"] = newX ;
		obj["y"] = 0;
		bricks.push(obj);
			/*bricks.push({
				x:10,
				y:0
				})*/
		}

	}
}






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
