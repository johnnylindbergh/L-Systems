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
    let righthandSides, actionsList;

    const turn = /turn(-?\d+)/;   // regular expr to extract the angle param from turn action

    for (let i = 0; i < extractedRules.length; i++) {
      lhs = extractedRules[i].LHS;
      rhs = extractedRules[i].RHS;
      righthandSides = rhs.split(',');  // split possibly multiple actions by comma
      actionsList = [];

      // for each of the actions associated with this symbol
      for (let j = 0; j < righthandSides.length; j++) {
        let action = righthandSides[j];

        if (action == "forward") {
          actionsList.push(() => {
            // always step forward by 10 --scale() will handle the rest
            line(0, 10, 0, 0);
            translate(0, 10);
          });
  
        } else if (action == "push") {
          actionsList.push(() => {
            push();
          });
  
        } else if (action == "pop") {
          actionsList.push(() => {
            pop();
          });
  
        } else if (turn.test(action)) {
          let match = action.match(turn);
  
          if (match.length < 2) {
            return cb(new Error(`Invalid use of turn syntax at "${lhs} : ${rhs}"`));
          }
  
          const angle = parseInt(match[1], 10);
  
          // ensure angle parsed successfully
          if (isNaN(angle)) {
            return cb(new Error(`Invalid argument to turn at "${lhs} : ${rhs}"`));
          }
  
          actionsList.push(() => {
            rotate(angle);
          });
  
        } else {
          return cb(new Error(`Invalid righthand side at: "${lhs} : ${rhs}". Must use a valid graphics command.`));
        }
      }

      // add all those funcs to actions for this symbol
      actionsTable[lhs] = actionsList;
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
      return cb(new Error(`The line "${line}" must have a single colon separating the lefthand side from the righthand side`));
    }

    let lhs = splitByColon[0], rhs = splitByColon[1];

    if (!lhs || !rhs) {
      return cb(new Error(`The line "${line}" errored: Both the left-hand side and right-hand side must be non-empty`));
    }

    if (lhs.length != 1) {
      return cb(new Error(`The line "${line}" errored: The left-hand side must be only one character`));
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
// ) : pop

// [ : push, turn -45
// `;

// parseProductionRules(testRules, (err, data) => {
//   console.log(err);
//   console.log(data);
// });

// parseActions(testActions, (err, data) => {
//   console.log(err);
//   console.log(data);

//   console.log(data['['].toString());
// });