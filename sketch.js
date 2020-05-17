/*
  sketch.js: Main p5.js setup and draw
*/

let BG;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.position(0, 0);
  canvas.mouseWheel(e => { Controls.zoom(controls).worldZoom(e); renderLSys(); })
  
  lineColor = color(85, 156, 0);  // start it out all plant-y
  angleMode(DEGREES);
  stroke(lineColor);
  strokeWeight(2);

  BG = color(255);

  // move to center
  controls.view.x = width / 2;
  controls.view.y = height * (5 / 6);

  lsys = new Lsystem(); // initialize the L-system
  loadLibraryItem(plant);	// default to plant
}

// render the L system wherever it needs to be
function renderLSys() {
  stroke(lineColor);
  background(BG);
  push();
    translate(controls.view.x, controls.view.y);
    rotate(180);
    scale(controls.view.zoom);
    lsys.drawLsys();
  pop();
}