
// parses the text from the production rules
function parseProductionRules(rawText) {
  /*
    Constructs hashtable of the following form:
    {
      “F” → [“F-G+F+G-F”, “FG”]
      “G” → [“EGG”]
    }
  */
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