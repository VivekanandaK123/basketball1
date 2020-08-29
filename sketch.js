var engine,world;
const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

var gameState = "onSling";

var score = 0;

var backgroundImg;

var potted = 0;

var pot = false;

var ballCount = 10;

function preload(){
  backgroundImg = loadImage("images/bg.jpg");
  coolSound = loadSound("sounds/Cool.mpeg");
  //gameoverSound = loadSound("sounds/gameover.mpeg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  ground = new Ground(displayWidth/2,displayHeight-160,displayWidth,20);
  ground1 = new Ground(-8,displayHeight-1000,displayWidth/100,displayHeight*3);
  ground2 = new Ground(displayWidth+10,displayHeight-1000,displayHeight/100,displayHeight*3);

  ball = new Ball(displayWidth/2,displayHeight/3);
 
  basket1 = new Basket(displayWidth/18,displayHeight/4.75,displayWidth/185,displayHeight/6);
  basket2 = new Basket(displayWidth/9,displayHeight/2.9,displayWidth/260,displayHeight/10);
  basket3 = new Basket(displayWidth/5.8,displayHeight/2.9,displayWidth/260,displayHeight/10);

  

  slingshot = new Slingshot(ball.body,{x:displayWidth/2,y:displayHeight/3});


  //createSprite(400, 200, 50, 50);
}

function draw() {
  background(backgroundImg); 

  console.log(displayWidth);
  console.log(displayHeight);
  
 ball.display();
  //ground.display();
  ground1.display();
  basket1.display();
  basket2.display();
  basket3.display();
  ground2.display();

  if(gameState === "onSling"){
    textSize(20);
    fill(0,250,255);
    textFont("Algerian");
    text("Drag the mouse to take the shot!!",displayWidth/2.67,displayHeight/40);
    
  }
  
  if(ball.body.position.x>displayWidth/9 &&ball.body.position.x<displayWidth/5.8 &&ball.body.position.y>displayHeight/3.3 &&ball.body.position.y<displayHeight/2.5){
    textSize(30)
    fill("250,130,96");
    textFont("Algerian");
    text("Shot Cleared!!!",displayWidth/2.35,displayHeight/2.35);
    score = score + 5;
    coolSound.play();
    pot = true;
    
  }

  if(pot === true){
    potted = potted + 1;
    pot = false;
  }


  textSize(20);
  fill("yellow");
  textFont("Algerian");
  text("Score : "+ score,displayWidth/2.13,displayHeight/3.43);
  text("Balls Remaining : "+ ballCount,displayWidth/5.13,displayHeight/3.43);

  textSize(25);
  fill("purple");
  textFont("Algerian");
  text("Shoot the left basket!",displayWidth/2.5,displayHeight/1.25);

  if(ballCount === 0){
    gameState="end";
    //gameoverSound.play();
    textSize(30);
    fill("red");
    text("Game Over!!",displayWidth/2.2,displayHeight/2);
    //text("Balls Potted : "+potted+ " Balls Missed : "+(10-potted),displayWidth/2.5,displayHeight/2.5);
  }

  
 //drawSprites();
}

function mouseDragged(){
  if(gameState!=="released"){
  Matter.Body.setPosition(ball.body,{x:mouseX, y:mouseY});
  }
}

function mouseReleased(){
  slingshot.fly();
  gameState = "released";
  ballCount = ballCount - 1;

}

function keyPressed(){
  if(touches.length>0 &&ball.body.speed<1){
    gameState = "onSling";
    textSize(20);
    fill(0,250,255);
    textFont("Britannic Bold");
    text("Drag the mouse to take the shot!!",displayWidth/2.67,displayHeight/40);
    Matter.Body.setPosition(ball.body,{x:displayWidth/2, y:displayHeight/3});
    slingshot.attach(ball.body);
    touches = [];
  }
}