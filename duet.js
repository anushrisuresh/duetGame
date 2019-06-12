//General variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

 canvas.height = window.innerHeight;
 canvas.width = window.innerWidth;

//duet variables

 var xBig=window.innerWidth/2;
 var yBig=window.innerHeight-70;

 var bigRadius = 50;
 var blueRadius = 8;
 var redRadius = 8;

 var xBlue = xBig;
 var yBlue =yBig - 50;
 //blue img
 //var blueImg = new Image();
 //blueImg.src = 'https://img6.androidappsapk.co/300/0/0/7/com.xooxle.blueballworld.png';
//red img
var blueSharperImg = new Image();
blueSharperImg.src = 'blueSharper.png';



blueSharperImg.width= 64;
blueSharperImg.height= 64;


var redImg = new Image();
redImg.src = 'https://images-eu.ssl-images-amazon.com/images/I/512I%2BPOfVzL.png'


 //blueImg.width=2*blueRadius;
//blueImg.height=2*blueRadius;

redImg.width = 2*redRadius;
redImg.height= 2*redRadius;
 
 var xRed = xBig;
 var yRed = yBig+50;

 var duetSpeed = 7;
 var angleBlue = 0;
 var angleRed = 180;

 //brick variables
 var bricks = [];
 var brickSpeed = 2;
 var brickBreadth =20;

//brick img
var brickImg= new Image();
brickImg.src = 'brick.png'
 //meter variables
 var meter=[];
 var xaffection= 40;
 var yaffection=500;
 var affectionW= 30;
 var affectionH =4;

 var i=0;
 var j=0;

//Horlicks variables
var horlicks=[];
var horlicksLength = 20;
var horlicksBreadth = 40;
var horlicksSpeed =1.5;
var horlicksStatus=false;
//horlicks img
var horlicksImg= new Image();
horlicksImg.src = 'horlicks.png';

//Flight variables
var flights=[];
var flightLength = 50;
var flightBreadth = 80;
var flightSpeed =2.5;

var flightImg= new Image();
flightImg.src = 'flight.png'
//Rotating block variables
var rotatingBricks=[];
var rotatingBrickSpeed=1;
var rotatingBrickBreadth=20;
var rotatingAngle=0;


//score variables
var score = 0;
var scoreP1=0;
var scoreP2=0;

//pause and variables 
var paused = false;

//multiplayer variables 
var multiplayerStatus = false;
var diedStatus=false;

//duet button variables
var rightPressed = false;
var leftPressed = false;

//restart button variables
    var restartButtonX = 120;
    var restartButtonY = 20;
    var restartButtonW = 80;
    var restartButtonH = 30;

//multiplayer button variables
	var multiButtonX = window.innerWidth-200;
	var multiButtonY = 20;
	var multiButtonW = 100;
	var multiButtonH = 30;
	var P1status=1;

//merge
var mergeStatus=0;

//instructions
var instructionStatus=false;
var instructionButtonX= window.innerWidth-157;
var instructionButtonY= 180;
var instructionButtonW= 120;
var instructionButtonH=30;

//game over
var gameOver=false;

var start=false;

function menu() {

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#000000';
  ctx.font = '36px Arial';
  
  ctx.fillText('Click here to Start', canvas.width/2-150, 200);
  ctx.font = '18px Arial';
  ctx.fillText('<- anticlockwise and -> clockwise', canvas.width/2-150, (canvas.height / 4) * 3);
  ctx.fillText("'p' to pause",canvas.width/2-50,(canvas.height / 4) * 3 + 50);
  
  canvas.addEventListener('click', startGame);
 
}

// Start the game
function startGame() {

 start =true;
  animateInterval=setInterval(animate,30);
  interval = setInterval(makeBrick,brickTime);
   speedInterval=setInterval(increaseSpeed,50000);
   scoreInterval=setInterval(getScore,1000);
   meterInterval=setInterval(makeMeter,1000);
   horlicksInterval=setInterval(makeHorlicksPacket,10000);
   flightInterval=setInterval(makeFlight,20000);
   rotatingInterval=setInterval(makeRotatingBrick,5000);

   animate();
  
  canvas.removeEventListener('click', startGame);
}

function endGame() {

  clearInterval(animateInterval);
  clearInterval(interval);
  clearInterval(speedInterval);
  clearInterval(scoreInterval);
   clearInterval(meterInterval);
   clearInterval(horlicksInterval);
   clearInterval(flightInterval);
   clearInterval(rotatingInterval);

  

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0,canvas.width,canvas.height);

  ctx.fillStyle = '#000000';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over. Final Score: ' + score, canvas.width / 2, canvas.height / 2);
  ctx.fillText('Click here to start new game',canvas.width /2,canvas.height/2+30);
  
}

