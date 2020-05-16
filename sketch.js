/*
  sketch.js: Main p5.js setup and draw
*/

let lsys;
let SCALE = 1;
let STEP_LENGTH = 10;
let LINE_COLOR;

const controls = {
  view: {x: 0, y: 0, zoom: 1},
  viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

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

window.mousePressed = e => Controls.move(controls).mousePressed(e)
window.mouseDragged = e => Controls.move(controls).mouseDragged(e);
window.mouseReleased = e => Controls.move(controls).mouseReleased(e)

function mouseClicked() {
  if (dist(mouseX,mouseY, lsys.startX, lsys.startY) < 200) {
    lsys.shiftMode = !lsys.shiftMode;
  }
}

class Controls {
  static move(controls) {
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    function mouseDragged(e) {
      const {prevX, prevY, isDragging} = controls.viewPos;
      if(!isDragging) return;

      const pos = {x: e.clientX, y: e.clientY};
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if(prevX || prevY) {
        controls.view.x += dx;
        controls.view.y += dy;
        controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y
      }
    }

    function mouseReleased(e) {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }
 
    return {
      mousePressed, 
      mouseDragged, 
      mouseReleased
    }
  }

  static zoom(controls) {
    function worldZoom(e) {
      const {x, y, deltaY} = e;
      const direction = deltaY > 0 ? -1 : 1;
      const factor = 0.05;
      const zoom = 1 * direction * factor;


      
      const wx = (x-controls.view.x)/(width*controls.view.zoom);
      const wy = (y-controls.view.y)/(height*controls.view.zoom);
      
      controls.view.x -= wx*width*zoom;
      controls.view.y -= wy*height*zoom;
      controls.view.zoom += zoom;
    }
    return {worldZoom}
  }
}