
// arrays of photos..
var photo = new Array();
photo[0]  = "photos/d001-domestic-landscaping.jpg";
photo[1]  = "photos/d002-domestic-landscaping.jpg";
photo[2]  = "photos/d003-domestic-landscaping.jpg";
photo[3]  = "photos/d004-domestic-landscaping.jpg";
photo[4]  = "photos/d005-domestic-landscaping.jpg";
photo[5]  = "photos/d006-domestic-landscaping.jpg";
photo[6]  = "photos/d007-domestic-landscaping.jpg";
photo[7]  = "photos/d008-domestic-landscaping.jpg";
photo[8]  = "photos/d009-domestic-landscaping.jpg";
photo[9]  = "photos/d010-domestic-landscaping.jpg";
photo[10] = "photos/d011-domestic-landscaping.jpg";
photo[11] = "photos/d012-domestic-landscaping.jpg";
photo[12] = "photos/d013-domestic-landscaping.jpg";
photo[13] = "photos/d014-domestic-landscaping.jpg";
photo[14] = "photos/d015-domestic-landscaping.jpg";
photo[15] = "photos/d016-domestic-landscaping.jpg";
photo[16] = "photos/d017-domestic-landscaping.jpg";
photo[17] = "photos/d018-domestic-landscaping.jpg";
photo[18] = "photos/d019-domestic-landscaping.jpg";

var photo_tn = new Array();
photo_tn[0]  = "photos/d001-domestic-landscaping-tn.png";
photo_tn[1]  = "photos/d002-domestic-landscaping-tn.png";
photo_tn[2]  = "photos/d003-domestic-landscaping-tn.png";
photo_tn[3]  = "photos/d004-domestic-landscaping-tn.png";
photo_tn[4]  = "photos/d005-domestic-landscaping-tn.png";
photo_tn[5]  = "photos/d006-domestic-landscaping-tn.png";
photo_tn[6]  = "photos/d007-domestic-landscaping-tn.png";
photo_tn[7]  = "photos/d008-domestic-landscaping-tn.png";
photo_tn[8]  = "photos/d009-domestic-landscaping-tn.png";
photo_tn[9]  = "photos/d010-domestic-landscaping-tn.png";
photo_tn[10] = "photos/d011-domestic-landscaping-tn.png";
photo_tn[11] = "photos/d012-domestic-landscaping-tn.png";
photo_tn[12] = "photos/d013-domestic-landscaping-tn.png";
photo_tn[13] = "photos/d014-domestic-landscaping-tn.png";
photo_tn[14] = "photos/d015-domestic-landscaping-tn.png";
photo_tn[15] = "photos/d016-domestic-landscaping-tn.png";
photo_tn[16] = "photos/d017-domestic-landscaping-tn.png";
photo_tn[17] = "photos/d018-domestic-landscaping-tn.png";
photo_tn[18] = "photos/d019-domestic-landscaping-tn.png";

var photo_tn_category = new Array();
photo_tn_category[0] = "paving";
photo_tn_category[1] = "brickwork";
photo_tn_category[2] = "paving";
photo_tn_category[3] = "paving";
photo_tn_category[4] = "turfing";
photo_tn_category[5] = "fencing";
photo_tn_category[6] = "fencing";
photo_tn_category[7] = "paving";
photo_tn_category[8] = "brickwork";
photo_tn_category[9] = "planting";
photo_tn_category[10] = "paving";
photo_tn_category[11] = "paving";
photo_tn_category[12] = "fencing";
photo_tn_category[13] = "waterfeatures";
photo_tn_category[14] = "planting";
photo_tn_category[15] = "design";
photo_tn_category[16] = "paving";
photo_tn_category[17] = "paving";
photo_tn_category[18] = "brickwork";

var photoCommercial = new Array();
photoCommercial[0] = "photos/c001-commercial-landscaping.jpg";
photoCommercial[1] = "photos/c002-commercial-landscaping.jpg";
photoCommercial[2] = "photos/c003-commercial-landscaping.jpg";
photoCommercial[3] = "photos/c004-commercial-landscaping.jpg";

var photoCommercial_tn = new Array();
photoCommercial_tn[0] = "photos/c001-commercial-landscaping-tn.png";
photoCommercial_tn[1] = "photos/c002-commercial-landscaping-tn.png";
photoCommercial_tn[2] = "photos/c003-commercial-landscaping-tn.png";
photoCommercial_tn[3] = "photos/c004-commercial-landscaping-tn.png";

var photoCommercial_keyword = new Array();	// not used yet..
photoCommercial_keyword[0] = "paving,planting";
photoCommercial_keyword[1] = "planting";
photoCommercial_keyword[2] = "fencing,planting";
photoCommercial_keyword[3] = "planting";

