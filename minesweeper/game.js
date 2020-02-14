let field = { };
let global = {};

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

  for(cells=1; cells<field.numberTiles+1; cells++ ) {
      createTileObject(cells);
  }
}


function createBombLocations(tiles, numberBombs ) {

  field.bombLocations = [];
  let numberTiles = tiles - field.x;
  for(let bombs=0; bombs<numberBombs; bombs++){
    
    let bombLocation = rnd(field.x, (field.numberTiles-(field.x*2)));

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
    let numberBombs = 0;

    if(value.hasBomb) {
      return;
    } 
    
    else {

      if(field.fieldObject[value.integerLocation + field.x] == undefined) {
        return;
      }

      if(field.fieldObject[value.integerLocation - field.x] == undefined) {
        return;
      }

      if(field.fieldObject[value.integerLocation + field.x+1] == undefined) {
        return;
      }

      if(field.fieldObject[value.integerLocation - field.x-2] == undefined) {
        return;
      }


      if(field.fieldObject[value.integerLocation + 1].hasBomb) {
        numberBombs++;
      } 
    
      if(field.fieldObject[value.integerLocation - 1].hasBomb) {
        numberBombs++;
      } 
    
      if(field.fieldObject[value.integerLocation - field.x].hasBomb) { 
        numberBombs++;
      } 

      if(field.fieldObject[value.integerLocation + field.x].hasBomb) {
        
        numberBombs++;
      } 
    
      if(field.fieldObject[value.integerLocation - (field.x + 1)].hasBomb) {
        
        numberBombs++;
      } 
    
      if(field.fieldObject[value.integerLocation - (field.x - 1)].hasBomb) {
        
        numberBombs++;
      } 
    }

    value.bombsInCell = numberBombs;

  })

}



function appendTilesToPage(){
  forEach(field.fieldObject, function(tile){
    // console.log(tile);
    if(tile.integerLocation >= field.x && tile.integerLocation <= field.useableTiles) {
      tile.htmlElement = returnTileHTML(tile);
      let html = tile.htmlElement;
      document.querySelector("#minesweeper").innerHTML += html;
    } else {
      return;
    }
  } 
  
  );
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
  

  clearBoardHtml();
  populateField(x,y,bombs);
  createBombLocations(field.numberTiles,field.numberBombs);
  appendBombsToFieldObject();
  getBombLocations();
  appendTilesToPage();

}


minesweeper(8,11,10);

/*


TO TARGET TILES BASED ON PROXIMITY USE 

field.fieldObject[field.fieldObject[88].integerLocation - 8]

*/