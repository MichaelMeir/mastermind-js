
var answer;

var currentRow = -1;

window.onload = new function() {
	document.getElementById("colorSelection").style.display = "none";
}

function start() {
	currentRow = -1;
	document.getElementById("tutorial").style.display = "none";
	document.getElementById("colorSelection").style.display = "block";
	document.getElementById("log").innerHTML = "";
	answer = [];
	for(var i = 0; i < 4; i++) {
		answer[i] = getRandomColor();
	}

	document.getElementById("start").style.display = "none";

	document.getElementById("rowButton").innerHTML = "Next Row";
	document.getElementById("rowButton").setAttribute("onclick", "nextRow();");

	document.getElementById("board").innerHTML = "";
	var boardPoints = "";

	for(var i = 0; i < 12; i++) {
		for(var j = 0; j < 4; j++) {
			boardPoints += "<button id=\"" + i + "r" + j + "\" class=\"option dis\" onclick=\"openColor('" + i + "r" + j + "')\"></button>";
		}
		for(var j = 0; j < 4; j++) {
			boardPoints += "<button id=\"pin-" + i + "r" + j + "\" class=\"pin\"></button>";
		}
		boardPoints +="<br>";
	}

	document.getElementById("board").innerHTML = boardPoints;
	nextRow();

}

var selectedColor;

function openColor(point) {
	if(point.split("r")[0] == currentRow) {
		document.getElementById(point).setAttribute("class", "option " + getColor(selectedColor));
	}
}

function setColor(color) {
	selectedColor = color;
	document.getElementsByTagName("main")[0].setAttribute("style", "cursor: url('resources/" + getColor(color) +".png'), auto");

	for(var i = 0; i < document.getElementsByClassName("option").length; i++) {
		document.getElementsByClassName("option")[i].setAttribute("style", "cursor: url('resources/" + getColor(color) +".png'), auto");
	}
}

function checkAnswer() {

	var ret = false;

	var bp = 0;
	var wp = 0;

	var checked = [false, false, false, false];
	var pointChecked = [false, false, false, false];

	for(var i = 0; i < 4; i++) {

		var c = document.getElementById(currentRow + "r" + i);

		if(c == null) {return;}

		if(c.getAttribute("class").includes(answer[i])) {
			bp++;
			checked[i] = true;
			pointChecked[i] = true;
			console.log(i);
		}
	}

	for(var i = 0; i < 4; i++) {

		var c = document.getElementById(currentRow + "r" + i);

		if(c == null) {return;}

		for(var j = 0; j < 4; j++) {
			if(c.getAttribute("class").includes(answer[j]) && !checked[j] && !pointChecked[i]) {
				wp++;
				checked[j] = true;
				pointChecked[i] = true;
				break;
				console.log(i);
			}
		}
	}

	if(bp >= 4) {
		ret = true;
	}

	for(var i = 0; i < 4; i++) {
		if(bp > 0) {
			document.getElementById("pin-" + currentRow + "r" + i).setAttribute("class", "pin black");
			bp--;
		}else if(wp > 0) {
			document.getElementById("pin-" + currentRow + "r" + i).setAttribute("class", "pin white");
			wp--;
		}
	}

	
	return ret;
}

function nextRow() {
	if(!checkAnswer()) {
		selectedPoint = null;
		currentRow++;
		if(currentRow >= 12) {
			document.getElementById("log").innerHTML = "You've lost! the answer was ";

			for(var i = 0; i < answer.length; i++) {
				document.getElementById("log").innerHTML += answer[i] + " ";
			}

			document.getElementById("rowButton").innerHTML = "Restart";
			document.getElementById("rowButton").setAttribute("onclick", "start();");
			return;
		}
		for(var i = 0; i < 4; i++) {
			document.getElementById(currentRow + "r" + i).setAttribute("class", "option");
		}
	}else{
		document.getElementById("log").innerHTML = "You've won!";
		document.getElementById("rowButton").innerHTML = "Restart";
		document.getElementById("rowButton").setAttribute("onclick", "start();");
	}
}

function getRandomColor() {
	var ran = Math.floor((Math.random() * 6) + 1);
	return getColor(ran);
}

function getColor(int) {
	switch(int) {
		case 1:
			return "red";
		case 2:
			return "blue";
		case 3:
			return "yellow";
		case 4:
			return "purple";
		case 5:
			return "green";
		case 6:
			return "orange";
	}
}