let game; //init game


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


// class Game{
//   constructor(x,y,numberBombs){
//     this.x = x;
//     this.y = y;
//     this.numberTiles = x*y;
//     this.numberBombs = numberBombs;
//     this.flagsPlaced = numberBombs;
//     this.tilesToWin = this.numberTiles - numberBombs;
//   }
// }

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
    // console.log(tile);
    //get random true/false value
    let isBomb = Math.random()*50 > 40;

    if(isBomb && bombsPushed != numberBombs && !tile.hasBomb){
      bombsPushed++
      bombLocations.push(tile.integerLocation)
      tile.hasBomb = true;
    }

  });

  game.bombLocations = bombLocations;
  
}

function getNeighbors() {
  forEach(game.gameObject, (value)=>{
      
    let lo = value.integerLocation;

    if(value.hasBomb) {
      value.bombsInCell = 'BOMB';
      return;
    } 


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
  // forEach(game.gameObject, (value)=>{
    
  let bombsInCell = 0;
  
    forEach(value.neighbors, (neighbor)=>{
      if(neighbor.hasBomb) {
        bombsInCell++ 
      }
    });

    return bombsInCell;
  // });
}

function getBombsInCells(){
  forEach(game.gameObject, (tile)=>{
    // console.log(`Counting bombs in Cell ${tile.integerLocation}....`)
    bombsInCell = countBombsInNeighbors(tile);
    bombsInCell != 0 ? tile.bombsInCell = bombsInCell : tile.bombsInCell = ''; 
  });
}

function appendTilesToPage(){
    clearBoardHtml();
    addRowsToPage();
    let currentRow = 1;
    forEach(game.gameObject, function(tile){

    tile.htmlElement = returnTileHTML(tile);
    if(tile.integerLocation % game.x == 1 && tile.integerLocation != 1) {
        currentRow++
        document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
      } else {
        document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
      }
  });
}

function gameStarted(){
  game.gameStarted = true;
  game.gameTime.start();
  changeHTML(".restart-inner", "Restart");
}

function handleClicks(){
  clicked = game.gameObject[event.target.id]

  if(game.minedTiles == 0 && !event.shiftKey){
    // console.log("gs")
    gameStarted();
    mineTile(clicked, false)
  }

  else if(event.shiftKey) {
    placeFlag(clicked);
  }

  else if(!event.shiftKey){
    mineTile(clicked, false)
  }

};

function detectClicks() {

    let tiles = $$(".tile") 

    $$(".tile").addEventListenerAll("click", function(event){
      handleClicks(event);
  });
}

function highlightCell(){
  let id = event.target.id
  forEach(game.gameObject[id].neighbors, function(neighbors){
    document.getElementById(neighbors.integerLocation).classList.add("highlight");

    setTimeout(function(){
      document.getElementById(neighbors.integerLocation).classList.remove("highlight")
    }, 1000)

  });

}

function handleStartTimer(){


  if(!game.gameStarted){
    gameStarted();
    return;
  } 
  
  else if (game.gameStarted) {
    game.gameStarted = false;
    changeHTML(".restart-inner", "Start");
    game.gameTime.stop();
    minesweeper(8,11,15)
    return;
  }

}

function initTimer(){
  
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      start: function(){
            game.gameTime.interval = setInterval(function(){

            if(game.gameTime.seconds != 59) {
              game.gameTime.seconds++;
              game.gameTime.minutes < 10 ?  changeHTML(".minutes",  "0" + game.gameTime.minutes) : changeHTML(".minutes",  game.gameTime.minutes);                                                 
              game.gameTime.seconds < 10 ?  changeHTML(".seconds",  "0" + game.gameTime.seconds ) : changeHTML(".seconds",  game.gameTime.seconds);
            } 
            
            else {
              game.gameTime.seconds = 0;
              game.gameTime.minutes++
              game.gameTime.minutes < 10 ?  changeHTML(".minutes",  "0" + game.gameTime.minutes) : changeHTML(".minutes",  game.gameTime.minutes);                                   
              game.gameTime.seconds < 10 ?  changeHTML(".seconds",  "0" + game.gameTime.seconds ) : changeHTML(".seconds",  game.gameTime.seconds);                     
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
  appendTilesToPage();
  initTimer();
  detectClicks();
$$(".tile").addEventListenerAll("dblclick", highlightCell);

  $(".flags-inner").innerHTML =  String.fromCodePoint(0x1F4A3) + game.flagsPlaced  
}


getEmojis();
minesweeper(8,11,15);

document.querySelector(".restart-inner").addEventListener("click", handleStartTimer);

