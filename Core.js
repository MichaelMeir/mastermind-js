
var answer;

var currentRow = -1;

function start() {
	currentRow = -1;
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

		if(c == null) {return;}


		if(c.getAttribute("class").includes(answer[i])) {
			bp++;
			console.log(i);
		}else{
			for(var j = 0; j < 4; j++) {
				if(c.getAttribute("class").includes(answer[j])) {
					wp++;
					break;
					console.log(i);
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