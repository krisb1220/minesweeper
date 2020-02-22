# Minesweeper By Energy Marketing Company
This is a full Javascript Minesweeper full with runnable tests, game logic, and GUI (coming soon) 

## NOT COMPLETED YET. IF YOU'D LIKE TO HELP US WORK ON THIS PROJECT, PLEASE EMAIL UPGRADE@ENERGYMARKETING.CO

⚡ BY KRIS @ ENERGY MARKETING COMPANY ⚡ ENERGYMARKETING.CO ⚡ UPGRADE@ENERGYMARKETING.CO ⚡



#COMMIT 45:

##Changes

Below are the changes:

###1. Refactored code
  a. Changed way bomb locations are calculated to avoid collisions
  b. Removed padding cells in favor of increased boolean logic
  c. To calculate cells, I added the "neighbors" property to each tile object. 
  d. Added "Tile" class for each tile

###2. Added Easy-Dom.js functions to native prototypes
  a. Added the changeHTML (element.addHTML) & addHTML (element.addHTML)  functions to the HTMLElement  prototype
  b. Added eventListenerAll() to the NodeList prototype (NodeList.addEventListenerAll())

###3. Added function double click function
  a. When a tile is double clicked, it will highlight all neighbors remaining on the board by making them blend with the background (light gray)


##Bugs:

### hideBoard() is broken
  a. After running hideBoard(), click events are broken

### Timer function is broken
  a. Timer function does not work after second restart, as picture below


![Timer Example Gif](https://i.gyazo.com/ace5d33e51084ec173f81305eec5ec4c.gif)


##Todo:
  a. Cell "chain reaction"
  b. Improved GUI?



