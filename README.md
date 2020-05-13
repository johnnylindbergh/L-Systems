# L-Systems
L-systems for the people, by the people.

##Example L-System grammar 

###Axiom
```
F-G-G
```
------------------------------------------------
###Production Rules
````
F : F−G+F+G−F
G : GG
```
------------------------------------------------
###Actions
```
+ : turn 120
- : turn -120
F : forward
G : forward
```
