var imgCnt;
var imgIndex;
var currentImg;
var haikus;
var words = [];
var wordCounts = [];
var wordObjects = [];
var totalWordCnt = 0;
var friends = [];
var dates = [];

window.onload = initialize;

function initialize() {
	imgCnt = 1;
	// Parse.initialize("aNDAZRLAojJH7aCQ0my1U0AxUBLVBlba6XhRlGa2", 
	// 	"pcAOB3TF0npsLLUxM4BWr6gpt5cbYKGUoEqi2pls");

	// var HaikuObject = Parse.Object.extend("Haiku");
	// var query = new Parse.Query(HaikuObject);
	// query.find({
	// 	success : function(results) {
	// 		haikus = results;
	// 		populateHaikus();
	// 		printAnalysis();
	// 	}
	// });

	$.getJSON("Haikus.json", function(json) {
		haikus = json.results;
		populateHaikus();
		printAnalysis();
	});
}

function populateHaikus() {
	for(var i = 0; i < haikus.length; i++) {
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
		countWords(haikus[i]);
		countFriends(haikus[i]);
		countDates(haikus[i]);
		totalWordCnt += haikus[i].wordCount;
	}
	wordObjects.sort(compareCnt);
	friends.sort(compareCnt);
	dates.sort(compareCnt);
}

function Word(word) {
	this.val = word;
	this.cnt = 1;
}

function Friend(name) {
	this.name = name;
	this.cnt = 1;
}

function Date(date) {
	this.date = date;
	this.cnt = 1;
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
			friends[currentIndex].cnt += 1;
		} else {
			friends.push(new Friend(currentPerson));
		}
	}
}

function countDates(haiku) {
	var currentDate = haiku.date;
	var currentIndex = findDate(currentDate);
	if(currentIndex > -1) {
		dates[currentIndex].cnt += 1;
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
			wordObjects[currIndex].cnt += 1;
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
			wordObjects[currIndex].cnt += 1;
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
			wordObjects[currIndex].cnt += 1;
			wordCounts[currIndex] += 1;
		} else {
			wordObjects.push(new Word(currWord));
			words.push(currWord);
			wordCounts.push(1);
		}
	}
}

function compareCnt(a,b) {
	return a.cnt - b.cnt;
}

function printAnalysis() {
	$("#total-haikus").prepend("<h1>" + haikus.length + "</h1>");
	$("#total-words").prepend("<h1>" + wordObjects.length + "</h1>");
	$("#total-days").prepend("<h1>" + dates.length + "</h1>")
	$("#total-friends").prepend("<h1>" + friends.length + "</h1>");
}
