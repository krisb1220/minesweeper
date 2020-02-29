/************************************************************************************
*                                                                                                                                                                                *
*                                                               HELPER     FUNCTIONS                                                                            *
*                                                                                                                                                                                *
***********************************************************************************/


/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists
 * @private
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function} callback Callback function for each iteration
 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
 */

function doNothing(){
  return;
}

function randomRange(min,max){
 return Math.ceil(Math.random()*(max-min+1)+min );
}


function createTileObject(cellNumber) {
 game.gameObject[cellNumber] = {
   hasBomb:  false,
   hasFlag: false,
   isMined: false,
   bombsInCell: 0,
   integerLocation: cellNumber,
   neighbors: []
 }
}

function calcTiles(x,y) {
 return x*y + ((x*2)+6);
}

function returnTileHTML(tileObject) {
 let number = tileObject.bombsInCell;
 let id = tileObject.integerLocation;
 return `<div class="tile " id="${id}" ></div>`;
}

function returnTileHTMLWithNumber(tileObject) {
 let number = tileObject.bombsInCell;
 // console.log(tileObject);
 return number;
}




function showBoard(){
 
//  clearBoardHtml();
 forEach(game.gameObject, function(tile){
   // console.log(tile);
   if(tile.integerLocation >= (game.x) && tile.integerLocation <= game.numberTiles)  {
     tile.htmlElement = returnTileHTMLWithNumber(tile);
     
     $("#minesweeper").innerHTML += tile.htmlElement;
   } 
 });
}

function hideBoard() {
 appendTilesToPage();
}

function revealNeighbors(startingPoint) {
  bombsInNeighbors = 0;
  start = startingPoint.neighbors; 

  start.forEach(function(neighbor){
    neighbor.hasBomb ? bombsInNeighbors++ : doNothing();
  })

  if(bombsInNeighbors == 0) {
    start.forEach(function(neighbor){
      !neighbor.isOpen ? mineTile(neighbor) : doNothing();
    })
  }

}

function placeFlag(tile) {

 // tile.hasFlag ? tile.hasFlag = true : tile.hasFlag = false;
 let location = tile.integerLocation;

 if (!tile.isMined) {
   if(tile.hasFlag) {
     game.flagsPlaced++;
     document.getElementById(tile.integerLocation).innerHTML = '';
     document.getElementById(tile.integerLocation).classList.remove("flagged")
     $(".flags-inner").innerHTML =  String.fromCodePoint(0x1F4A3) + game.flagsPlaced
     tile.hasFlag = false;
   } 

   else if(!tile.hasFlag && game.flagsPlaced != 0) {
     game.flagsPlaced--;
     let flagEmoji = String.fromCodePoint(0x1F4A3);
     $(".flags-inner").innerHTML =  String.fromCodePoint(0x1F4A3) + game.flagsPlaced
     document.getElementById(tile.integerLocation).innerHTML = `<p class='flag'>${flagEmoji}</p>`;
     document.getElementById(tile.integerLocation).classList.add("flagged")
     tile.hasFlag = true;
   } 
 }
 

}

function mineTile(tile, isFromLoss) {

 if(tile.hasFlag || tile.isMined) {
   return;
 }

 if(!tile.isMined && !tile.hasBomb) {
   game.minedTiles++
   tile.isMined = true;
   document.getElementById(tile.integerLocation).innerHTML = `<p class="number ${tile.integerLocation}">` + tile.bombsInCell + "</p>";
   document.getElementById(tile.integerLocation).classList.add("tile-mined");
   document.getElementById(tile.integerLocation).style.color = game.colors[document.getElementById(tile.integerLocation).innerText];
   revealNeighbors(tile);
 } 

 else if(tile.hasBomb && game.gameStarted) {
   tile.isMined = true;
   document.getElementById(tile.integerLocation).innerHTML = `<p class='number' class={tile.integerLocation}>` + emojify("bomb") + "</p>";
   document.getElementById(tile.integerLocation).classList.add("tile-mined");
   game.gameStarted = false;
   lose();
 }

 else if(!isFromLoss && game.minedTiles == game.tilesToWin) {
   win();
 }

 // cell.isMined = true;
}

function showBoard(){
 forEach(game.gameObject, function(tile){
   let meetsConditions =  !tile.hasBomb
    meetsConditions ? mineTile(tile, true) : doNothing();
 })
}

function win() {
 game.gamesFinished++
 game.gamesWon++
 game.gameStarted = false;
 game.gameTime.stop();
//  console.log("You Win!");
}

function lose() {
 // console.log("YOU LOST!")
 game.gamesFinished++
 game.gamesLost++
 game.gameStarted = false;
 game.gameTime.stop();	
 showBoard();
}

function addRowsToPage(){
 for(row=1 ; row < game.y+1 ; row++) {
   document.getElementById("minesweeper").innerHTML += ' <div class="row" id="row-' + row + '"></div>'
 }
}



/*---------------TEST FUNCTION-------------- */
function testGame(x,y,bombs,iterations) {
 console.time("all tests finished in....");
 console.group("tests");
 let timesFailed = 0;

 for(a=0; a<iterations;a++) {
   let tilesWithBombs= 0;
   let passed = true;
   let failedList = [];

   console.group("test " + a)
   console.time("test " + a + " finished in");

   minesweeper(x,y,bombs);
   
   /*CONDITIONS */

   forEach(game.gameObject, function(tile){
     if(tile.hasBomb != false){
       tilesWithBombs++
     }
   });

   if(tilesWithBombs != game.numberBombs) {
     timesFailed++
     passed = false;
     failedList.push( "NOT ENOUGH BOMBS")
   }  

 
 /* END CONDITIONS */

   /*RUN AFTER ALL TESTS HAVE BEEN RUN */
   if(passed) {
     console.log('%c Test ' + a + ': SUCCESS', "background:#0a2");
     failedList.push("none")
   } else {
     console.log("Times Failed: " + timesFailed)
     console.error('Test FAILED!!!!' );
   }

   console.table( {
     "game object": game,
     "failed": failedList,
     "number bombs": tilesWithBombs
   });

   console.timeEnd("test " + a + " finished in")
   console.groupEnd("test " + a)
 }
 console.log("Times Failed: " + timesFailed)	
 console.timeEnd("all tests finished in....");
 console.groupEnd("tests")
}