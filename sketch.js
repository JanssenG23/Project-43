var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("stone.png");
  gameoverimg = loadImage("gameOver.png");

  bananasGroup = createGroup();
  obstaclesGroup = createGroup();

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  spawnFood();
  spawnObstacles();
  
    if(keyDown("space") ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(bananasGroup.isTouching(player)){
      bananasGroup.destroyEach();
      score = score + 2;
      player.scale += +0.1;
    }


    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
      if(gameState === END){
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  player.visible = false;

  gameoversprite = createSprite(400,200,20,20);
  gameoversprite.addImage(gameoverimg);

  backgr.velocityX=0;
    }

    

  }

  drawSprites();
  fill("white")
  textSize(18)
  text("Score: "+score,700,50);
}


function spawnFood(){
  if (frameCount % 80 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(140,180));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
    
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = banana.depth;
    banana.depth = banana.depth + 1;
    
    //adding the bananas to the group
   bananasGroup.add(banana);
    }
}


function spawnObstacles() {
  if (frameCount % 130 === 0) {
    obstacles = createSprite(600,340,10,10);
    obstacles.x = Math.round(random(500,590));
    obstacles.addImage(obstaclesImage);
    obstacles.scale = 0.075;
    obstacles.velocityX = -3;
    
    
    obstacles.lifetime = 200;
    
    //adjust the depth
    obstacles.depth = obstacles.depth;
    obstacles.depth = obstacles.depth + 1;
    
    //adding the bananas to the group
    obstaclesGroup.add(obstacles);
    }
}