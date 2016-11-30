var actualWord = null;
var actualPlayer = {};
var countSuccess = 0;
var time = 30;
var skips = 3;
var tips = 1;


speechSynthesis.getVoices();

var skipWord = function(argument) {
	skips--;
	nextWord();
	var word = document.querySelector('#word').value = "";
	document.querySelector('#skips').innerHTML = skips;
	resetTimer();
	setTimer();

	if(skips == 0){
		document.querySelector('#skips').style.color = "#ff0000";
		document.querySelector('#btnPular').disabled = true;
	}
}

var setTimer = function(){
	window.timer = setInterval(function(){
			time -= 1;
			document.querySelector('#time').innerHTML = time;
			if(time <= 5)
				document.querySelector('#time').style.color = "#ff0000";
			if(time < 0){
				resetTimer();
				confirm('Seu tempo acabou!\nTotal de pontos: '+countSuccess+'\n\n');
				window.location.reload();
			}
		}, 1000);
}

var getTip = function(argument) {

	if(actualWord.word.length > 10)
		alert(actualWord.word.slice(0, 3).toUpperCase()+' ... '+actualWord.word.slice(-3).toUpperCase() + '\n\n');
	else if(actualWord.word.length > 8)
		alert(actualWord.word.slice(0, 2).toUpperCase()+' ... '+actualWord.word.slice(-2).toUpperCase() + '\n\n');
	else if(actualWord.word.length > 6)
		alert(actualWord.word.slice(0, 1).toUpperCase()+' ... '+actualWord.word.slice(-1).toUpperCase() + '\n\n');
	else 
		alert(actualWord.word.slice(0, 1).toUpperCase()+' ... \n\n');

	tips --;
	if(tips == 0)
		document.querySelector('#btnDica').disabled = true;
}

var resetTip = function(argument) {
	document.querySelector('#btnDica').disabled = false;
	tips = 1;
}

var resetTimer = function(argument) {
	clearInterval(timer);
	window.timer = null;
	time = 30;
	document.querySelector('#time').innerHTML = time;
	document.querySelector('#time	').style.color = "#000000";	
}

var speak = function(word) {
	var speech = new SpeechSynthesisUtterance();
	speech.voice =  speechSynthesis.getVoices()[15];
	// text.voiceURI = 'Google português do Brasil'; //discovered after dumping getVoices()
  	// text.lang = "pt-BR";
	speech.text = word;
	speech.rate = 1;
	speech.pitch = 1;
	speech.volume = 1;

	speechSynthesis.speak(speech);
}

var getNotUsedWord = function() {
	var index = Math.floor(Math.random() * (words.length + 1));
	return words[index];
}

var removeUsedWord = function(word) {
	words.splice(word, 1);
}

var speakActualWord = function() {
	speak(actualWord.word);
}

var speakActualDefinition = function() {
	speak(actualWord.definition);
}

var initGame = function() {
	var name = document.querySelector('#name').value;
	if (name) {
		setName(name);
		gameMode();
		actualWord = getNotUsedWord();
		setTimer();
	} else {
		alert('Informe um nome de usuário!\n\n');
	}
}

var setName = function(name) {
	actualPlayer.name = name;
	document.querySelector('#nameLabel').innerHTML = actualPlayer.name;
}
var verifyWord = function() {
	var word = document.querySelector('#word').value;
	if (word.toUpperCase() == actualWord.word.toUpperCase()) {
		alert('Parabéns, você acertou a palavra: '+actualWord.word+'! +1 ponto\nTecle "OK" para continuar.\n\n');
		countSuccess++;
		nextWord();
		document.querySelector('#points').innerHTML = countSuccess;
		var word = document.querySelector('#word').value = "";
		resetTimer();
		setTimer();
		resetTip();
	} else {
		confirm('Errou! \nPalavra correta era: ' + actualWord.word + '\nTotal de pontos: '+countSuccess+'\n\n');
		window.location.reload()
	}
}

var nextWord = function() {
	removeUsedWord(actualWord);
	actualWord = getNotUsedWord();
}

var initMode = function() {
	document.querySelector('#init').style.display = 'block';
	document.querySelector('#game').style.display = 'none';
	countSuccess = 0;
	document.querySelector('#points').innerHTML = countSuccess;
}

var gameMode = function() {
	document.querySelector('#game').style.display = 'block';
	document.querySelector('#init').style.display = 'none';
}

initMode();