var nextPhotoTimer = 11000; // milliseconds
var nextPhotoFadeTimer = 1500; // milliseconds

var currDomesticPhoto = 0;
var nextDomesticPhoto = 1;
var currCommercialPhoto = 0;
var nextCommercialPhoto = 1;

var intervalId;

$(document).ready(function () {
	
	// load the first domestic image..
	var img = new Image();
	
	// wrap the image in jQuery, then:
	$(img)
		// once the image has loaded, do the following:
		.load(function () {
			// hide it to start with
			$(this).hide();
			// insert it into the page (don't set the src yet..)
			//$(".photo").html("<img id='photo-" + currDomesticPhoto + "' style='z-index:" + currDomesticPhoto + ";' />");
			$(".photo").append(this);
			
			$(this).attr("id", "photo-" + currDomesticPhoto);
			$(this).attr("style", "z-index:" + currDomesticPhoto);

			// fade it in..
			$(this).fadeTo(nextPhotoFadeTimer, 1);
		})
		.error(function () {
			// handle error
		})
		// finally, set the src to trigger the load
		.attr('src', photo[currDomesticPhoto]);

		
	GenerateThumbs();
	
	// activate the first thumbnail
	$("#photothumb-" + currDomesticPhoto).addClass("thumb-active");
	
	// set off the slideshow timer
	intervalId = setInterval( "LoadNextDomesticPhoto()", nextPhotoTimer );
	
	
	// handle domestic / commercial clicking
	$("#btnCommercial").click(function(e) {
		e.preventDefault();
		
		$("#domestic").hide();
		$("#commercial").show();
		
		loadingCommercialPhoto = false;
		
		// Stop the domestic slideshow
		clearInterval(intervalId);
		
		// if this is the first commercial click, we need to load the first commercial image..
		if ( $(".photo-commercial").html().length == 0 ) {
			var img = new Image();
			
			// wrap the image in jQuery, then:
			$(img)
				// once the image has loaded, do the following:
				.load(function () {
					// hide it to start with
					$(this).hide();
					// insert it into the page (don't set the src yet..)
					//$(".photo-commercial").html("<img id='photo-" + currCommercialPhoto + "' style='z-index:" + currCommercialPhoto + ";' />");
					$(".photo-commercial").append(this);
					
					$(this).attr("id", "photo-commercial-" + currCommercialPhoto);
					$(this).attr("style", "z-index:" + currCommercialPhoto);

					// fade it in..
					$(this).fadeTo(nextPhotoFadeTimer, 1);
				})
				.error(function () {
					// handle error
				})
				// finally, set the src to trigger the load
				.attr('src', photoCommercial[currCommercialPhoto]);
			
			// activate the first commercial thumbnail..
			$("#photothumb-commercial-" + currCommercialPhoto).addClass("thumb-active");
		}
		
		// set the slideshow to show the commercial images..
		intervalId = setInterval( "LoadNextCommercialPhoto()", nextPhotoTimer );
		
	});
	$("#btnDomestic").click(function(e) {
		e.preventDefault();
		
		$("#commercial").hide();
		$("#domestic").show();
		
		loadingDomesticPhoto = false;
		
		// swap the slideshow back to domestic images..
		clearInterval(intervalId);
		intervalId = setInterval( "LoadNextDomesticPhoto()", nextPhotoTimer );
	});
	
	
	
	// handle thumbnail clicking
	$(".thumb").click(function(e) {
		if (!loadingDomesticPhoto) {
			e.preventDefault();
			
			// stop the slideshow..
			clearInterval(intervalId);
			
			// get the id of the clicked thumb..
			var tId = $(this).attr("id");
			tId = tId.split('').reverse().join('');
			tId = tId.substring(0, tId.indexOf("-"));
			tId = tId.split('').reverse().join('');
			
			if (tId != currDomesticPhoto) {
				// set the nextDomesticPhoto to this id, and call LoadNextDomesticPhoto()..
				nextDomesticPhoto = tId;
				LoadNextDomesticPhoto();
			}
		}
	});
	
	// handle thumbnail clicking
	$(".thumb-commercial").click(function(e) {
		if (!loadingCommercialPhoto) {
			e.preventDefault();
			
			// stop the slideshow..
			clearInterval(intervalId);
			
			// get the id of the clicked thumb..
			var tId = $(this).attr("id");
			tId = tId.split('').reverse().join('');
			tId = tId.substring(0, tId.indexOf("-"));
			tId = tId.split('').reverse().join('');
			
			if (tId != currCommercialPhoto) {
				// set the NextCommercialPhoto to this id, and call LoadNextCommercialPhoto()..
				nextCommercialPhoto = tId;
				LoadNextCommercialPhoto();
			}
		}
	});
	
	
	konami = new Konami();
	konami.code = function() {
		// stop the slideshow, then load in the easter egg photo!
		clearInterval(intervalId);
		
		var img = new Image();
		
		// wrap the image in jQuery, then:
		$(img)
			// once the image has loaded, do the following:
			.load(function () {
				// hide it to start with
				$(this).hide();
				// insert it into the page (don't set the src yet..)
				//$(".photo").html($(".photo").html() + "<img id='photo-" + nextDomesticPhoto + "' style='display:none;z-index:" + nextDomesticPhoto + ";' />");
				$(".photo").append(this);
				
				$(this).attr("id", "photo-99999");
				$(this).attr("style", "display:none;z-index:99999");
				
				// make sure the next photo is at the same location as the current one..
				var p = $("#photo-" + currDomesticPhoto).position();
				$(this).css( { "left": + p.left + "px", "top": + p.top + "px" } );
				
				// fade in the next photo, then hide the current one..
				$("#photo-99999").fadeTo(nextPhotoFadeTimer, 1, function() { $("#photo-" + currDomesticPhoto).hide(); } );
			})
			.error(function () {
				// handle error
			})
			
			// finally, set the src to trigger the load
			.attr('src', 'photos/konami-easter-egg.jpg');
		
	}

	konami.load();
	
});

