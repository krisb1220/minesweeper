/*********************
*                                          *
* EASY DOM FUNCTIONS  *
*                                         *
********************/


let ds = {}


class EasyDom{

  setDocStrings = function(arr){
    let currentIndex = 0;
    arr.forEach(function(variable){
        variable[0].docString = variable[1];
        console.log(`Docstring for variable at index ${currentIndex} has been set to ${variable[1]}`);
        currentIndex++;
    });
  }

}

let emojis;
let ed = new EasyDom();

ed.ifMobile = function(callback){
if(navigator.userAgent.includes("Mobile")) {
  callback();
}
}


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
   
    if(element.charAt(0) == "#") {
        return document.getElementById(element.split("#")[1]);
    }
      
    else if(element.charAt(0) == '.'){
        let elementsInList = document.getElementsByClassName(element.split(".")[1]);
        return elementsInList[0];   
    }
      
    else { 
      return document.querySelector(element); 
    }

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
	document.querySelector(element).innerHTML += string;
} 

function changeHTML(element, string) {
	document.querySelector(element).innerHTML = string;
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

NodeList.prototype.onAll = function(listener, callback) {
   
  if (this.__proto__ === NodeList.prototype){
    this.forEach(function(elementIndividual){
      elementIndividual.addEventListener(listener, callback)
    });
  } else {
    console.error("addEventListenerAll Function ONLY ACCEPTS NodeList");
  }
}

//Add Event Listener Shorthand
HTMLElement.prototype.on = function(listener, callback){
  this.addEventListener(listener, callback);
}

 
/* 
  - Add __doc__ as a native property for Object & Function 
*/

Object.prototype.__doc__ = 'null';
Function.prototype.__doc__ = 'null';


/* 
  - Add "setDocString()" as a native function for Objects and Functions. [myFunc.setDocString("docstring") ]  
*/
Object.prototype.setDocString = function(string){
  this.__doc__ = string;
  return this.__doc__;
}

Function.prototype.setDocString = function(string){
  this.__doc__ = string;
  return this.__doc__;
}


/* 
  
  - Set docString to multiple elements using a 2D array. Pass a variable literal and your docstring into the 2D Array. 
  - ex. setDocString( [ [var1, docString], [var1, docString] ] ) 

*/

ds.setDocStrings = function(arr){
  let currentIndex = 0;
  arr.forEach(function(variable){
      variable[0].__doc__ = variable[1];
      console.log(`Docstring for variable at index ${currentIndex} has been set to ${variable[1]}`);
      currentIndex++;
  });
}

Function.prototype.setDocString.__doc__ = "Sets the docstring of the variable it's called on. Example --- myVar.setDocString('docstring')"
ds.setDocStrings.__doc__ = "Sets the docstrings for multiple variables using a 2DArray. Example --- setDocString( [ [var1, docString], [var1, docString] ] )"
