
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
		isMined: false,
    bombsInCell: 0,
		integerLocation: cellNumber,
  }
}

function calcTiles(x,y) {
  return x*y + ((x*2)+6);
}

function returnTileHTML(tileObject) {
  let number = tileObject.bombsInCell;
  let id = tileObject.integerLocation;
  // console.log(tileObject);
  return '<div class="tile" id="' + id + '">'+  '</div>';
}

function returnTileHTMLWithNumber(tileObject) {
  let number = tileObject.bombsInCell;
  let id = tileObject.integerLocation;
  // console.log(tileObject);
  return '<div class="tile" id="' + id + '">' + number +  '</div>';
}




function showBoard(){
  
  clearBoardHtml();
  forEach(field.fieldObject, function(tile){
    // console.log(tile);
    if(tile.integerLocation >= (field.x+3) && tile.integerLocation <= ((field.numberTiles - field.x) - 3))  {
      tile.htmlElement = returnTileHTMLWithNumber(tile);
      
      document.querySelector("#minesweeper").innerHTML += tile.htmlElement;
    } 
  });
}

function hideBoard() {
	appendTilesToPage();
}

function placeFlag(tile) {

	// tile.hasFlag ? tile.hasFlag = true : tile.hasFlag = false;

	console.log(tile.hasFlag);

	if(tile.hasFlag) {
		console.log('flag removed')
		document.getElementById(tile.integerLocation).innerHTML = '';
		tile.hasFlag = false;
	} 

	else if(!tile.hasFlag) {
		console.log('flag placed')
		document.getElementById(tile.integerLocation).innerHTML = String.fromCodePoint(0x1F4A3);
		tile.hasFlag = true;
	} 
	
	

}

function mineTile(tile) {

	if(tile.hasFlag || tile.isMined) {
		return;
	}

	if(!tile.isMined) {
		document.getElementById(tile.integerLocation).innerHTML = tile.bombsInCell;
		document.getElementById(tile.integerLocation).classList += " tile-mined";
	} 

	// if(cell.hasFlag) {
	// 	return;
	// }

	// cell.isMined = true;
}

function win() {
	//logic
}

function lose() {
	console.log("YOU LOST!")
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
					timesFailed++
          passed = false;
          failedList.push( "BOMB LOCATIONS TOO HIGH")
      }
  });

  forEach(field.bombLocations, function(value){
    if(value < field.x) {
				timesFailed++				
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
