var charaChoices = ["AKUMA","RYU","CHUN LI","CAMMY","M. BISON","KEN","VEGA","SAGAT","GUILE","BALROG","ZANGIEF","BLANKA","DHALSIM",
					"FEI LONG","E. HONDA","T. HAWK","DEE JAY"]
var moveChoices = ["SHORYUKEN","HADOUKEN","SONIC BOOM","FLASH KICK","KIKOHKEN","HUNDRED HAND SLAP","SUMO HEADBUTT","RAGING DEMON",
					"SPINNING PILE DRIVER","TIGER SHOT","TIGER UPPERCUT","RUSH PUNCH","YOGA FLAME","CANNON SPIKE"]
var totalChoices = [charaChoices, moveChoices]
var allWordsChosen = []
var wordChosen

var blankArray = []
var guessLine = "_"




var userInputArray = []
var possibleUserInputs = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g",
							"h","j","k","l","z","x","c","v","b","n","m"]


 
var userGuess


var wordCompleted

var guessesLeft 


var linesTotal

var correctLetter

var wins






function startGame() {
	allWordsChosen = [];
	blankArray = [];
	userInputArray = [];
	guessesLeft = 10;
	wins = 0;
	chooseWord();

}
function nextRound() {
	if (wins == 5) {
		console.log("YOU ARE THE BEST!")
	} else {
		blankArray = [];
		userInputArray = [];
		guessesLeft = 10;
		displayAlreadyGuessed();
		chooseWord();
	}
}
//pick a word from the array, check if it is a repeat, if yes - get a new word, if no - push to the array then
//generate blank lines and display
function chooseWord() {
	var tempArray = totalChoices[Math.floor(Math.random() * totalChoices.length)];
	var tempWord = tempArray[Math.floor(Math.random() * tempArray.length)];
	if (allWordsChosen.indexOf(tempWord) == -1) {
		wordChosen = tempWord;
		allWordsChosen.push(wordChosen);
		blankArray = [];
		fillBlankArray(wordChosen);
		checkForSpaces();
		displayBlankArray();
		console.log(wordChosen);
		console.log(blankArray);

	} else if (allWordsChosen.length < 30) {
		console.log("Duplicate Word :" + tempWord);
		chooseWord();
	} else {
		console.log("No More Words Left.")
	}
}
function fillBlankArray(word) {
	for (var i = 0; i < word.length; i++) {
		blankArray.push(guessLine);
	}
}
function checkForSpaces() {
	for (var i = 0; i < wordChosen.length; i++) {
		if (wordChosen.charAt(i) == " ") {
			blankArray.splice(i, 1, wordChosen.charAt(i));
		}
		if (wordChosen.charAt(i) == ".") {
			blankArray.splice(i, 1, wordChosen.charAt(i));
		}
	}
}
function displayBlankArray() {
	document.getElementById("guessWordGold").innerHTML = blankArray.join("");
	//document.getElementById("guessWordBlue").innerHTML = blankArray.join("");
}


//if the key pressed is a letter and there are guesses left and its not a repeat letter, store the key pressed and trigger checks
document.onkeyup = function(event) {
	if (possibleUserInputs.indexOf(event.key) != -1 && guessesLeft > 0 && userInputArray.indexOf(event.key) == -1) {
		var userInput = event.key;
		userInputArray.push(userInput);
		userGuess = userInput.toUpperCase();
		console.log("User Input: " + userInput + "---" + "User Guess: " + userGuess);
		triggerOnKeyUp();
	} else {
		console.log("Key Not Supported Or No More Guesses Left Or Duplicate Key.")
	}
}


function triggerOnKeyUp() {
	compareUserGuess();
	displayBlankArray();
	displayAlreadyGuessed();
	gameStateCheck();
}


//checks if the userGuess is in the wordChosen, if yes write it to blankArray, if no - lose a life.
function compareUserGuess() {
	if (wordChosen.indexOf(userGuess) == -1) {
		guessesLeft -= 1;
		console.log(guessesLeft);
	} else {
		for (var i = 0; i < wordChosen.length; i++) {
			if (wordChosen.charAt(i) == userGuess) {
				blankArray.splice(i, 1, wordChosen.charAt(i));
			}
		}
	}
	
}
function displayAlreadyGuessed() {
	document.getElementById("alreadyGuessedGold").innerHTML = (userInputArray.join(" ")).toUpperCase();
	//document.getElementById("alreadyGuessedBlue").innerHTML = (userInputArray.join(" ")).toUpperCase();
}
function gameStateCheck() {
	if (guessesLeft == 0) {
		gameOver();
	} else if (blankArray.indexOf(guessLine) == -1) {
		console.log("Word Completed!");
		wins++;
		nextRound();
	}
}
function gameOver() {
	console.log("GameOver")
}
function decreaseP1Health() {
	var container = document.getElementById("p1HealthContainer");
	console.log(container);
	container.style.backgroundColor="blue";
}







































