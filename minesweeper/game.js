let field = { };
let emojis;

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

  field.bombLocations = [];
  let numberTiles = tiles - field.x;
  for(let bombs=0; bombs<numberBombs; bombs++){
    
    let bombLocation = rnd(field.x, (field.numberTiles-(field.x+3)));

    if(field.bombLocations.includes(bombLocation)) {
      bombLocation = rnd(field.x, (field.numberTiles-field.x*2));
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
    
    else {
      console.log(value);
      if(field.fieldObject[value.integerLocation + field.x] == undefined) {
        return;
      }

      else if(field.fieldObject[value.integerLocation - field.x] == undefined) {
        return;
      }

      else if(field.fieldObject[value.integerLocation + (field.x+1)] == undefined) {
        return;
      }

      else if(field.fieldObject[value.integerLocation - (field.x + 1)] == undefined) {
        return;
      }


      else if(field.fieldObject[value.integerLocation + 1].hasBomb) {
        bombsInCell++;
      } 
    
      else if(field.fieldObject[value.integerLocation - 1].hasBomb) {
        bombsInCell++;
      } 
    
      else if(field.fieldObject[value.integerLocation - field.x].hasBomb) { 
        bombsInCell++;
      } 

      else if(field.fieldObject[value.integerLocation + field.x].hasBomb) {
        bombsInCell++;
      } 
    
      if(field.fieldObject[value.integerLocation - (field.x + 1)].hasBomb) {
        
        bombsInCell++;
      } 
    
      if(field.fieldObject[value.integerLocation - (field.x - 1)].hasBomb) {
        
        bombsInCell++;
      } 
    }

    value.bombsInCell = bombsInCell;

  })

}



function appendTilesToPage(){
    clearBoardHtml();
    forEach(field.fieldObject, function(tile){
    // console.log(tile);
    if(tile.integerLocation >= (field.x+3) && tile.integerLocation <= ((field.numberTiles - field.x) - 6)) {
      tile.htmlElement = returnTileHTML(tile);
      document.querySelector("#minesweeper").innerHTML += tile.htmlElement;
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
}
)
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
  showBoard();
}


minesweeper(8,11,10);

/*

* ===Commit Log===

*/