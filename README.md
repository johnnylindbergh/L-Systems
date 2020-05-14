# L-Systems
L-systems for the people, by the people.

This interactive L-system visualization allows the user to explore L-systems, by defining the rules of the system. The interface allows the user to customize three components:
1. the axiom
2. the production rules
3. the "actions"

The axiom is the start state of the L-system--the initial string of symbols that is then expanded by means of production rules. The production rules determine which symbols (the lefthand side) can be replaced with which sequences of symbols (the righthand side). 

Finally, what we are calling "actions" determines which symbols correspond to which basic turtle graphics instructions. This is used to produce the visualization by reading over a string that has been generated using the production rules applied to the axiom some number of iterations.

## Syntax

The axiom should be a string of symbols.

Each production rule should be defined as `LHS : RHS` where the LHS (lefthand side) is a single symbol, and the RHS is a string of symbols with which the LHS can be replaced.

Each action follows a similar syntax of `LHS : RHS`, but the RHS must come from a limited instruction set. The following instructions are available:
- `forward`: moves the turtle a unit forward
- `turn <angle>`: rotates the turtle by `<angle>` degrees
- `push`: push position and angle onto stack
- `pop`: pop position and angle from stack

## Example L-System grammar 

#### Axiom
```
F-G-G
```
#### Production Rules
```
F : F−G+F+G−F
G : GG
```
#### Actions
```
+ : turn 120
- : turn -120
F : forward
G : forward
```
