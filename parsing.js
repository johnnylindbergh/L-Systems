
// parses the text from the production rules
function parseProductionRules(rawText) {
  /*
    Constructs hashtable of the following form:
    {
      “F” → [“F-G+F+G-F”, “FG”]
      “G” → [“EGG”]
    }
  */

  const split = rawText.split("\n");




}

// parses the text from the actions definitions
function parseActions(rawText) {
  /*
    Constructs hashtable of the following form:
    {
      “+” → () => { rotate(120); }
      “-” → () => { rotate(-120); }
      “F” → () => { line(0, …); translate(...); }
      “[“ → () => { push(); }
    }
  */
}




/* -------------------------------------------- */

const testRules = 
  `F : F-G+F+G-F
  G : GG
  test : wowza`;

console.log(parseProductionRules(testRules));


const testActions =
  `+ : turn 120
  - : turn -18
  F : forward
  G : forward
  ( : push
  ) : pop`;

// console.log(parseActions(testActions));