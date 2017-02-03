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

var p2Health = 0






function startGame() {
	allWordsChosen = [];
	blankArray = [];
	userInputArray = ["|","|","|","|","|","|","|","|"];
	displayAlreadyGuessed();
	userInputArray = [];
	guessesLeft = 10;
	wins = 0;
	resetP1Health();
	resetP2Health();
	document.getElementById("stage").play();
	chooseWord();

}
function nextRound() {
	if (wins == 5) {
		console.log("YOU ARE THE BEST!")
		displayWins();
		userInputArray = ["C","O","N","G","R","A","T","S"]
		displayAlreadyGuessed();
		decreaseP2Health();
		winP1Ani();
	} else {
		blankArray = [];
		userInputArray = ["|","|","|","|","|","|","|","|",];
		displayAlreadyGuessed();
		guessesLeft = 10;
		userInputArray = [];
		resetP1Health();
		p2Health = 0
		setP2Health();
		displayWins();
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
		resetP2Health();
		setP2Health();
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
		decreaseP1Health();
		document.getElementById("hitSFX2").play();
		console.log(guessesLeft);
	} else {
		for (var i = 0; i < wordChosen.length; i++) {
			if (wordChosen.charAt(i) == userGuess) {
				blankArray.splice(i, 1, wordChosen.charAt(i));
				decreaseP2Health();
				hitP1Ani();
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
	console.log("GameOver");
	userInputArray = ["G","A","M","E","O","V","E","R","<br>","I","N","S","E","R","T"," ","C","O","I","N"];
	displayAlreadyGuessed();
}
function decreaseP1Health() {
	var container = document.getElementById("p1HealthContainer");
	var leftValue = parseInt(container.style.left, 10);
	container.style.left = (leftValue + 4) + "%";
	var widthValue = parseInt(container.style.width, 10);
	container.style.width = (widthValue - 4) + "%";
}
function resetP1Health() {
	document.getElementById("p1HealthContainer").style.left = "0%";
	document.getElementById("p1HealthContainer").style.width = "40%";
}

function resetP2Health() {
	document.getElementById("p2HealthContainer").style.width = "40%";
}

function setP2Health() {
	for (var i = 0; i < blankArray.length; i++) {
		if(blankArray[i] == guessLine){
			p2Health++;
		}
	}
}
function decreaseP2Health() {
	var increment = 40 / p2Health;
	var container = document.getElementById("p2HealthContainer");
	var widthValue = parseInt(container.style.width, 10);
	if (widthValue < 1){
		container.style.width = 0 + "%";
		document.getElementById("hitSFX1").play();
	} else {
		container.style.width = (widthValue - increment) + "%";
		document.getElementById("hitSFX2").play();
	}
}

function displayWins(){
	document.getElementById("winsGold").innerHTML = "0000" + wins;
}

function resetP1Ani(){
	document.getElementById("player1").src = "assets/images/ryu-sf2-stance.gif";
	document.getElementById("player1").style.width = "";
	document.getElementById("player1").style.height = "";
	document.getElementById("player1").style.top = "";
	document.getElementById("player1").style.left = "";
}
function hitP1Ani(){
	document.getElementById("player1").src = "assets/images/ryu-sf2-a5.gif";
	document.getElementById("player1").style.width = 38 + "%";
	setTimeout(resetP1Ani, 600);
}
function winP1Ani() {
	document.getElementById("player1").src = "assets/images/ryu-winpose-sf2.gif";
	document.getElementById("player1").style.width = 24 + "%";
	document.getElementById("player1").style.height = 61 + "%";
	document.getElementById("player1").style.top = 32 + "%";
	document.getElementById("player1").style.left = 12 + "%";
}

