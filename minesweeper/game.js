let field = { };

/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists
 * @private
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function} callback Callback function for each iteration
 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
var forEach = function (collection, callback, scope) {
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection);
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection);
		}
	}
};

function rnd(min,max){
  return Math.ceil(Math.random()*(max-min+1)+min );
}

 
function createTileObject(cellNumber) {
  field.fieldObject[cellNumber] = {
    hasBomb:  false,
    bombsInCell: 0,
    integerLocation: cellNumber
  }
}

function calcTiles(x,y) {
  return x*y + (x*2);
}

function returnTileHTML(tileObject) {
  let number = tileObject.bombsInCell;
  let id = tileObject.integerValue
  return '<div id="' + id + '"><div class="tile-inner"><p class="tile-number">' + number + '</p></div></div>'
}


function populateField(x,y, numberBombs) {
   
  field.x = x;
  field.y = y;
  field.useableTiles = field.x * field.y,
  field.numberTiles = calcTiles(x,y);
  field.numberBombs = numberBombs;

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

/*** start test function */
function testGame(x,y,bombs,iterations) {
  console.time("all tests finished in....");
  console.group("tests");

  for(a=0; a<iterations;a++) {
    let passed = true;
    let failedList = [];

    console.group("test " + a)
    console.time("test " + a + " finished in");
 
    minesweeper(x,y,bombs);
    
    /*CONDITIONS */

    if(field.bombLocations.length != bombs) {
      passed=false;
      failedList.push("BOMB LOCATIONS LENGTH FAILED......")
    } 

    forEach(field.bombLocations, function(value){
      if(value >= (field.numberTiles-field.x)) {
          passed = false;
          failedList.push( "BOMB LOCATIONS TOO HIGH")
      }
  });

  forEach(field.bombLocations, function(value){
    if(value < field.x) {
        passed = false;
        failedList.push( "BOMB LOCATIONS TOO LOW")
    }
});

  /* END CONDITIONS */

    /*RUN AFTER ALL TESTS HAVE BEEN RUN */
    if(passed) {
      console.warn('Test ' + a + ': SUCCESS');
      failedList.push("none")
    } else {
      console.error('Test FAILED!!!!' + failedString);
    }

    console.table( {
      "game object": field,
      "failed": failedList
    });

    console.timeEnd("test " + a + " finished in")
    console.groupEnd("test " + a)
  }
  console.timeEnd("all tests finished in....");
  console.groupEnd("tests")
}


/********END TEST FUNCTION************/

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

function clearBoardHtml() {
  document.querySelector("#minesweeper").innerHTML = '';
}

function appendTilesToPage(){
  forEach(field.fieldObject, function(tile){
    
    if(tile.integerValue > field.x || tile.integerValue < field.useableTiles) {
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