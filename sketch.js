var boy
var boyimage
var ground
var groundimage
var Fireimage
var obsticalimage
var Background
var invisibleground
var platformgroup
var invisibleplatformgroup
var gamestate="play"
var gameover
var gameoverimage
var restart
var restartimage

function preload() {
  boyimage = loadImage("boy.png")
  Fireimage = loadImage("fire.png")
  obsticalimage = loadImage("obstacle.jpg")
  Backgroundimage = loadImage("Background.jpg")
  gameoverimage = loadImage("gameover.png")
  restartimage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  Background = createSprite(width / 2, height - 100, width, height + 100)
  Background.addImage(Backgroundimage)
  Background.scale = 5
  Background.x = Background.width / 2
  boy = createSprite(50, displayHeight - 800, 50, 50)
  boy.addImage(boyimage)
  boy.scale = 0.5
  boy.debug = true
  boy.setCollider("rectangle", 0, 0, 200, 340)
  ground = createSprite(displayWidth / 2, displayHeight - 100, displayWidth + 200, 20)
  //////////ground.addImage(Fireimage)
  ground.scale = 2
  ground.debug=true
  ground.setCollider("rectangle",0,0,width,20)
  invisibleground = createSprite(100, displayHeight - 500, 100, 5)
  invisibleground.velocityX = 0.1
  platformgroup = new Group()
  invisibleplatformgroup = new Group()
  gameover = createSprite(width/2,height/2-150,50,50)
  restart = createSprite(width/2,height/2+100,50,50)
  gameover.addImage(gameoverimage)
  restart.addImage(restartimage)
  gameover.scale=2
  restart.scale=0.2
}

function draw() {
  background(255);
  if(gamestate==="play")  {
    Background.velocityX = -10
    if (Background.x < 0) {
      Background.x = Background.width / 2
    }
    if (keyDown("space")) {
      boy.velocityY = -15
    }
    createplatform()
    if (invisibleplatformgroup.isTouching(boy)) {
      boy.velocityY = 0;
    }
     if(boy.isTouching(ground)) {
       console.log("end")
       gamestate="end"
     }
    
    }
    else if(gamestate==="end"){
    
  }
  
  // for (var i = 0; i < invisibleplatformgroup.length; i++) {
  //   if (keyDown("space") && invisibleplatformgroup.get(i).collide(boy)) {
  //     boy.velocityY = -15
  //     console.log("10")
  //   }
  // }
  

  boy.velocityY = boy.velocityY + 0.5


  boy.collide(invisibleground)

  // for (var i = 0; i < invisibleplatformgroup.length; i++) {
  //   if (invisibleplatformgroup.get(i).collide(boy)) {
  //     boy.velocityX = 0
  //     boy.velocityY = 0
  //   }
  // }

  drawSprites();
}
function createplatform() {
  if (frameCount % 100 === 0) {
    var platform = createSprite(width, random(height - 200, height - 500), random(50, 200), 50)
    var invisibleplatform = createSprite(platform.x, platform.y - 35, platform.width, 5)
    platform.velocityX = -4
    platform.addImage(obsticalimage)
    invisibleplatform.velocityX = platform.velocityX
    platform.scale = 0.1
    platformgroup.add(platform);
    invisibleplatformgroup.add(invisibleplatform);
  }
}