+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_-_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_++_+_COMMIT LOG-_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_++_+_+_+_+_+_+_+_
+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

##1. Refactored code
  a. Changed way bomb locations are calculated to avoid collisions
  b. Removed padding cells in favor of increased boolean logic
  c. To calculate cells, I added the "neighbors" property to each tile object. 
  d. Added "Tile" class for each tile

##2. Added Easy-Dom.js functions to native prototypes
  a. Added the changeHTML (element.addHTML) & addHTML (element.addHTML)  functions to the HTMLElement  prototype
  b. Added eventListenerAll() to the NodeList prototype (NodeList.addEventListenerAll())

##3. Added function double click function
  a. When a tile is double clicked, it will highlight all neighbors remaining on the board by making them blend with the background (light gray)


##Bugs:

###
+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_