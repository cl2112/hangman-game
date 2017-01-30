var userGuess
var charaChoices = ["AKUMA","RYU","CHUN-LI","CAMMY","M. BISON","KEN","VEGA","SAGAT","GUILE","BALROG","ZANGIEF","BLANKA","DHALSIM",
					"FEI LONG","E. HONDA","T. HAWK","DEE JAY"]
var moveChoices = ["SHORYUKEN","HADOUKEN","SONIC BOOM","FLASH KICK","KIKOHKEN","HUNDRED HAND SLAP","SUMO HEADBUTT","RAGING DEMON",
					"SPINNING PILE DRIVER","TIGER SHOT","TIGER UPPERCUT","RUSH PUNCH","YOGA FLAME","CANNON SPIKE"]
var totalChoices = [charaChoices, moveChoices]
var userInputs = []
var wordChosen
var guessLine = " _ "
var linesTotal 
var correctLetter
var blankArray = []

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
document.onkeyup = function(event) {
	userGuess = event.key;
	console.log(userGuess);
	compareUserInput();
}
function chooseWord() {
	var chosenArray = totalChoices[Math.floor(Math.random() * totalChoices.length)];
	wordChosen = chosenArray[Math.floor(Math.random() * chosenArray.length)];
	console.log(wordChosen);
}
function blankGenerator() {
	for (var i = 0; i < wordChosen.length; i++) {
		blankArray.push(guessLine);
		console.log(blankArray);
	}
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
			displayBlankLines("guessWord");
		} 
	}
}