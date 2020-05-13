
STEP_LENGTH = 10;

class Lsystem {

  constructor() {
    this.axiom = '[FX]';
    this.Lstring = '';
    this.angle = 90;
    this.pushAndPop = false;
    this.randomRotation = false;
    this.maxRotation = 25;
    this.iteration = 9;
    this.stepLength = 10;
    this.Xrule = '[X+YF+]';
    this.Yrule = '[-FX-Y]';
    this.startX= 500;
    this.startY= 500;
    this.shiftMode = false;
  }

  calculateString(){
    var originalAxiom = this.axiom
    var newAxiom = '';
    for (var i = 0; i < this.iteration; i++){
      newAxiom = ''
      for (var c = 0; c < originalAxiom.length; c++){

        if (originalAxiom[c] == 'X'){
          newAxiom +=lsys.Xrule;
        }
        
        if (originalAxiom[c] == 'Y'){
          newAxiom +=lsys.Yrule; 
        } 

        if (originalAxiom[c] != 'X' && originalAxiom[c] != 'Y'){
          newAxiom += originalAxiom[c];
        }
      }
      originalAxiom = newAxiom;

    }
    this.Lstring = originalAxiom;
    this.drawLsys();
  }

  drawLsys() {
    background(255);
    push();
    translate(this.startX, this.startY);
    //console.log(axiom);
    for (var c = 0; c < this.Lstring.length; c++){
      var character = this.Lstring[c];
      //console.log(character)
      if(character == 'F'){
        stroke(0);
        line(0,this.stepLength,0,0);
        translate(0,this.stepLength);

      }
      if (this.pushAndPop){
        if(character == '['){
          push();  
        }
        if(character == ']'){
          pop();  
        }
      }
      if(character == '+'){
        if (this.randomRotation){
          rotate(random(this.maxRotation));
        } else {
          rotate(this.angle);
        }
      }
      if(character == '-'){
        if (this.randomRotation){
          rotate(-random(this.maxRotation));
        } else {
          rotate(-this.angle);
        }   
      }
    }

    pop();
  }

}

var lsys;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.position(0, 0);
  lsys = new Lsystem();

  angleMode(DEGREES);
  stroke(0,0,255);
  strokeWeight(1);
  frameRate(5);
  lsys.startX = windowWidth/2;
  lsys.startY = windowHeight/2;
}

function draw(){
  if (lsys.shiftMode ){
    if (lsys.Lstring){
      lsys.startX =  mouseX;
      lsys.startY =  mouseY;
      lsys.drawLsys();
    }
  } else {
    if (!lsys.randomRotation){
      lsys.drawLsys();
    }
  }

}

function mouseClicked() {
  if (dist(mouseX,mouseY, lsys.startX, lsys.startY) < 200) {
    lsys.shiftMode = !lsys.shiftMode;
  }
}