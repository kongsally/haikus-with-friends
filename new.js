var imgCnt;
var imgIndex;
var currentImg;
var images;
window.onload = initialize;


function initialize() {
	imgCnt = 1;
	Parse.initialize("aNDAZRLAojJH7aCQ0my1U0AxUBLVBlba6XhRlGa2", 
		"pcAOB3TF0npsLLUxM4BWr6gpt5cbYKGUoEqi2pls");

	var ImageObject = Parse.Object.extend("Image");
	var query = new Parse.Query(ImageObject);
	query.find({
		success : function(results) {
			images = results;
			imgCnt = images.length;
			getImage();
		}
	});
}

function getImage() {

	var ImageObject = Parse.Object.extend("Image");
	currentImg = new ImageObject();
	console.log(images);
	if(imgCnt > 0) {
		if(images[imgCnt-1].get("done")) {
			imgCnt += 1;
		} else {
			currentImg = images[imgCnt-1];
			console.log("w");
		}
	}
	imgIndex = imgCnt-1;
	$("#haiku-img").attr("src", "Photos/" + imgCnt + ".jpg");
	currentImg.set("fileName", imgCnt + ".jpg");
	currentImg.save();
}

function updateImage() {
	currentImg.set("done", true);
	currentImg.save();
	images.push(currentImg);
	getImage();
}

function prevImage() {
	imgIndex--;
	$("#haiku-img").attr("src", "Photos/" + imgIndex + ".jpg");
}

function nextImage() {
	imgIndex++;
	$("#haiku-img").attr("src", "Photos/" + imgIndex + ".jpg");
}

function clearHaiku() {
	$("#Haiku-1").val("");
	$("#Haiku-2").val("");
	$("#Haiku-3").val("");
}

function saveHaiku() {
	var HaikuObject = Parse.Object.extend("Haiku");
	var haiku = new HaikuObject();
	var haiku1 = $("#Haiku-1").val().split(" ");
	var haiku2 = $("#Haiku-2").val().split(" ");
	var haiku3 = $("#Haiku-3").val().split(" ");
	haiku.set("date", $("#Date").val());
	haiku.set("place", $("#Place").val());
	haiku.set("writers", $("#With").val().split(","));
	haiku.set("haiku1", haiku1);
	haiku.set("haiku2", haiku2);
	haiku.set("haiku3", haiku3);
	haiku.set("wordCount", haiku1.length + haiku2.length + haiku3.length);
	haiku.set("image", currentImg);

	haiku.save().then(function(object) {
	  clearHaiku();
	});
	
}



