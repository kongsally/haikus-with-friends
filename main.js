var imgCnt;
var imgIndex;
var currentImg;
var haikus;
var words = [];
var wordCounts = [];
var wordObjects = [];
var totalWordCnt = 0;
var friends = [];

window.onload = initialize;

function initialize() {
	imgCnt = 1;
	Parse.initialize("aNDAZRLAojJH7aCQ0my1U0AxUBLVBlba6XhRlGa2", 
		"pcAOB3TF0npsLLUxM4BWr6gpt5cbYKGUoEqi2pls");

	var HaikuObject = Parse.Object.extend("Haiku");
	var query = new Parse.Query(HaikuObject);
	query.find({
		success : function(results) {
			haikus = results;
			populateHaikus();
			printAnalysis();
		}
	});

	// $.getJSON("Haikus.json", function(json) {
	// 	console.log(json.results);
	// 	haikus = json.results;
	// 	populateHaikus();
	// 	printAnalysis();
	// });
}

function populateHaikus() {
	for(var i = 0; i < haikus.length; i++) {
		$(".haiku-grid").append("<div class='mdl-cell mdl-card mdl-shadow--2dp'><div class='mdl-card__title mdl-card--expand'><h3 class='mdl-card__title-text'>" 
			+ haikus[i].get("haiku1").join(' ') + "<br>"
	    	+ haikus[i].get("haiku2").join(' ') + "<br>"
	    	+ haikus[i].get("haiku3").join(' ') + "<br>"
			+ "</h3></div><div class='mdl-card__supporting-text'>"
	    	+ "Sally & " + haikus[i].get("writers").join(' &')
	        + " @ " + haikus[i].get("place")
	    	+ "</div><div class='mdl-card__actions mdl-card--border'>"
	        + haikus[i].get("date") 
	    	+ "</div></div>");
		countWords(haikus[i]);
		countFriends(haikus[i]);
		totalWordCnt += haikus[i].get("wordCount");
	}
	wordObjects.sort(compareCnt);
	friends.sort(compareCnt);
}

function Word(word) {
	this.val = word;
	this.cnt = 1;
}

function Friend(name) {
	this.name = name;
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

function countFriends(haiku) {
	var writers = haiku.get("writers");
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

function countWords(haiku) {
	var haiku1 = haiku.get("haiku1");
	var haiku2 = haiku.get("haiku2");
	var haiku3 = haiku.get("haiku3");

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
	$(".analytics").append("<h4>Total words: " 
		+ totalWordCnt + "</h4>");
	$(".analytics").append("<h4>Total unique words: " 
		+ wordObjects.length + "</h4>");
	$(".analytics").append("<h4>Total friends: " 
		+ friends.length + "</h4>");
}