/*
document.onkeyup = function(event) {
	userGuess = event.key;
	console.log(userGuess);
	if (userInputs.indexOf(userGuess) === -1) {
		userInputs.push(userGuess);
		document.getElementById("alreadyGuessed").innerHTML = userInputs;
	} else {
		console.log("duplicate");
	}
	if (checkUserInput(userGuess, wordChosen) === -1) {
		console.log("no match");
	}	
}
function chooseWord() {
	var chosenArray = totalChoices[Math.floor(Math.random() * totalChoices.length)];
	wordChosen = chosenArray[Math.floor(Math.random() * chosenArray.length)];
	console.log(wordChosen);
}
function arrayString() {
	console.log(wordChosen + 2);
}
function userInputCheck() {

}
function displayGuessLines() {
	var x = wordChosen.length;
	document.getElementById("guessWord").innerHTML = guessLine * x;
}
function blankGenerator() {
	var fullNumberOfLines = guessLine;
	for (var i = 0; i < wordChosen.length -1; i++) {
		fullNumberOfLines += guessLine;
	}
	linesTotal = fullNumberOfLines;
	console.log(fullNumberOfLines);
	console.log(linesTotal);
	document.getElementById("guessWord").innerHTML = linesTotal;
}
function checkUserInput(x, y) {
	for (var i = 0; i < y.length; i++) {
		if (x.toUpperCase() === y.charAt(i)) {
			correctLetter = y.charAt(i);
			console.log(x);
			console.log(correctLetter);

		}
	}
}
*/
//------------------------------------------------------------------------------------------
/*
document.onkeyup = function(event) {
	if (possibleUserInputs.indexOf(event.key) != -1 && guessesLeft > 0) {
		userGuess = event.key;
		console.log(userGuess);
		compareUserInput();
		displayAlreadyGuessed();
		wordCompleteCheck();
	} else{
		console.log("key not supported");
	}
}
function chooseWord() {
	var chosenArray = totalChoices[Math.floor(Math.random() * totalChoices.length)];
	var tempWord = chosenArray[Math.floor(Math.random() * chosenArray.length)];
	console.log(tempWord);
	if (allWordsChosen.indexOf(tempWord) == -1) {
		wordChosen = tempWord;
		allWordsChosen.push(wordChosen);
		console.log(tempWord);
		console.log(wordChosen);
	} else if (allWordsChosen.length < 30) {
		console.log("word repeated");
		chooseWord();
	} else {
		console.log("all words played");
	}
}
function blankGenerator() {
	for (var i = 0; i < wordChosen.length; i++) {
		blankArray.push(guessLine);
		console.log(blankArray);
	}
}
function resetBlankArray() {
	blankArray = [];
}
function displayBlankLines(x) {
	document.getElementById(x).innerHTML = blankArray.join("");
}
function spliceIntoBlankArray (x, y) {
	blankArray.splice(x, 1, y)
}
function compareUserInput() {
	for (var i = 0; i < wordChosen.length; i++) {
		var letterToBeCompared = wordChosen.charAt(i);
		if (userGuess.toUpperCase() == letterToBeCompared) {
			spliceIntoBlankArray(i, letterToBeCompared);
			displayBlankLines("guessWordGold");
			displayBlankLines("guessWordBlue");
		} 
	}
}
function displayAlreadyGuessed() {
	if (userInputs.indexOf(userGuess.toUpperCase()) === -1){
		userInputs.push(userGuess.toUpperCase());
		decreaseGuessesLeft();
		document.getElementById("alreadyGuessedGold").innerHTML = userInputs;
		document.getElementById("alreadyGuessedBlue").innerHTML = userInputs;
	} else {
		console.log("duplicate");
	}
}
function resetUserInputsArray() {
	if (userInputs.length != 0) {
		userInputs = [];
		document.getElementById("alreadyGuessedGold").innerHTML = userInputs;
		document.getElementById("alreadyGuessedBlue").innerHTML = userInputs;
	}
}
function checkForSpaces() {
	//if the charaAt(i) is the same as "space" in the wordChosen then output that index and use it to place a "space"
	// in the blankArray.
	for (var i = 0; i < wordChosen.length; i++) {
		if (wordChosen.charAt(i) == " ") {
			spliceIntoBlankArray(i, "&nbsp"); 
		}
		if (wordChosen.charAt(i) == ".") {
			spliceIntoBlankArray(i, ".");
		}
	}
}
function wordCompleteCheck() {
	//check if there are any blank spaces left in the blankArray, if yes then do nothing, if no then word is complete.
		if (blankArray.indexOf("_") == -1) {
			wordComplete = true;
			console.log("word is done");
			document.getElementById("congrats").innerHTML = "Congrats!!!"
		} else {
			wordComplete = false;
			gameOverCheck();
		}
}
function decreaseGuessesLeft() {
	if (wordChosen.indexOf(userGuess.toUpperCase()) == -1) {
		guessesLeft -= 1;
	}
}
function resetGuessesLeft() {
	guessesLeft = 10;
	document.getElementById("congrats").innerHTML = guessesLeft;
}
function gameOverCheck() {
	if (guessesLeft == 0) {
		completeBlankSpaces();
		displayBlankLines("guessWordGold");
		displayBlankLines("guessWordBlue");
		document.getElementById("congrats").innerHTML = "game over man";
	} else {
		document.getElementById("congrats").innerHTML = guessesLeft;
	}
}
function completeBlankSpaces() {
	for (var i = 0; i < wordChosen.length; i++) {
		spliceIntoBlankArray(i,wordChosen.charAt(i));
	}
}
*/

