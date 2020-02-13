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

function returnTileHTML(cellNumber) {
  return '<div id="' + cellNumber + '"><div class="tile-inner"><p class="tile-number"></p></div></div>'
}

function createTileObject(cellNumber) {
  field.fieldObject[cellNumber] = {
    hasBomb:  false,
    bombsInCell: 0,
    integerLocation: cellNumber,
    htmlElement: returnTileHTML(cellNumber)
  }
}

function calcTiles(x,y) {
  return x*y;
}



/*


TO TARGET TILES BASED ON PROXIMITY USE 

field.fieldObject[field.fieldObject[88].integerLocation - 8]

*/