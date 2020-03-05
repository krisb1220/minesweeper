let game = {}; //init game


class Tile{
  
  constructor(cellNumber) {
  this.hasBomb = false;
  this.hasFlag = false;
  this.isMined = false;
  this.bombsInCell = 0;
  this.integerLocation = cellNumber;
  this.neighbors = [];
  }

}

function clearBoardHtml() {
  document.querySelector("#minesweeper").innerHTML = '';
}

function populateField(x,y, numberBombs) {
   
  game.x = x;
  game.y = y;
  game.numberTiles = x*y;
  game.numberBombs = numberBombs;
  game.flagsPlaced = numberBombs;
  game.tilesToWin = game.numberTiles - game.numberBombs;

  // game = new Game(x,y,numberBombs);

  for(cells=1; cells<game.numberTiles+1; cells++ ) {
    game.gameObject[cells] = new Tile(cells);
  }

}

function setBombLocations(tiles, numberBombs) {

  let bombLocations = [];
  let bombsPushed = 0;
  
  forEach(game.gameObject, (tile)=>{
    let isBomb = Math.random()*50 > 40;
    if(isBomb && bombsPushed != numberBombs && !tile.hasBomb){
      bombsPushed = addBombsToArray(bombsPushed, bombLocations, tile);
    }

  });

  game.bombLocations = bombLocations;
  
}

function addBombsToArray(bombsPushed, bombLocations, tile) {
  bombsPushed++;
  bombLocations.push(tile.integerLocation);
  tile.hasBomb = true;
  return bombsPushed;
}

function getNeighbors() {
  forEach(game.gameObject, (value)=>{
  
    let lo = value.integerLocation;

    if(lo != 1 && lo >= game.x && lo != game.x) {
      value.neighbors.push(game.gameObject[lo - game.x]) //top
    }

    if(lo != game.numberTiles && (lo - game.numberTiles) <= -game.x ){
      value.neighbors.push(game.gameObject[lo + game.x]) //bottom
    }

      //top right
      if(lo % game.x != 0  && lo != 1 && lo >= game.x && lo != game.x) {
        value.neighbors.push(game.gameObject[(lo - game.x)+1]);
      } 

      //top left
      if(lo % game.x != 1 && lo != 1 && lo >= game.x && lo != game.x) {        
        value.neighbors.push(game.gameObject[(lo - game.x)-1])
      }       

      //bottom right
      if(lo % game.x != 0 && (lo - game.numberTiles) <= -game.x && lo != game.x) {
       value.neighbors.push(game.gameObject[(lo + game.x)+1]);
      } 

      //bottom left
      if(lo % game.x != 1  && lo != 1 && (lo - game.numberTiles) <= -game.x  ) {
        value.neighbors.push(game.gameObject[(lo + game.x)-1])
      }       

      
      //right
      if(lo % game.x != 0 && lo != game.numberTiles && lo != game.x) {
        value.neighbors.push(game.gameObject[lo + 1]);
      } 

      //left
     if(lo % game.x != 1) {
      value.neighbors.push(game.gameObject[lo - 1]) 
      }      


  });

}

function countBombsInNeighbors(value){
  let bombsInCell = 0;
  
  forEach(value.neighbors, (neighbor)=>{
    if(neighbor.hasBomb) {
      bombsInCell++ 
    }
  });

  return bombsInCell;
}

function getBombsInCells(){
  forEach(game.gameObject, (tile)=>{
    // console.log(`Counting bombs in Cell ${tile.integerLocation}....`)
    bombsInCell = countBombsInNeighbors(tile);
    bombsInCell != 0 ? tile.bombsInCell = bombsInCell : tile.bombsInCell = ''; 
  });
}

function buildGrid(){
    clearBoardHtml();
    addRowsToPage();
    addTilesToPage();
}

function addTilesToPage() {
  let currentRow = 1;
  forEach(game.gameObject, function (tile) {

    tile.htmlElement = returnTileHTML(tile);
    if (tile.integerLocation % game.x == 1 && tile.integerLocation != 1) {
      currentRow++;
      document.querySelector("#row-" + currentRow).innerHTML += tile.htmlElement;
    }
    else {
      document.querySelector("#row-" + currentRow).innerHTML += tile.htmlElement;
    }
  });
}

function startGame(){
  game.gameStarted = true;
  game.gameTime.start();
  changeHTML(".restart-inner", "Restart");
}

function handleFirstClick(clicked){
  startGame();
  initTimer();
  mineTile(clicked, false)
}