function animate() {
       
 if(paused){
 	return;
 }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    instructions();
     drawDuet();      
 	   addMeter();
     drawScore();
     drawRestartButton();
     drawBricks();
     multiplayerButton();
     moveHorlicksPacket();
     moveFlight();
     drawRotatingBrick();
     merge();
     drawAffection();
     instructionsButton();
    
    var newXBlue  = bigRadius * Math.cos(angleBlue * (Math.PI/180));
    var newYBlue = bigRadius * Math.sin(angleBlue * (Math.PI/180));
    
     xBlue = newXBlue + xBig;
     yBlue = newYBlue + yBig;

    var newXRed = bigRadius * Math.cos(angleRed * (Math.PI/180));
    var newYRed = bigRadius * Math.sin(angleRed * (Math.PI/180));  

     xRed = xBig + newXRed;
     yRed = yBig + newYRed; 
    
    
	if(rightPressed) { 
     angleBlue += duetSpeed; 
    angleRed += duetSpeed;
		}
	else if(leftPressed) {
     angleBlue -= duetSpeed; 
    angleRed -= duetSpeed;;
		}

		ctx.strokeRect(40,400,30,100);

    if(gameOver){
      endGame();
    }
}



function drawDuet(){

	 ctx.beginPath();
	ctx.arc(xBig,yBig,50,0,Math.PI*2,true);
	ctx.strokeStyle = 'grey';
	ctx.stroke();
	ctx.closePath();

if(horlicksStatus==false){
	ctx.beginPath();
	ctx.arc(xBlue,yBlue,blueRadius,0,Math.PI*2,true);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.closePath();
}
else if(horlicksStatus==true){
  ctx.save();
  ctx.drawImage(blueSharperImg,xBlue-32,yBlue-32,blueSharperImg.width,blueSharperImg.height)
  ctx.restore();
}
	
	
  	//blueImg.onload = function() {
  		/*ctx.save();
    ctx.drawImage(blueImg, xBlue-blueRadius, yBlue-blueRadius,blueImg.width,blueImg.height);
    ctx.restore();*/
  //};
	

	/*ctx.beginPath();
	ctx.arc(xRed,yRed,redRadius,0,Math.PI*2,true);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();*/
	ctx.save();
    ctx.drawImage(redImg, xRed-redRadius, yRed-redRadius,redImg.width,redImg.height);
    ctx.restore();
 
}
//var xBrick = Math.floor(Math.random()*(window.innerWidth-brickWidth));

function rectangleFactory(x, y, length,breadth, speed,status,img) {
  return {
    x: x,
    y: y,
    l: length,
    b:breadth,
    s: speed,
    p:status,
    //img:img,
    draw: function() {
      ctx.fillRect(this.x, this.y, this.l, this.b);
    },
   
  };
}

//bricks fall

function makeBrick() {
	if(paused){
		return;
	}
  var brickX = ((canvas.width/2-100) + Math.floor(Math.random()*200));
  var brickY = 0;
  var brickLength = Math.floor(Math.random()*70);
  var status = 1;
  
  
  bricks.push(rectangleFactory(brickX, brickY, brickLength, brickBreadth, brickSpeed,status/*,brickImg*/));

}

function drawBricks() {
 
    bricks.forEach(function(brick) {

      brick.y += brickSpeed;
    
      ctx.fillStyle = 'rgba(0,128,128,0.7)';
      ctx.save();
      ctx.drawImage(brickImg,brick.x,brick.y,brick.l,brick.b);
      ctx.restore();
     
if(horlicksStatus==false){
    if(brick.x<xBlue && xBlue<brick.x+brick.l && brick.y<yBlue && yBlue<brick.y+brickBreadth || brick.x<xRed && xRed<brick.x+brick.l && brick.y<yRed && yRed<brick.y+brickBreadth){
    		
    	if(multiplayerStatus==true){
            diedStatus=!diedStatus;
            brick.p=0;
            }

    	else if(multiplayerStatus==false){

          gameOver=true;
    		/*alert("GAME OVER");
            document.location.reload();
            clearInterval(setInterval(makeBrick,brickTime));*/
        }

        }
    }
    //if(brick.p==1){
         //ctx.drawImage();
   //}
  });
}

//horlicks drop
function makeHorlicksPacket() {
	if(paused){
		return;
	}
  var horlicksX = ((window.innerWidth/2-50) + 2*bigRadius-10);
  var horlicksY = 0;
  var status=1
  
  horlicks.push(rectangleFactory(horlicksX, horlicksY, horlicksLength, horlicksBreadth, horlicksSpeed,status));

}

