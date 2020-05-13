
// parses the text from the production rules
function parseProductionRules(rawText, cb) {
  /*
    Constructs hashtable of the following form:
    {
      “F” → [“F-G+F+G-F”, “FG”]
      “G” → [“EGG”]
    }
  */

  parseRawText(rawText, (err, extractedRules) => {
    cb(err, extractedRules);
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

    if (!splitByColon[0] || !splitByColon[1]) {
      return cb(new Error(`The line "${line}" errored: Both the left-hand side and right-hand side must be non-empty`));
    }

    ret.push({
      LHS: splitByColon[0],
      RHS: splitByColon[1]
    });
  }

  cb(null, ret);
}




/* -------------------------------------------- */

const testRules = 
`F : F-G+F+G-F

G : GG


test : wowza`;

parseProductionRules(testRules, (err, data) => {
  console.log(err);
  console.log(data);
});


const testActions =
  `+ : turn 120
  - : turn -18
  F : forward
  G : forward
  ( : push
  ) : pop`;

// console.log(parseActions(testActions));