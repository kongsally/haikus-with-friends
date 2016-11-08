
window.onload = populateImages;

function populateImages() {
	for(var i = 1; i < 60; i++) {
		$(".img-grid").append("<div class='mdl-cell img-card mdl-card mdl-shadow--2dp'>"
			+ "<div class='mdl-card__title mdl-card--expand'>"
			+ "<img class='haiku-img' src='" 
			+ "Photos/" + i + ".jpg'>" 
	    	+ "</div></div>");
	}
}

