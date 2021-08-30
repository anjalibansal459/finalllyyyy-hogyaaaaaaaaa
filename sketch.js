var ground,jet,bullet,fire,fireGroup,bulletGroup,enemy,enemyGroup,leftArrow,rightArrow;
var gameState="play";
var score=0;
var jetImage,fireImage,bgImg,bg,leftImg,rightImg,ufoImage,bulletSound,coinCollectSound;
var explodeSound,mainSound
function preload(){
jetImage=loadImage("fighterjet.png");
fireImage=loadImage("fireBall.png");
bgImg=loadImage("space.png");
leftImg=loadImage("leftArrow.png");
rightImg=loadImage("rightArrow.png");
ufoImage=loadImage("ufo.png");
bulletSound=loadSound("bullet.wav");
coinCollectSound=loadSound("coinCollect.wav");
explodeSound=loadSound("explode.wav")
mainSound=loadSound("main.mp3")
}
function setup(){
createCanvas(1500,700);
enemyGroup=createGroup();
fireGroup=createGroup();
bulletGroup=createGroup();
bg=createSprite(width/2,height/2,20,10);
bg.addImage(bgImg);
bg.scale=3;
bg.velocityY=8;
jet=createSprite(width/2,650,50,50);
jet.scale=0.25;
jet.addImage(jetImage);
leftArrow=createSprite(300,600,30,30);
leftArrow.addImage(leftImg);
leftArrow.scale=0.2;
rightArrow=createSprite(1300,600,30,30);
rightArrow.addImage(rightImg);
rightArrow.scale=0.2;
}
function draw(){
    background(0);
    if(bg.y>690)
      {
      bg.y=height/2;
      }
      if(frameCount%50===0){
          mainSound.play()
      }
    if(keyDown(LEFT_ARROW)){
        jet.x=jet.x-8;
    }
    if(keyDown(RIGHT_ARROW)){
        jet.x=jet.x+8;
    }
    if(keyDown(UP_ARROW)){
        spawnBullets();
        bulletSound.play()
    }
    if(frameCount%40==0){
        spawnFire();
    }
    if(fireGroup.isTouching(jet)){
        explodeSound.play()
        gameState="end";
    }
    if(bulletGroup.isTouching(enemyGroup)){
       
        enemyGroup.destroyEach();
        bulletGroup.destroyEach();
        text("yay! you got it!",bullet.x,bullet.y);
        coinCollectSound.play()
        score=score+8;
    }
    if(enemyGroup.isTouching(jet)){
        explodeSound.play()
        gameState="end";
    }
    if(score>50){
        gameState="win";
        coinCollectSound.play()
    }
    
    spawnEnemy();
    drawSprites();
     
    textSize(20);
    fill("skyblue");
    text("SCORE:"+score,1300,100);
   text("Move Right And Left to escape from fireballs",100,100);
    text("Press Up Arrow Key to shoot",100,150);
    text("You can kill the UFO only by bullet",100,200);
    text("EScape from UFO's , or you will DIE!!",100,250);
    if(gameState==="end"){
        enemyGroup.destroyEach();
        bulletGroup.destroyEach();
        jet.visible=false;
        fireGroup.destroyEach();
        leftArrow.visible=false;
        rightArrow.visible=false;
        textSize(50);
        fill("red");
        text("YOU DIED!!",width/2,height/2);
    }
    if(gameState==="win"){
        enemyGroup.destroyEach();
        bulletGroup.destroyEach();
        jet.visible=false;
        fireGroup.destroyEach();
        leftArrow.visible=false;
        rightArrow.visible=false;
        textSize(50);
        fill("green");
        text("YOU WON!!",width/2,height/2);
    }
}
function spawnBullets(){
  bullet=createSprite(jet.x,jet.y-13,10,20);
  bullet.velocityY=-5;
  bullet.shapeColor="green";
  bulletGroup.add(bullet);
}
function spawnFire(){
fire=createSprite(random(100,1400),10,50,50);
fire.velocityY=5;
fire.addImage(fireImage);
fire.scale=0.15;
fireGroup.add(fire);

}
function spawnEnemy(){
   if(frameCount%150==0){
       enemy=createSprite(random(100,1400),10,50,50);
       enemy.velocityY=5;
       enemy.shapeColor="red";
       enemy.addImage(ufoImage);
       enemy.scale=0.6;
       enemyGroup.add(enemy);
   }
}