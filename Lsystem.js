/*
  Lsystem.js: Class for working with the L-system itself
*/

class Lsystem {

  constructor() {
    this.axiom;
    this.productionRules;
    this.actions;

    this.iteration = 10;
    this.shiftMode = false;
    this.Lstring = '';


    // this.axiom = '[FX]';
    // this.Lstring = '';
    // this.angle = 90;
    // this.pushAndPop = false;
    // this.randomRotation = false;
    // this.maxRotation = 25;
    // this.iteration = 9;
    // this.stepLength = 10;
    // this.Xrule = '[X+YF+]';
    // this.Yrule = '[-FX-Y]';
    // this.startX= 500;
    // this.startY= 500;
    // this.shiftMode = false;
  }

  calculateString(){
    var originalAxiom = this.axiom
    var newAxiom = '', sym, randRHS;

    // for each iteration
    for (var i = 0; i < this.iteration; i++){
      newAxiom = ''

      // expand each symbol based on its production rules
      for (var c = 0; c < originalAxiom.length; c++){
        sym = originalAxiom[c];
        let possibleRHS = this.productionRules[sym];

        if (possibleRHS) {
          // select a random string from the possible righthand sides 
          if (possibleRHS.length == 1) {
            randRHS = possibleRHS[0];
          } else {
            randRHS = possibleRHS[Math.floor(Math.random() * possibleRHS.length)];
          }

          // add the random RHS to the new string
          newAxiom += randRHS;

        } else {
          // just add the symbol
          newAxiom += sym;
        }
      }
      originalAxiom = newAxiom;

    }
    this.Lstring = originalAxiom;
  }

  drawLsys() {
    background(255);
    push();
    translate(this.startX, this.startY);
    scale(SCALE);

    for (var c = 0; c < this.Lstring.length; c++){
      var character = this.Lstring[c];

      let action = this.actions[character];

      // if there are actions associated with this symbol
      if (action) {
        // call each of the actions, in order, associated with this symbol
        for (let a = 0; a < action.length; a++) {
          action[a]();
        }
      }

      // if(character == 'F'){
      //   stroke(0);
      //   line(0, 15,0,0);
      //   translate(0, 15);

      // }
      // if (this.pushAndPop){
      //   if(character == '['){
      //     push();  
      //   }
      //   if(character == ']'){
      //     pop();  
      //   }
      // }
      // if(character == '+'){
      //   if (this.randomRotation){
      //     rotate(random(this.maxRotation));
      //   } else {
      //     rotate(this.angle);
      //   }
      // }
      // if(character == '-'){
      //   if (this.randomRotation){
      //     rotate(-random(this.maxRotation));
      //   } else {
      //     rotate(-this.angle);
      //   }   
      // }
    }

    pop();
  }

}