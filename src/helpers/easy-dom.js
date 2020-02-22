/*********************
*                                          *
* EASY DOM FUNCTIONS  *
*                                         *
********************/

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

function $$(element){
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

function testRandomNumbers(iterations,range){

  console.time(`${iterations} iterations completed in:`)

  let numbers = {};

  for(i=0;i<iterations;i++){
    let num = Math.ceil(Math.random()*range)
    numbers.hasOwnProperty(num) ? numbers[num]++ : numbers[num] = 1;
  }

  console.timeEnd(`${iterations} iterations completed in:`)

  return numbers;

}




/* ADD PROTOTYPES*/

HTMLElement.prototype.changeHTML = function(string) {
	this.innerHTML = string;
}

HTMLElement.prototype.addHTML = function(string){
  this.innerHTML += string;
  console.log(this);
} 

HTMLElement.ifClicked = function(element, callback){
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

