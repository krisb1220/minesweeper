let field = { };
// let emojis;

function clearBoardHtml() {
  document.querySelector("#minesweeper").innerHTML = '';
}

function populateField(x,y, numberBombs) {
   
  field.x = x;
  field.y = y;
  field.useableTiles = field.x * field.y,
  field.numberTiles = calcTiles(x,y);
  field.numberBombs = numberBombs;
  field.won = false;
  field.flagsPlaced = 0;
  field.currentTime = 0;

  for(cells=0; cells<field.numberTiles; cells++ ) {
      createTileObject(cells);
  }
}


function createBombLocations(tiles, numberBombs ) {


  for(let bombs=0; bombs<numberBombs; bombs++){
    
    let bombLocation = rnd(field.x+3, (field.numberTiles-(field.x+3)));

    if(field.bombLocations.includes(bombLocation)) {
      bombLocation = rnd(field.x+3, (field.numberTiles-(field.x+3)));
      field.bombLocations.push(bombLocation);
    }  else {
      field.bombLocations.push(bombLocation);
    }

  }

}

function appendBombsToFieldObject(){
  field.bombLocations.forEach(function(bombLocation){
    field.fieldObject[bombLocation].hasBomb = true;
  })
}

function getBombLocations() {
  
  forEach(field.fieldObject, (value)=>{
    let bombsInCell = 0;

    if(value.hasBomb) {
      value.bombsInCell = 'BOMB';
      return;
    } 
    
    else if(value.integerLocation >= field.x+3 && value.integerLocation <= field.numberTiles -(field.x+3)) {

      //right
      if(field.fieldObject[value.integerLocation + 1].hasBomb && value.integerLocation % field.x != 2 ) {
        bombsInCell++;
      } 

      //left
     if(field.fieldObject[value.integerLocation - 1].hasBomb && value.integerLocation % field.x != 3) {
        bombsInCell++;
      }      


      //top
      if(field.fieldObject[value.integerLocation - field.x].hasBomb) { 
        bombsInCell++;
      } 

      //top right
      if(field.fieldObject[(value.integerLocation - field.x)+1].hasBomb && value.integerLocation % field.x != 2 ) {
        bombsInCell++;
      } 

      //top left
      if(field.fieldObject[(value.integerLocation - field.x)-1].hasBomb  && value.integerLocation % field.x != 3) {
        
        bombsInCell++;
      }       

      //bottom
      if(field.fieldObject[value.integerLocation + field.x].hasBomb) {
        bombsInCell++;
      } 

      //bottom right
      if(field.fieldObject[(value.integerLocation + field.x)+1].hasBomb && value.integerLocation % field.x != 2 ) {
        bombsInCell++;
      } 

      //bottom left
      if(field.fieldObject[(value.integerLocation + field.x)-1].hasBomb  && value.integerLocation % field.x != 3 ) {
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
    forEach(field.fieldObject, function(tile){
      if(tile.integerLocation >= (field.x+3) && tile.integerLocation < ((field.numberTiles - field.x) - 3)) {
        tile.htmlElement = returnTileHTML(tile);

          if(tile.integerLocation == field.x + 3 || tile.integerLocation == (field.numberTiles - (field.x-3))) {
            document.querySelector("#row-"+currentRow).innerHTML += tile.htmlElement;
            return; 
          }

          else if((tile.integerLocation - (field.x+3)) % field.x == 0) {
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

  forEach(tiles, function(tile){
    tile.addEventListener("click", function(event){

      clicked = field.fieldObject[event.target.id]

       if(event.shiftKey) {
         placeFlag(clicked);
       }

       else if(!event.shiftKey){
        clicked.hasBomb ? lose() : mineTile(clicked);
       }
  });
});

}

function minesweeper(x,y,bombs) {


  field = {
    bombLocations: [],
    numberBombs: '',
    numberTiles: '',
    fieldObject: {},
    x: 0,
    y: 0
  
  };
  

  populateField(x,y,bombs);
  createBombLocations(field.numberTiles,field.numberBombs);
  appendBombsToFieldObject();
  getBombLocations();
  appendTilesToPage();
  detectClicks();
}

getEmojis();
minesweeper(8,11,10);

/*

* ===Commit Log===
  ! 1. Fixed issue where bomb locations were not being calculated correctly
  ! 2. Fixed issue where row-end and row-start bomb indicators were not being calculated correctly
  
*/