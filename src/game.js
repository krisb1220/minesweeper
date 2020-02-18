let game = { };
// let emojis;

function clearBoardHtml() {
  document.querySelector("#minesweeper").innerHTML = '';
}

function populateField(x,y, numberBombs) {
   
  game.x = x;
  game.y = y;
  game.useableTiles = game.x * game.y,
  game.numberTiles = calcTiles(x,y);
  game.numberBombs = numberBombs;
  game.won = false;
  game.flagsPlaced = numberBombs;
  // game.currentTime = 0;

  for(cells=0; cells<game.numberTiles; cells++ ) {
      createTileObject(cells);
  }
}

function createBombLocations(tiles, numberBombs ) {


  for(let bombs=0; bombs<numberBombs; bombs++){
    
    let bombLocation = rnd(game.x+3, (game.numberTiles-(game.x+3)));

    if(game.bombLocations.includes(bombLocation)) {
      bombLocation = rnd(game.x+3, (game.numberTiles-(game.x+3)));
      game.bombLocations.push(bombLocation);
    }  else {
      game.bombLocations.push(bombLocation);
    }

  }

}

function appendBombsTogameObject(){
  game.bombLocations.forEach(function(bombLocation){
    game.gameObject[bombLocation].hasBomb = true;
  })
}

function getBombLocations() {
  
  forEach(game.gameObject, (value)=>{
    let bombsInCell = 0;

    if(value.hasBomb) {
      value.bombsInCell = 'BOMB';
      return;
    } 
    
    else if(value.integerLocation >= game.x+3 && value.integerLocation <= game.numberTiles -(game.x+3)) {

      //right
      if(game.gameObject[value.integerLocation + 1].hasBomb && value.integerLocation % game.x != 2 ) {
        bombsInCell++;
      } 

      //left
     if(game.gameObject[value.integerLocation - 1].hasBomb && value.integerLocation % game.x != 3) {
        bombsInCell++;
      }      


      //top
      if(game.gameObject[value.integerLocation - game.x].hasBomb) { 
        bombsInCell++;
      } 

      //top right
      if(game.gameObject[(value.integerLocation - game.x)+1].hasBomb && value.integerLocation % game.x != 2 ) {
        bombsInCell++;
      } 

      //top left
      if(game.gameObject[(value.integerLocation - game.x)-1].hasBomb  && value.integerLocation % game.x != 3) {        
        bombsInCell++;
      }       

      //bottom
      if(game.gameObject[value.integerLocation + game.x].hasBomb) {
        bombsInCell++;
      } 

      //bottom right
      if(game.gameObject[(value.integerLocation + game.x)+1].hasBomb && value.integerLocation % game.x != 2 ) {
        bombsInCell++;
      } 

      //bottom left
      if(game.gameObject[(value.integerLocation + game.x)-1].hasBomb  && value.integerLocation % game.x != 3 ) {
        bombsInCell++;
      }       




}

    value.bombsInCell = bombsInCell;

  })

}



function appendTilesToPage(){
    clearBoardHtml();
    addRowsToPage();

    let currentRow = 1;
    forEach(game.gameObject, function(tile){
      if(tile.integerLocation >= (game.x+3) && tile.integerLocation < ((game.numberTiles - game.x) - 3)) {
        tile.htmlElement = returnTileHTML(tile);

          if(tile.integerLocation == game.x + 3 || tile.integerLocation == (game.numberTiles - (game.x-3))) {
            document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
            return; 
          }

          else if((tile.integerLocation - (game.x+3)) % game.x == 0) {
            currentRow++
            document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
          } else {
            document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
          }

      } 
  });
}


function detectClicks() {

    let tiles = document.querySelectorAll(".tile") 

     addEventListenerAll(tiles, "click", function(event){

        clicked = game.gameObject[event.target.id]

        if(event.shiftKey) {
          placeFlag(clicked);
        }

        else if(!event.shiftKey){
          clicked.hasBomb ? lose() : mineTile(clicked);
        }
    });
}

function handleStartTimer(){

  // let element = document.querySelector(".restart-inner");
  console.log("click");

  if(!game.gameStarted){
    // element.removeEventListener("mousedown", handleStartTimer, true)
    game.gameStarted = true;      
    changeHTML(".restart-inner", "Restart");
    game.gameTime.start();
    // document.querySelector(".restart-inner").addEventListener("click", handleStartTimer);    
    return;
  } 
  
  else if (game.gameStarted) {
    game.gameStarted = false;
    changeHTML(".restart-inner", "Start");
    game.gameTime.stop();
    minesweeper(8,11,10)
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

            if(game.gameTime.seconds != 60) {
              game.gameTime.seconds++;
              game.gameTime.seconds < 10 ?  changeHTML(".seconds",  "0" + game.gameTime.seconds ) : changeHTML(".seconds",  game.gameTime.seconds);
            } 
            
            else {
              game.gameTime.seconds = 0;
              game.gameTime.minutes++
              game.gameTime.seconds++;
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
    x: 0,
    y: 0,
    
    };



  populateField(x,y,bombs);
  createBombLocations(game.numberTiles,game.numberBombs);
  appendBombsTogameObject();
  getBombLocations();
  appendTilesToPage();
  initTimer();
  detectClicks();
  

}


getEmojis();
minesweeper(8,11,10);
document.querySelector(".restart-inner").addEventListener("click", handleStartTimer);
document.addEventListener("devicemotion", function(){
  $("#minesweeper").innerHTML = '';
})

/*

* ===Commit Log===
  ! 1. Fixed issue where bomb locations were not being calculated correctly
  ! 2. Fixed issue where row-end and row-start bomb indicators were not being calculated correctly
  ! 3. Moved dom-related helpers to helpers/easy-dom.js 
  
*/