var haikus;
var words = [];
var wordCounts = [];
var wordObjects = [];
var totalWordvalue = 0;
var friends = [];
var dates = [];

window.onload = initialize;

function initialize() {
	$.getJSON("Haikus.json", function(json) {
		haikus = json.results;
		populateHaikus();
		printAnalysis();
	});
}

function populateHaikus() {
	for(var i = 0; i < haikus.length; i++) {
		if (haikus[i].place.length > 0) {
			$(".haiku-grid").append("<div class='mdl-cell mdl-card mdl-shadow--2dp'>"
			+ "<div class='mdl-card__title mdl-card--expand'>"
			+ "<h3 class='mdl-card__title-text'>" 
			+ haikus[i].haiku1.join(' ') + "<br>"
	    	+ haikus[i].haiku2.join(' ') + "<br>"
	    	+ haikus[i].haiku3.join(' ') + "<br>"
			+ "</h3></div><div class='mdl-card__supporting-text'>"
	    	+ "Sally & " + haikus[i].writers.join(' &')
	        + " @ " + haikus[i].place
	    	+ "</div><div id='haiku-date' class='mdl-card__actions mdl-card--border'>"
	        + haikus[i].date
	    	+ "</div></div>");
		} else {
			$(".haiku-grid").append("<div class='mdl-cell mdl-card mdl-shadow--2dp'>"
			+ "<div class='mdl-card__title mdl-card--expand'>"
			+ "<h3 class='mdl-card__title-text'>" 
			+ haikus[i].haiku1.join(' ') + "<br>"
	    	+ haikus[i].haiku2.join(' ') + "<br>"
	    	+ haikus[i].haiku3.join(' ') + "<br>"
			+ "</h3></div><div class='mdl-card__supporting-text'>"
	    	+ "Sally & " + haikus[i].writers.join(' &')
	    	+ "</div><div id='haiku-date' class='mdl-card__actions mdl-card--border'>"
	        + haikus[i].date
	    	+ "</div></div>");
		}
		countWords(haikus[i]);
		countFriends(haikus[i]);
		countDates(haikus[i]);
		totalWordvalue += haikus[i].wordCount;
	}
	wordObjects.sort(comparevalue);
	friends.sort(comparevalue);
	dates.sort(comparevalue);
	// drawChart();
}

function drawChart() {
	var ctx = document.getElementById("myChart").getContext("2d");
	var options = 
	{
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : false,
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 70, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps : 100,
    //String - Animation easing effect
    animationEasing : "easeOutBounce",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : false,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : true,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	}
	var myDoughnutChart = new Chart(ctx).Doughnut(friends, options);
	myDoughnutChart.generateLegend();
}

function Word(word) {
	this.val = word;
	this.value = 1;
}

function Friend(name) {
	this.name = name;
	this.value = 1;
}

function Date(date) {
	this.date = date;
	this.value = 1;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function findWord(word) {
	for(var i = 0; i < wordObjects.length; i++) {
		if (wordObjects[i].val === word) {
			return i;
		} 
	}
	return -1;
}

function findFriend(name) {
	for(var i = 0; i < friends.length; i++) {
		if (friends[i].name === name) {
			return i;
		} 
	}
	return -1;
}

function findDate(date) {
	for(var i = 0; i < dates.length; i++) {
		if (dates[i].date === date) {
			return i;
		} 
	}
	return -1;
}

function countFriends(haiku) {
	var writers = haiku.writers;
	for (var i = 0; i < writers.length; i++) {
		var currentPerson = writers[i].trim();
		var currentIndex = findFriend(currentPerson);
		if(currentIndex > -1) {
			friends[currentIndex].value += 1;
			friends[currentIndex].color = getRandomColor();
			friends[currentIndex].label = currentPerson;
		} else {
			friends.push(new Friend(currentPerson));
		}
	}
}

function countDates(haiku) {
	var currentDate = haiku.date;
	var currentIndex = findDate(currentDate);
	if(currentIndex > -1) {
		dates[currentIndex].value += 1;
	} else {
		dates.push(new Date(currentDate));
	}
}

function countWords(haiku) {
	var haiku1 = haiku.haiku1;
	var haiku2 = haiku.haiku2;
	var haiku3 = haiku.haiku3;

	for(var i = 0; i < haiku1.length; i++) {
		var currWord = haiku1[i].toLowerCase();
		currWord = currWord.split(",").join("");
		currWord = currWord.split(".").join("");
		// var currIndex = words.indexOf(currWord);
		var currIndex = findWord(currWord);
		if(currIndex > -1) {
			wordObjects[currIndex].value += 1;
			wordCounts[currIndex] += 1;
		} else {
			wordObjects.push(new Word(currWord));
			words.push(currWord);
			wordCounts.push(1);
		}
	}

	for(var i = 0; i < haiku2.length; i++) {
		var currWord = haiku2[i].toLowerCase();
		currWord = currWord.split(",").join("");
		currWord = currWord.split(".").join("");
		// var currIndex = words.indexOf(currWord);
		var currIndex = findWord(currWord);
		if(currIndex > -1) {
			wordObjects[currIndex].value += 1;
			wordCounts[currIndex] += 1;
		} else {
			wordObjects.push(new Word(currWord));
			words.push(currWord);
			wordCounts.push(1);
		}
	}

	for(var i = 0; i < haiku3.length; i++) {
		var currWord = haiku3[i].toLowerCase();
		currWord = currWord.split(",").join("");
		currWord = currWord.split(".").join("");
		// var currIndex = words.indexOf(currWord);
		var currIndex = findWord(currWord);
		if(currIndex > -1) {
			wordObjects[currIndex].value += 1;
			wordCounts[currIndex] += 1;
		} else {
			wordObjects.push(new Word(currWord));
			words.push(currWord);
			wordCounts.push(1);
		}
	}
}

function comparevalue(a,b) {
	return b.value - a.value;
}

function printAnalysis() {
	$("#total-haikus").prepend("<h1>" + haikus.length + "</h1>");
	$("#total-words").prepend("<h1>" + wordObjects.length + "</h1>");
	$("#total-days").prepend("<h1>" + dates.length + "</h1>")
	$("#total-friends").prepend("<h1>" + friends.length + "</h1>");
}
