/*********************
*                                          *
* EASY DOM FUNCTIONS  *
*                                         *
********************/

let emojis;


//Get Emojis
function getEmojis(){
	fetch("https://raw.githubusercontent.com/krisb1220/minesweeper/master/src/helpers/emoji.json").then(
		function(res){
			return res.json();
		}
	).then(function(myJson){
		emojis = myJson;
	})
}


//Query Selector All
function emojify(name){
	return String.fromCodePoint("0x" + emojis[name].unicode)
}


//Query Selector
function $(element){
	return document.querySelector(element);
}


//Query Selector All
function $$(element){
	return document.querySelectorAll(element);
}



//Easy ForEach
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


//Create HTML Element
function createElement(element){
  return document.createElement(element)
}


//Add Event Listener To A NodeList
function addEventListenerAll(element, listener, callback) {
   
  if (element.__proto__ === NodeList.prototype){
    element.forEach(function(elementIndividual){
      elementIndividual.addEventListener(listener, callback)
    });
  } else {
    console.error("First argument in addEventListenerAll() must be a NodeList");
  }
}


//Add "Click" event listener to an element
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

//Adds HTML to an element
function addHTML(element, string) {
	$(element).innerHTML += string;
} 

function changeHTML(element, string) {
	$(element).innerHTML = string;
} 


/* ADD PROTOTYPES*/

HTMLElement.prototype.changeHTML = function(DOMString) {
	this.innerHTML = DOMString
}

HTMLElement.prototype.addHTML = function(DOMString){
  this.innerHTML += DOMString;
} 

HTMLElement.ifClicked = function(callback){
    this.addEventListener("click",  callback);
}

NodeList.prototype.addEventListenerAll = function(listener, callback) {
   
  if (this.__proto__ === NodeList.prototype){
    this.forEach(function(elementIndividual){
      elementIndividual.addEventListener(listener, callback)
    });
  } else {
    console.error("Function ONLY ACCEPTS NodeList");
  }
}


//Add Event Listener Shorthand
HTMLElement.prototype.on = function(listener, callback){
  this.addEventListener(listener, callback);
}

