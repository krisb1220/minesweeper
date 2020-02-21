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

function $(element){
	return document.querySelector(element);
}

function selectAll(element){
	return document.querySelectorAll(element);
}

var forEach = function (collection, callback, scope) {
	if (collection.__proto__ === Object.prototype) {
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

function createElement(element){
  return document.createElement(element)
}

function addEventListenerAll(element, listener, callback) {
   
  if (element.__proto__ === NodeList.prototype){
    element.forEach(function(elementIndividual){
      elementIndividual.addEventListener(listener, callback)
    });
  } else {
    console.error("First argument in addEventListenerAll() must be a NodeList");
  }
}

function ifClicked(element, callback) {
   
  if (element.__proto__ == Array.prototype || element.__proto__ === NodeList.prototype){
    element.forEach(function(elementIndividual){
      console.log("forEach")
      console.log(elementIndividual);
      elementIndividual.addEventListener("click",  callback)
    });
  } 
  
  else if(element.__proto__ === String.prototype) {
    console.log("individual")
    document.querySelector(element).addEventListener("click",  callback);
  }
}

function addHTML(element, string) {
	$(element).innerHTML += string;
} 

function changeHTML(element, string) {
	$(element).innerHTML = string;
} 