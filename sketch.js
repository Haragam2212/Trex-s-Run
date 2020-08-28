var PLAY=1;
var END=0;
var gameState=PLAY;
var restart,gameover,checkpointi,jumpi,outi

function preload(){
  //preloads animations and sounds that we need for our program.
 trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundi=loadImage("ground2.png");
  cloudi=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
  trex_collided=loadImage("trex_collided.png");
  gameoveri=loadImage("gameOver.png");
  restarti=loadImage("restart.png");
  jumpi=loadSound("jump.mp3");
  checkpointi=loadSound("checkPoint.mp3");
  outi=loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);
  //creating the trex sprite
 trex=createSprite(50,165,20,50);
 trex.addAnimation("trex_run",trex_animation);
  trex.addImage("trex_died",trex_collided);
  trex.scale=0.4;
  
  ground=createSprite(300,190,600,20);
  ground.addImage("ground",groundi);
  
  ground.x=ground.width/2;
  
  invisible_ground=createSprite(300,195,600,7);
  invisible_ground.visible=false;
  botton=createSprite(300,50,40,10);
  
  gameover=createSprite(300,100,20,30);
  gameover.addImage("gameover",gameoveri);
  gameover.scale=0.5;
  gameover.visible=false;
  restart=createSprite(300,150,20,30);
  restart.addImage("restart",restarti);
  restart.scale=0.5;
  restart.visible=false;
  score=0;
  obstacleGroup=new Group();
  cloudGroup=new Group();
}

function draw() {
  background(256);
  text("score: "+score,500,50);
  trex.collide(invisible_ground);
  if(gameState===PLAY){
  if (ground.x<0){
 ground.x=ground.width/2
  }
    ground.velocityX=-3;
  score=score+Math.round(getFrameRate()/60);
  console.log(getFrameRate()/60);
  //making the trex jump
  if(keyDown("space")||mousePressedOver(botton)&&trex.y>=165){
    trex.velocityY=-15; 
    jumpi.play();
  }
  //add gravity
 trex.velocityY=trex.velocityY+0.9;
    
   if (score>0 && score%100 === 0){
      checkPointi.play();
    }  
  
  //function call
  spawnClouds();
  spawnObstacles();
    if(trex.isTouching(obstacleGroup)){
     gameState=END;
      outi.play()
    }
  }
  if(gameState===END){
   score=0;
  ground.velocityX=0;   
  cloudGroup.setVelocityEach(0,0);
   obstacleGroup.setVelocityEach(0,0);
   trex.changeImage("trex_died",trex_collided);
    trex.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible=true;
    restart.visible=true;
     if(keyDown("space")||mousePressedOver(restart)&&trex.y>=167){
    reset(); 
    }
  }
 drawSprites(); 
}
//function defination

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage("cloud",cloudi);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,172,10,40);
    obstacle.velocityX = -3;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
              break;
      case 2: obstacle.addImage(obstacle2)       
              break; 
      case 3: obstacle.addImage(obstacle3)
              break;
      case 4: obstacle.addImage(obstacle4)
              break;
      case 5: obstacle.addImage(obstacle5)
              break;
      case 6: obstacle.addImage(obstacle6)
              break;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
score=0
gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("trex_run",trex_animation);
}