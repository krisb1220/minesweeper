
/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists
 * @private
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function} callback Callback function for each iteration
 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
 */

let emojis;

function getEmojis(){
	fetch("https://raw.githubusercontent.com/krisb1220/minesweeper/master/src/helpers/emoji.json").then(
		function(res){
			return res.json();
		}
	).then(function(myJson){
		emojis = myJson;
	})
}

function emojify(name){
	return String.fromCodePoint("0x" + emojis[name].unicode)
}

 function doNothing(){
	 return;
 }

function rnd(min,max){
  return Math.ceil(Math.random()*(max-min+1)+min );
}

 
function createTileObject(cellNumber) {
  game.gameObject[cellNumber] = {
		hasBomb:  false,
		hasFlag: false,
		isMined: false,
    bombsInCell: 0,
		integerLocation: cellNumber,
		borderCells: []
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
	let newHTML = document.createElement("div");
	newHTML.id = id;
	newHTML.innerHTML = number;
  // console.log(tileObject);
  return newHTML;
}




function showBoard(){
  
  clearBoardHtml();
  forEach(game.gameObject, function(tile){
    // console.log(tile);
    if(tile.integerLocation >= (game.x+3) && tile.integerLocation <= ((game.numberTiles - game.x) - 3))  {
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
	let location = tile.integerLocation;

	console.log(tile.hasFlag);
	if (!tile.isMined) {
		if(tile.hasFlag) {
			game.flagsPlaced++;
			console.log('flag removed')
			document.getElementById(tile.integerLocation).innerHTML = '';
			document.getElementById(tile.integerLocation).classList.remove("flagged")
			tile.hasFlag = false;
		} 

		else if(!tile.hasFlag && game.flagsPlaced != 0) {
			game.flagsPlaced--;
			document.getElementById(tile.integerLocation).innerHTML = "<p class='flag'>" + String.fromCodePoint(0x1F4A3) + "</p>";
			document.getElementById(tile.integerLocation).classList.add("flagged")
			tile.hasFlag = true;
		} 
	}
	

}

function mineTile(tile) {

	if(tile.hasFlag || tile.isMined) {
		return;
	}

	if(!tile.isMined) {
		tile.isMined = true;
		document.getElementById(tile.integerLocation).innerHTML = "<p class='number'>" + tile.bombsInCell + "</p>";
		document.getElementById(tile.integerLocation).classList.add("tile-mined");
		document.getElementById(tile.integerLocation).style.color = game.colors[document.getElementById(tile.integerLocation).innerText];

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

    forEach(game.bombLocations, function(value){
      if(value >= (game.numberTiles-game.x+3)) {
					timesFailed++
          passed = false;
          failedList.push( "BOMB LOCATIONS TOO HIGH")
      }
  });

  forEach(game.bombLocations, function(value){
    if(value < game.x+3) {
				timesFailed++				
        passed = false;
        failedList.push( "BOMB LOCATIONS TOO LOW")
    }
	});

		forEach(game.gameObject, function(tile){
			console.log();
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
