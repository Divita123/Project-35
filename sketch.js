var balloon,balloonImage1,balloonImage2;
var database,height;
var dropGroup,spawndrop;
var dropGroup2,spawndrop2;
var dropGroup3,spawndrop3,drop,drop2,drop3;
function preload(){
   bg =loadImage("cityImage.png");
   cloud_img=loadImage("cloud.png");
   drop_img=loadImage("balloon.png");
   drop_img2=loadImage("balloon2.png");
   drop_img3=loadImage("balloon3.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

 dropGroup3 = new Group();
 dropGroup2 = new Group();
 dropGroup = new Group();

cloud=createSprite(400,100,20,20);
cloud.addImage(cloud_img);
cloud.scale=0.50;

cloud2=createSprite(600+250,100,20,20);
cloud2.addImage(cloud_img);
cloud2.scale=0.50;

cloud3=createSprite(800+250,100,20,20);
cloud3.addImage(cloud_img);
cloud3.scale=0.50;

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.3;
  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readPosition,showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyCode===71){
    cloud.velocityX=-10;

  }
  if(keyCode===72){
    cloud3.velocityX=10;
 
  }

  if(keyCode===74){
    cloud2.velocityY=-10;
  
  }

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-10);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,+10);
    balloon.scale=balloon.scale+0.01;
  }
  spawndrop3();
  spawndrop2();
  spawndrop();
  drawSprites();
  fill("yellow");
  stroke("black");
  strokeWeight(4);
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  fill("white");
  stroke("black");
  strokeWeight(4);
  textSize(25);
  text("**And please to Use [G,H,J] keys to remove the clouds or it can be dangerous for the kids",40,40+50);
}
function changePosition(x,y){
  database.ref('balloon/height').set({
      x:height.x+x,
      y:height.y+y
  })

}
function readPosition(data){
  height=data.val();
  balloon.x=height.x
  balloon.y=height.y
}
function showError(){
  console.log("Error on writing the database");
}

function spawndrop3() {
  if (frameCount % 100 === 0) {
   drop3 = createSprite(200,800);
   drop3.x=Math.round(random(20,1500));
   drop3.addImage(drop_img);
   //console.log(drop3.x);
   drop3.scale = 0.3;
   drop3.velocityY =-10;
   drop3.setlifetime = 800;
   dropGroup3.add(drop3);
  } 
}
function spawndrop2() {
  if (frameCount % 50 === 0) {
   drop2 = createSprite(200,800);
   drop2.x=Math.round(random(20,1500));
   drop2.addImage(drop_img2);
   //console.log(drop3.x);
   drop2.scale = 0.1;
   drop2.velocityY =-10;
   drop2.setlifetime = 800;
   dropGroup3.add(drop2);
  } 
}
function spawndrop() {
  if (frameCount % 50 === 0) {
   drop2 = createSprite(200,800);
   drop2.x=Math.round(random(20,1500));
   drop2.addImage(drop_img3);
   //console.log(drop3.x);
   drop2.scale = 0.3;
   drop2.velocityY =-10;
   drop2.setlifetime = 800;
   dropGroup.add(drop2);
  } 
}