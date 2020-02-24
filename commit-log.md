# COMMIT 50:

Bugs mentioned in Commit 45 are still present. Minor bug fixes. 

## Bug Fixes

  a. Fixed error`Can't read property hasFlag of undefined`  when a number is clicked
  b. Fixed bug where cell highlighting functionality wasn't working when a number is clicked
  c. Added functionality to to Easy Dom function `$()` to accept numbers as ID and Class names
  
====================================


# COMMIT 47:

Bugs mentioned in Commit 45 are still present. Extremely minor changes and some optimizations. 

## Changes

Below are the changes:
  1. Removed unneeded `console.log()`'s that were clogging this terminal and slowing the game

## Bug Fixes

  a. Fixed bug where cell highlight functionality wasn't working after game reset
  b. Fixed bug where bomb locations weren't being appended to the `game.bombLocations` array

====================================

# COMMIT 46:

## Changes

Below are the changes:

### 1. Refactored code
  a. Changed way bomb locations are calculated to avoid collisions
  b. Removed padding cells in favor of increased boolean logic
  c. To calculate cells, I added the "neighbors" property to each tile object. 
  d. Added "Tile" class for each tile

### 2. Added Easy-Dom.js functions to native prototypes
  a. Added the` changeHTML` (`element.addHTML`) & `addHTML` (`element.addHTML`)  functions to the `HTMLElement`  prototype
  b. Added `eventListenerAll()` to the `NodeLis`t prototype ( `NodeList.addEventListenerAll()` )

### 3. Added function double click function
  a. When a tile is double clicked, it will highlight all neighbors remaining on the board by making them blend with the background (light gray)


## Bugs:

### hideBoard() is broken
  a. After running `hideBoard()`, click events are broken

### Timer function is broken
  a. Timer function does not work after second restart, as picture below


![Timer Example Gif](https://i.gyazo.com/ace5d33e51084ec173f81305eec5ec4c.gif)


## Todo:

  a. Cell "chain reaction"
  b. Improved GUI?



