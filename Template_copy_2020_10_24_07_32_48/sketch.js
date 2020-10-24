PLAY = 1
END = 0

var SurvivalTime
var gameState = PLAY
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
 
  monkey = createSprite(50,300);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  
  ground1 = createSprite(10,380,5000,100);
  ground1.shapeColor = "brown";
  
  ground = createSprite(10,330,5000,10);
  ground.shapeColor = "lime";
  
  
  
  //monkey.debug = true;
}


function draw() {
  background ("cyan");
  
  SurvivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+SurvivalTime,50,60)
  text("Score:"+score,50,50)
  
    if(gameState === PLAY){
      if(keyDown("space")&& monkey.y >=250) {
        monkey.velocityY = -15;
    }
    
  
  if(monkey.isTouching(FoodGroup)){
    score = score + 2
    FoodGroup.destroyEach()
  }
   
    monkey.velocityY = monkey.velocityY + 0.9;
  
  monkey.collide(ground);
  
 
 spawnBananas();
 spawnObstacles();

    }
 if(monkey.isTouching(obstacleGroup)){
   gameState = END;
 }
  
  else if(gameState === END){
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setVelocityEach(0);
    
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
    stroke(100)
    text("GAMEOVER",200,200)
    text("PRESS 'R' TO RESTART",200,250)
    
    
    if(keyDown("r")){
      gameState = PLAY;
      
      score = 0;
    }
    
  }
  
  
  
  
  drawSprites();

}
function spawnBananas(){
  if(frameCount % 100 == 0){
  banana = createSprite(600,200,10,10);
  banana.y = Math.round(random(120,200));
  banana.addImage("Banana",bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 120;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,300,10,10);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    
    obstacle.scale = 0.15;
    
    obstacleGroup.add(obstacle);
  }
}