function moveHorlicksPacket() {
 
    horlicks.forEach(function(packet) {

      packet.y += horlicksSpeed;
    
      ctx.fillStyle = 'yellow';
     

       if(packet.x<xBlue && xBlue<packet.x+packet.l && packet.y<yBlue && yBlue<packet.y+horlicksBreadth){
       	blueRadius=16;
       	setTimeout(resetBlueRadius,10000);
       	horlicksStatus=true;
       	setTimeout(resetHorlicksStatus,5000);
       	packet.p=0;

       }
       if(packet.p==1){
       	ctx.save();
      ctx.drawImage(horlicksImg,packet.x,packet.y,packet.l,packet.b);
      ctx.restore();
       }

      });
}
function resetBlueRadius(){
	
	blueRadius=8;
	
}
function resetHorlicksStatus(){
	horlicksStatus=false;
}

//flights drop

function makeFlight() {
	if(paused){
		return;
	}
  var flightX = ((canvas.width/2-50) + 2*bigRadius-10);
  var flightY = 0;
  var status=1
  
  flights.push(rectangleFactory(flightX, flightY, flightLength, flightBreadth, flightSpeed,status));

}

function moveFlight() {
 
   flights.forEach(function(flight) {

      flight.y += flightSpeed;
    
      ctx.fillStyle = 'rgba(0,255,255,0.6)';
      
      if(flight.x<xBlue && xBlue<flight.x+flight.l && flight.y<yBlue && yBlue<flight.y+brickBreadth || flight.x<xRed && xRed<flight.x+flight.l && flight.y<yRed && yRed<flight.y+flightBreadth){
      	duetSpeed+=0.5;
      	 	flight.p=0;

      }
      if(flight.p==1){
      	//flight.draw();
        ctx.save();
      ctx.drawImage(flightImg,flight.x,flight.y,flight.l,flight.b);
      ctx.restore();
      }
      });
}

//rotating bricks
function makeRotatingBrick() {
	if(paused){
		return;
	}
  var rotatingBrickLength = Math.floor(Math.random()*90);
  var rotatingBrickX = ((window.innerWidth/2-100) + Math.floor(Math.random()*200));
  var rotatingBrickY = 0;
  var status=1;
  
  rotatingBricks.push(rectangleFactory(rotatingBrickX, rotatingBrickY, rotatingBrickLength, rotatingBrickBreadth, rotatingBrickSpeed,status));

}

function drawRotatingBrick() {
 
    rotatingBricks.forEach(function(brick) {
    	brick.y += rotatingBrickSpeed/*+brick.l* Math.sin(rotatingAngle * (Math.PI/180));*/
      //brick.x += brick.l*Math.cos(rotatingAngle * (Math.PI/180))
      
    
      //ctx.fillStyle = 'rgba(0,128,128,0.7)';
      
      if(horlicksStatus==false){
    if(brick.x<xBlue && xBlue<brick.x+brick.l && brick.y<yBlue && yBlue<brick.y+brickBreadth || brick.x<xRed && xRed<brick.x+brick.l && brick.y<yRed && yRed<brick.y+brickBreadth){
    		
    	if(multiplayerStatus==true){
            diedStatus=!diedStatus;
           brick.p=0;
            }

    	else if(multiplayerStatus==false){
    		alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
     }
    }
    if(brick.p==1){
      ctx.save();
      ctx.translate(brick.l/2+brick.x,brick.y+brick.b/2); 
  ctx.rotate((Math.PI / 180) * rotatingAngle); 
  ctx.translate(-(brick.l/2+brick.x),-(brick.y+brick.b/2)); 
  ctx.fillStyle = '#4D4E53';
  brick.draw();
  ctx.restore();
}
      
      rotatingAngle+=2;
    
  });
}
var xaffection= 40;
  yaffection=500;

//meter fills
function makeMeter() {

	if(paused){
		return;
	}
  //var xaffection= 40;
  yaffection=500-4*i;
  i++;
  //j++;
  
   meter.push(rectangleFactory(xaffection, yaffection, affectionW, affectionH));

  }

 function addMeter(){
  
  meter.forEach(function(level) {
    
  //  ctx.fillStyle='rgb('+4*j+',0,'+200-4*j+')';
  ctx.fillStyle='green';
    level.draw();
   
	});
  }

  function drawAffection() {
	

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Affection Meter", 8, 550);
    ctx.fillText("filled:"+i/25*100+"%",8,570);

	}
function merge(){
	if(yaffection<=400){
		//angleBlue += 20;
		//angleRed-=20;
		i=0;

		meter.forEach(function(level){
			meter.pop();
		})
	
		//yaffection=500;

		/*if(xBlue==xRed&&yBlue==yRed){
    ctx.beginPath();
	ctx.arc(xBlue,yBlue,blueRadius,0,Math.PI*2,true);
	angleBlue=0;
	angleRed=0;
	ctx.fillStyle = 'rgba(191, 85, 236, 1)';
	ctx.fill();
	ctx.closePath();		
		mergeStatus=1;
		
	}*/

	}

}


function getScore(){
	if(paused){
		return;
	}
if(multiplayerStatus==false){
	score++;
   }
else if(multiplayerStatus==true){

if(diedStatus==false)
	
	{
		scoreP1++

	
      }
      else if(diedStatus==true)
      	{
      		scoreP2++;
      	}
      }
	
    
	
}

function drawScore() {
	if(multiplayerStatus==false){

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);

	}

	else if(multiplayerStatus==true){

	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score P1: "+scoreP1, 8, 20);

    
	ctx.font = "16px Arial";
   	ctx.fillStyle = "#0095DD";
    ctx.fillText("Score P2: "+scoreP2, 8, 45);

	}
}