function GenerateThumbs() {

	// domestic
	for (i=0;i<photo_tn_category.length;i++) {
		$("#thumbs-" + photo_tn_category[i]).html($("#thumbs-" + photo_tn_category[i]).html() + 
			"<a href='#'><img id='photothumb-" + i + "' class='thumb' src='" + photo_tn[i] + "' /></a>"
			);
	
	
	}
	
	// commercial
	//  (we're not using keywords yet, so just put all thumbs in the same place)
	for (i=0;i<photoCommercial_tn.length;i++) {
		$("#thumbs-commercial").html($("#thumbs-commercial").html() +
			"<a href='#'><img id='photothumb-commercial-" + i + "' class='thumb-commercial' src='" + photoCommercial_tn[i] + "' /></a>"
			);
	}
	
}


var loadingDomesticPhoto = false;
function LoadNextDomesticPhoto() {
	
	loadingDomesticPhoto = true;
	
	// have we already loaded the next image?
	if ( !$("#photo-" + nextDomesticPhoto).length ) {
		// no - load it..
		//$(".photo").html($(".photo").html() + "<img id='photo-" + nextDomesticPhoto + "' src='" + photo[nextDomesticPhoto] + "' style='display:none;z-index:" + nextDomesticPhoto + ";' />");
		
		var img = new Image();
		
		// wrap the image in jQuery, then:
		$(img)
			// once the image has loaded, do the following:
			.load(function () {
				// hide it to start with
				$(this).hide();
				// insert it into the page (don't set the src yet..)
				//$(".photo").html($(".photo").html() + "<img id='photo-" + nextDomesticPhoto + "' style='display:none;z-index:" + nextDomesticPhoto + ";' />");
				$(".photo").append(this);
				
				$(this).attr("id", "photo-" + nextDomesticPhoto);
				$(this).attr("style", "display:none;z-index:" + nextDomesticPhoto);
				
				// make sure the next photo is at the same location as the current one..
				var p = $("#photo-" + currDomesticPhoto).position();
				$(this).css( { "left": + p.left + "px", "top": + p.top + "px" } );
				
				// which image are we fading?
				if ( parseInt(currDomesticPhoto) > parseInt(nextDomesticPhoto) ) {
					// show the next photo then fade out the current one
					$("#photo-" + nextDomesticPhoto).show();
					$("#photo-" + currDomesticPhoto).fadeTo(nextPhotoFadeTimer, 0, function() { IncrementDomesticPhotoPointers(); } );
				}
				else {
					// fade in the next photo, then hide the current one..
					$("#photo-" + nextDomesticPhoto).fadeTo(nextPhotoFadeTimer, 1, function() { $("#photo-" + currDomesticPhoto).hide(); IncrementDomesticPhotoPointers(); } );
				}

			})
			.error(function () {
				// handle error
			})
			
			// finally, set the src to trigger the load
			.attr('src', photo[nextDomesticPhoto]);
	
	}
	else {
		// which image are we fading?
		if ( parseInt(currDomesticPhoto) > parseInt(nextDomesticPhoto) ) {
			// show the next photo then fade out the current one
			$("#photo-" + nextDomesticPhoto).show();
			$("#photo-" + currDomesticPhoto).fadeTo(nextPhotoFadeTimer, 0, function() { IncrementDomesticPhotoPointers(); } );
		}
		else {
			// fade in the next photo, then hide the current one..
			$("#photo-" + nextDomesticPhoto).fadeTo(nextPhotoFadeTimer, 1, function() { $("#photo-" + currDomesticPhoto).hide(); IncrementDomesticPhotoPointers(); } );
		}
	}
}

