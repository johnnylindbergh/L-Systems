/*
  sketch.js: Main p5.js setup and draw
*/

let lsys;
let SCALE = 1;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.position(0, 0);
  lsys = new Lsystem();

  angleMode(DEGREES);
  stroke(0,0,255);
  strokeWeight(1);
  frameRate(5);
  lsys.startX = windowWidth / 2;
  lsys.startY = windowHeight / 2;
}

function draw(){
  // if click/drag mode, move origin to mouse position
  if (lsys.shiftMode) {
    lsys.startX = mouseX;
    lsys.startY = mouseY;
  }

  lsys.drawLsys();

  // if (lsys.shiftMode ){
  //   if (lsys.Lstring){
  //     lsys.startX =  mouseX;
  //     lsys.startY =  mouseY;
  //     lsys.drawLsys();
  //   }
  // } else {
  //   if (!lsys.randomRotation){
  //     lsys.drawLsys();
  //   }
  // }
}

function mouseClicked() {
  if (dist(mouseX,mouseY, lsys.startX, lsys.startY) < 200) {
    lsys.shiftMode = !lsys.shiftMode;
  }
}