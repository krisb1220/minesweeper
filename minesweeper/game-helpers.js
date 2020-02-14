
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
		hasFlag: false,
    bombsInCell: 0,
		integerLocation: cellNumber,
		isOpen: false
  }
}

function calcTiles(x,y) {
  return x*y + (x*2);
}

function returnTileHTML(tileObject) {
  let number = tileObject.bombsInCell;
  let id = tileObject.integerLocation;
  // console.log(tileObject);
  return '<div id="' + id + '"><div class="tile-inner"><p class="tile-number">' + number + '</p></div></div>'
}

function placeFlag(cell) {
	//logic
}

function mineCell(cell) {
	//logic
}

function win() {
	//logic
}

function lose() {
	//logic
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

		forEach(field.fieldObject, function(tile){
			console.log();
			if(tile.hasBomb != false){
				tilesWithBombs++
			}
		});

		if(tilesWithBombs != field.numberBombs) {
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
      "game object": field,
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

// function timeGame()