function increaseSpeed(){
	if(paused){
		return;
	}
	brickSpeed++;
	
}

 
let brickTime =2000;

if(score>=50&&score<100){
 	brickTime = 1500;
 	} 

else if(score>=100&&score<150){
 bricktime =1000;
	}

else if (score>=150){
	bricktime=200;
	}

function instructions(){
	ctx.fillStyle = "#0095DD";
		ctx.font = '20px serif';
		
		if(instructionStatus==true){
		ctx.fillText("'p' to pause",canvas.width-150,240);
		ctx.fillText("<- anticlockwise",canvas.width-160,260);
		ctx.fillText("-> clockwise",canvas.width-150,280);
		ctx.fillText("yellow block" ,canvas.width-150,320);
		ctx.fillText("=" ,canvas.width-100,340);
		ctx.fillText("Horlicks powerup",canvas.width-150,360);
		ctx.fillText("aqua block",canvas.width-150,400);
		ctx.fillText("=" ,canvas.width-100,420);
		ctx.fillText("flight powerup",canvas.width-150,440);
	}
		

}

function drawRestartButton(){

    
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(restartButtonX, restartButtonY, restartButtonW, restartButtonH);

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px serif';
  	ctx.fillText('Restart', 124, 40);
	    }

function multiplayerButton(){

	ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(multiButtonX,multiButtonY,multiButtonW,multiButtonH);

	ctx.fillStyle = '#ffffff';
    ctx.font = '20px serif';
  	ctx.fillText('multiplayer', window.innerWidth-197, 40);

		}

function  instructionsButton(){

	ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(instructionButtonX,instructionButtonY,instructionButtonW,instructionButtonH);

	ctx.fillStyle = '#ffffff';
    ctx.font = '20px serif';
  	ctx.fillText('instructions', window.innerWidth-150,200);

		}

		//all intervals

 /*    setInterval(animate,30);
	 let interval = setInterval(makeBrick,brickTime);
	 setInterval(increaseSpeed,50000);
	 setInterval(getScore,1000);
	 setInterval(makeMeter,1000);
	 setInterval(makeHorlicksPacket,10000);
	 setInterval(makeFlight,20000);
	 setInterval(makeRotatingBrick,5000);*/

// all button controls

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//right
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

//left
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//p button
document.addEventListener('keydown',pause,false); 

function pause(e){
	if(e.keyCode === 80){
		paused = !paused;
	}
}

 	//click multiplayer
 	document.addEventListener("click",multiplayer);

	function multiplayer(event){

		if(event.x > multiButtonX && 
        event.x < multiButtonX + multiButtonW &&
        event.y > multiButtonY && 
        event.y < multiButtonY + multiButtonH){

			multiplayerStatus= !multiplayerStatus;
	}

		}



document.addEventListener("click",restart);


function restart(event){

	if(event.x > restartButtonX && 
        event.x < restartButtonX + restartButtonW &&
        event.y > restartButtonY && 
        event.y < restartButtonY + restartButtonH||event.x>canvas.width/2-300&&event.x<canvas.width/2+300&&event.y>canvas.height/2-100&&event.y<canvas.height/2+100){
		document.location.reload();
            clearInterval(interval);
            document.removeEventListener("click",restart);
           
	}

}
document.addEventListener("click",instructionsClick);

function instructionsClick(event){

	if(event.x > instructionButtonX && 
        event.x < instructionButtonX + instructionButtonW &&
        event.y > instructionButtonY && 
        event.y < instructionButtonY + instructionButtonH)
  {
		
		instructionStatus = !instructionStatus;
	}
}


// animate();
