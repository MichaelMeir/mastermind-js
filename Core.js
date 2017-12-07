
var answer;

var currentRow = -1;

function start() {
	answer = [];
	for(var i = 0; i < 4; i++) {
		answer[i] = getRandomColor();
	}

	document.getElementById("start").style.display = "none";

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

var selectedPoint;

function openColor(point) {
	if(point.split("r")[0] == currentRow) {
		selectedPoint = point;
	}else{
		selectedPoint = null;
	}
}

function setColor(color) {
	if(selectedPoint != null) {
		document.getElementById(selectedPoint).setAttribute("class", "option " + getColor(color));
	}
}

function checkAnswer() {

	var ret = false;

	var bp = 0;
	var wp = 0;

	for(var i = 0; i < 4; i++) {

		var c = document.getElementById(currentRow + "r" + i);

		if(c != null) {
			for(var j = 0; j < answer.length; j++) {
				if(j == i && c.getAttribute("class").includes(answer[j])) {
					bp++;
				}else if(j != i && c.getAttribute("class").includes(answer[j])) {
					wp++;
				}
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
		currentRow++;
		for(var i = 0; i < 4; i++) {
			document.getElementById(currentRow + "r" + i).setAttribute("class", "option");
		}
	}else{
		document.getElementById("log").innerHTML = "You've won!";
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