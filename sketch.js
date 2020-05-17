/*
  sketch.js: Main p5.js setup and draw
*/

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.position(0, 0);
  canvas.mouseWheel(e => { Controls.zoom(controls).worldZoom(e); renderLSys(); })
  lineColor = color(0, 0, 0);
  angleMode(DEGREES);
  stroke(lineColor);
  strokeWeight(2);

  // move to center
  controls.view.x = width / 2;
  controls.view.y = height / 2;

  lsys = new Lsystem(); // initialize the L-system
  loadLibraryItem(dragonCurve);	// default to dragon curve
}

// render the L system wherever it needs to be
function renderLSys() {
  stroke(lineColor);
  background(255);
  push();
    translate(controls.view.x, controls.view.y);
    rotate(180);
    scale(controls.view.zoom);
    lsys.drawLsys();
  pop();
}