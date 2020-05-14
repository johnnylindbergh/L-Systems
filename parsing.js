/*
  parsing.js: Functions for parsing the grammar inputted by the user
*/

// parses the text from the production rules
function parseProductionRules(rawText, cb) {
  /*
    Constructs hashtable of the following form:
    {
      “F” → [“F-G+F+G-F”, “FG”]
      “G” → [“EGG”]
      ...
    }
  */

  // first, just extract what's on the left and right hand sides of each rule
  parseRawText(rawText, (err, extractedRules) => {
    if (err) return cb(err);

    const rulesTable = {};
    let lhs, rhs;

    for (let i = 0; i < extractedRules.length; i++) {
      lhs = extractedRules[i].LHS;
      rhs = extractedRules[i].RHS;

      // map LHS to all possible RHS 
      if (!rulesTable[lhs]) {
        rulesTable[lhs] = [rhs];
      } else {
        rulesTable[lhs].push(rhs);
      }
    }

    cb(err, rulesTable);
  });
}

// parses the text from the actions definitions
function parseActions(rawText, cb) {
  /*
    Constructs hashtable of the following form:
    {
      “+” → () => { rotate(120); }
      “-” → () => { rotate(-120); }
      “F” → () => { line(0, …); translate(...); }
      “[“ → () => { push(); }
    }
  */
  
  parseRawText(rawText, (err, extractedRules) => {
    if (err) return cb(err);

    const actionsTable = {};
    let lhs, rhs;

    const turn = /turn(-?\d+)/;   // regular expr to extract the angle param from turn action

    for (let i = 0; i < extractedRules.length; i++) {
      lhs = extractedRules[i].LHS;
      rhs = extractedRules[i].RHS;

      if (rhs == "forward") {
        actionsTable[lhs] = () => {
          // this uses a global step length
          line(0, STEP_LENGTH, 0, 0);
          translate(0, STEP_LENGTH);
        }

      } else if (rhs == "push") {
        actionsTable[lhs] = () => {
          push();
        }

      } else if (rhs == "pop") {
        actionsTable[lhs] = () => {
          pop();
        }

      } else if (turn.test(rhs)) {
        let match = rhs.match(turn);

        if (match.length < 2) {
          return cb(new Error(`Invalid use of turn syntax at "${lhs} : ${rhs}"`));
        }

        const angle = parseInt(match[1], 10);

        // ensure angle parsed successfully
        if (isNaN(angle)) {
          return cb(new Error(`Invalid argument to turn at "${lhs} : ${rhs}"`));
        }

        actionsTable[lhs] = () => {
          rotate(angle);
        }

      } else {
        return cb(new Error(`Invalid righthand side at: "${lhs} : ${rhs}"`));
      }
    }

    cb(null, actionsTable);
  });
}

function parseRawText(rawText, cb) {
  if (rawText == "") return cb(new Error("There were no production rules entered!"));

  const split = rawText.split("\n");
  const ret = [];

  for (let i = 0; i < split.length; i++) {
    let line = split[i];
    let splitByColon = line.replace(/\s/g, '').split(":");

    if (line == '') continue; // ignore blank lines

    if (splitByColon.length != 2) {
      return cb(new Error(`The line "${line}" had an incorrect amount of colons`));
    }

    let lhs = splitByColon[0], rhs = splitByColon[1];

    if (!lhs || !rhs) {
      return cb(new Error(`The line "${line}" errored: Both the left-hand side and right-hand side must be non-empty`));
    }

    if (lhs.length != 1) {
      return cb(new Error(`The line "${line} errored: The left-hand side must be only one character`));
    }

    ret.push({
      LHS: splitByColon[0],
      RHS: splitByColon[1]
    });
  }

  cb(null, ret);
}




/* -------------------------------------------- */

// const testRules = 
// `

// F : F-G+F+G-F

// G : GG
// V : F+F
// F : FG

// V : G-F+GG
// J:_FF_
// t : wowza


// `;

// const testActions =
// `+ : turn 120
// - : turn -18

// h:turn-190
// Z: turn 1

// F : forward

// G : forward
// ( : push
// ) : pop`;

// parseProductionRules(testRules, (err, data) => {
//   console.log(err);
//   console.log(data);
// });

// parseActions(testActions, (err, data) => {
//   console.log(err);
//   console.log(data);
// });