function handleClicks(event){
  clicked = game.gameObject[event.target.id]

  if(game.minedTiles == 0 && !event.shiftKey){
    handleFirstClick(clicked);
  }

  else if(event.shiftKey) {
    placeFlag(clicked);
  }

  else if(!event.shiftKey && clicked != undefined){
    mineTile(clicked, false)
  }

};

function detectClicks() {

    let tiles = $$(".tile") 

    tiles.onAll("click", function(event){
      handleClicks(event);
  });

}

function doFastMine(element) {
  forEach(game.gameObject[element].neighbors, function (neighbor) {
    if (!neighbor.hasFlag) {
      mineTile(neighbor);
    }
  });
}

function doHighlight(neighbors, cellsWithoutFlags) {
  if (!neighbors.hasFlag) {
    document.getElementById(neighbors.integerLocation).classList.add("highlight");
    cellsWithoutFlags++;
  }
  setTimeout(function() {
    document.getElementById(neighbors.integerLocation).classList.remove("highlight");
  }, 1000);
  return cellsWithoutFlags;
}

function highlight(element, method) {
  let neighborsArray = game.gameObject[element].neighbors
  let cellsWithoutFlags = 0; 
   
  forEach(game.gameObject[element].neighbors, function(neighbors){
      cellsWithoutFlags = doHighlight(neighbors, cellsWithoutFlags);
  });

    if(neighborsArray.length - cellsWithoutFlags == game.gameObject[element].bombsInCell) {
      doFastMine(element);
    }

}


function handleHighlight(){
  let id;
  event.target.tagName == "P" ? id = event.target.classList[1] : id = event.target.id;
  highlight(id);
}

function handleStartTimer(){
  if(!game.gameStarted){
    startGame();
    return;
  } 
  
  else if (game.gameStarted) {
    stopGame();
    return;
  }

}

function stopGame() {
  game.gameStarted = false;
  changeHTML(".restart-inner", "");
  game.gameTime.stop();
  minesweeper(8, 11, 15);
}


function initTimer(){
  
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      start: function(){
            game.gameTime.interval = setInterval(function(){

            if(game.gameTime.seconds != 59) {
              addSecondsToClock();
            } 
            
            else {
              addMinutesToClock();                     
            }

          }, 1000);
      },
      
      stop: function(){
        game.gameTime.seconds = 0;
        game.gameTime.minutes = 0;
        clearInterval(game.gameTime.interval)
      }
    
    }
}


function addMinutesToClock() {
  game.gameTime.seconds = 0;
  game.gameTime.minutes++;
  game.gameTime.minutes < 10 ? changeHTML(".minutes", "0" + game.gameTime.minutes) : changeHTML(".minutes", game.gameTime.minutes);
  game.gameTime.seconds < 10 ? changeHTML(".seconds", "0" + game.gameTime.seconds) : changeHTML(".seconds", game.gameTime.seconds);
}

function addSecondsToClock() {
  game.gameTime.seconds++;
  game.gameTime.minutes < 10 ? changeHTML(".minutes", "0" + game.gameTime.minutes) : changeHTML(".minutes", game.gameTime.minutes);
  game.gameTime.seconds < 10 ? changeHTML(".seconds", "0" + game.gameTime.seconds) : changeHTML(".seconds", game.gameTime.seconds);
}

function initDOM() {
  $(".minutes").innerHTML = "00";
  $(".seconds").innerHTML = "00";
  $$(".tile").onAll("dblclick", handleHighlight);
  $(".flags-inner").innerHTML = String.fromCodePoint(0x1F4A3) + game.flagsPlaced;
}


function minesweeper(x,y,bombs) {


  game = {
    bombLocations: [],
    numberBombs: ' ',
    numberTiles: ' ',
    gameObject: {},
    flagsPlaced: bombs,
    gameStarted: false,
    gameTime: initTimer(),
    minedTiles: 0,
    x: 0,
    y: 0,
    colors: ["#000000", "#4148e8", "#23a455", "#ee3e35", "#34176b", "#512a31", "#ff7ccd", "#ff5000", "#81d53a"]
    };



  populateField(x,y,bombs);
  setBombLocations(game.numberTiles,game.numberBombs);
  getNeighbors();
  getBombsInCells();
  buildGrid();
  detectClicks();
  initDOM();  

}

function init() {
  getEmojis();
  minesweeper(8, 11, 15);
  game.gamesWon = 0;
  game.gamesFinished = 0;
  game.gamesLost = 0;
  $(".restart-inner").on("click", handleStartTimer);
}

init();