function IncrementDomesticPhotoPointers() {
	
	// also update the thumbnail highlight..
	$("#photothumb-" + currDomesticPhoto).removeClass("thumb-active");
	$("#photothumb-" + nextDomesticPhoto).addClass("thumb-active");
	
	currDomesticPhoto = nextDomesticPhoto;
	nextDomesticPhoto++;
	if ( nextDomesticPhoto >= photo.length ) { nextDomesticPhoto = 0; }
	
	loadingDomesticPhoto = false;
}


var loadingCommercialPhoto = false;
function LoadNextCommercialPhoto() {
	
	loadingCommercialPhoto = true;
	
	// have we already loaded the next image?
	if ( !$("#photo-commercial-" + nextCommercialPhoto).length ) {
		// no - load it..
		//$(".photo-commercial").html($(".photo-commercial").html() + "<img id='photo-commercial-" + nextCommercialPhoto + "' src='" + photoCommercial[nextCommercialPhoto] + "' style='display:none;z-index:" + nextCommercialPhoto + ";' />");
		
		var img = new Image();
		
		// wrap the image in jQuery, then:
		$(img)
			// once the image has loaded, do the following:
			.load(function () {
				// hide it to start with
				$(this).hide();
				// insert it into the page (don't set the src yet..)
				//$(".photo-commercial").html($(".photo-commercial").html() + "<img id='photo-commercial-" + nextCommercialPhoto + "' style='display:none;z-index:" + nextCommercialPhoto + ";' />");
				$(".photo-commercial").append(this);
				
				$(this).attr("id", "photo-commercial-" + nextCommercialPhoto);
				$(this).attr("style", "display:none;z-index:" + nextCommercialPhoto);
				
				// make sure the next photo is at the same location as the current one..
				var p = $("#photo-commercial-" + currCommercialPhoto).position();
				$(this).css( { "left": + p.left + "px", "top": + p.top + "px" } );
				
				// which image are we fading?
				if ( parseInt(currCommercialPhoto) > parseInt(nextCommercialPhoto) ) {
					// show the next photo then fade out the current one
					$("#photo-commercial-" + nextCommercialPhoto).show();
					$("#photo-commercial-" + currCommercialPhoto).fadeTo(nextPhotoFadeTimer, 0, function() { IncrementCommercialPhotoPointers(); } );
				}
				else {
					// fade in the next photo, then hide the current one..
					$("#photo-commercial-" + nextCommercialPhoto).fadeTo(nextPhotoFadeTimer, 1, function() { $("#photo-commercial-" + currCommercialPhoto).hide(); IncrementCommercialPhotoPointers(); } );
				}

			})
			.error(function () {
				// handle error
			})
			
			// finally, set the src to trigger the load
			.attr('src', photoCommercial[nextCommercialPhoto]);
	
	}
	else {
		// which image are we fading?
		if ( parseInt(currCommercialPhoto) > parseInt(nextCommercialPhoto) ) {
			// show the next photo then fade out the current one
			$("#photo-commercial-" + nextCommercialPhoto).show();
			$("#photo-commercial-" + currCommercialPhoto).fadeTo(nextPhotoFadeTimer, 0, function() { IncrementCommercialPhotoPointers(); } );
		}
		else {
			// fade in the next photo, then hide the current one..
			$("#photo-commercial-" + nextCommercialPhoto).fadeTo(nextPhotoFadeTimer, 1, function() { $("#photo-commercial-" + currCommercialPhoto).hide(); IncrementCommercialPhotoPointers(); } );
		}
	}
}

function IncrementCommercialPhotoPointers() {
	
	// also update the thumbnail highlight..
	$("#photothumb-commercial-" + currCommercialPhoto).removeClass("thumb-active");
	$("#photothumb-commercial-" + nextCommercialPhoto).addClass("thumb-active");
	
	currCommercialPhoto = nextCommercialPhoto;
	nextCommercialPhoto++;
	if ( nextCommercialPhoto >= photoCommercial.length ) { nextCommercialPhoto = 0; }
	
	loadingCommercialPhoto = false;
}

