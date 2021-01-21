var dog,happyDog,database,foodS,foodStock
var dog_img,happyDog_img;
var food,food_img;
var x = 500;
var bgImage;
var bg;






function preload()
{
  dog_img=loadImage("dogImg.png");
  happyDog_img=loadImage("dogImg1.png");
  food_img=loadImage("food.png");
  
}







function setup() {
  database=firebase.database();
  foodStock=database.ref("Food");
  foodStock.on("value",readStock,showError);
 
  createCanvas(500,500);
  dog=createSprite(250,420);
  dog.addImage(dog_img);
  dog.scale=0.2;

  foodS = "";

  
  food=createSprite(180,470);
  food.addImage(food_img);
  food.scale=0.09 ;
  food.visible=false;
  
  fill("green");
  bg = createSprite(250,450,500,100);
  bg.shapeColor = rgb(0,204,0);

  dog.depth = bg.depth;
  dog.depth = dog.depth + 1;
  food.depth = bg.depth;
  food.depth = dog.depth + 1;
}







function draw() {  
  background(153,204,255);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
    happyDog_img.scale = 0.1;
    food.visible=true;
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dog_img);
    food.visible=false;
  }
  
  drawSprites();
  

  strokeWeight(2);
  fill("navy");
  textSize(24);
  text("Food Remaining : "+foodS,140,100);
  x = x-2;
 
  fill("navy");
  text("Long Press the up arrow key to feed the pet ",x,20);
  fill("navy");
  if(keyDown("UP_ARROW"))
  {
    fill("green");
    textSize(24);
    text("Great! Oscar is Happy",130,160);
  }
  else{
    fill("red");
    textSize(24);
    text("Feed the pet it is hungry!!",120,160);
  }
 

  fill("navy");
  textSize(24);
  text("Pet Name: Oscar",155,130);
  

 
  
  if(foodS===""){
    fill("red");
    textSize(25);
    text("Loading..........",170,250);
  }


  if(foodS===0){
    foodS = 20;
  }}









function readStock(data){ 
  foodS=data.val();
}



function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').set({
      Food:x
    }
  )
}



function showError(){
  text("Server is not working, Try again later!",200,200);
}



