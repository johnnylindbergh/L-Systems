/*
  sketch.js: Main p5.js setup and draw
*/

let lsys;
let SCALE = 1;
let STEP_LENGTH = 10;
let LINE_COLOR;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.position(0, 0);
  canvas.mouseWheel(e => Controls.zoom(controls).worldZoom(e))
  lsys = new Lsystem();

  LINE_COLOR = color(0, 0, 255);

  angleMode(DEGREES);
  stroke(LINE_COLOR);
  strokeWeight(1);
  frameRate(5);
  lsys.startX = windowWidth / 2;
  lsys.startY = windowHeight / 2;
}

function draw(){
  stroke(LINE_COLOR);

  // if click/drag mode, move origin to mouse position
  if (lsys.shiftMode) {
    lsys.startX = mouseX;
    lsys.startY = mouseY;
  }
  push();
  translate(controls.view.x, controls.view.y);
  scale(controls.view.zoom);
  lsys.drawLsys();
  pop();
}