var userGuess
var charaChoices = ["AKUMA","RYU","CHUN-LI","CAMMY","M. BISON","KEN","VEGA","SAGAT","GUILE","BALROG","ZANGIEF","BLANKA","DHALSIM",
					"FEI LONG","E. HONDA","T. HAWK","DEE JAY"]
var moveChoices = ["SHORYUKEN","HADOUKEN","SONIC BOOM","FLASH KICK","KIKOHKEN","HUNDRED HAND SLAP","SUMO HEADBUTT","RAGING DEMON",
					"SPINNING PILE DRIVER","TIGER SHOT","TIGER UPPERCUT","RUSH PUNCH","YOGA FLAME","CANNON SPIKE"]
var totalChoices = [charaChoices, moveChoices]
var userInputs = []
var wordChosen



document.onkeyup = function(event) {
	userGuess = event.key;
	console.log(userGuess);
	if (userInputs.indexOf(userGuess) === -1) {
		userInputs.push(userGuess);
	} else {
		console.log("duplicate")
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