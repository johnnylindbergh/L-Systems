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
  canvas.mouseWheel(e => { Controls.zoom(controls).worldZoom(e); renderLSys(); })
  lsys = new Lsystem();

  LINE_COLOR = color(0, 0, 0);

  angleMode(DEGREES);
  stroke(LINE_COLOR);
  strokeWeight(1);

  lsys.startX = windowWidth / 2;
  lsys.startY = windowHeight / 2;
}

// render the L system wherever it needs to be
function renderLSys() {
  stroke(LINE_COLOR);
  background(255);
  push();
  translate(controls.view.x, controls.view.y);
  rotate(180);
  scale(controls.view.zoom);
  lsys.drawLsys();
  pop();
}