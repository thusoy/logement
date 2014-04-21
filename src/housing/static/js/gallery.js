//here I code a Jquery gallery

$(document).ready(function() {
    
    photoContainer = $("#photoContainer");
    bigPhoto = photoContainer.children("img");
    thumbList = $("#thumbnails");
    thumbLinks = thumbList.find("a");
    thumbnails = thumbList.find("img");
    $("#thumbnail0").addClass("active");
    galleryButtons=$(".galleryButton");
    previousButton=$("#previousButton");
    nextButton=$("#nextButton");
    var $photoDescr=$("#photoDescr");

    loader = $(document.createElement("img")).attr({
	alt: "chargement en cours",
	title: "chargement en cours",
	src: STATIC_URL+"img/loader.gif",
	id: "loader"
    });

    previousButton.hide();
    galleryButtons.css("visibility", "hidden");
    $photoDescr.css("visibility", "hidden");
    if (numberphotos==1) {
        nextButton.hide();
    }
    else {
        $.cacheImage(photoRef[1]);                   
    }

    previousButton.hover(
        function(){this.src=STATIC_URL+"img/left-arrow.png";},
        function(){this.src=STATIC_URL+"img/left-arrow-transp.png";}
    );

    nextButton.hover(
        function(){this.src=STATIC_URL+"img/right-arrow.png";},
        function(){this.src=STATIC_URL+"img/right-arrow-transp.png";}
    );

    $("#sliderContainer").hover(
        function(){
	    galleryButtons.css("visibility", "visible");
	    $photoDescr.css("visibility", "visible");
	},
        function(){
	    galleryButtons.css("visibility", "hidden");
	    $photoDescr.css("visibility", "hidden");
	}
    );

});

function loadphoto(photoNumber){

    var target = photoRef[photoNumber];
    if (bigPhoto.attr("src") == target) return;

    current=photoNumber;
    scrollLevel=(photoNumber-4)*110;
    thumbnails.removeClass("active");
    $("#thumbnail"+photoNumber).addClass("active");

    /*bigPhoto.css("opacity",1);
    photoContainer.html(loader);
    bigPhoto.load(function(){
        photoContainer.html($(this).fadeIn(250, function(){
            photoContainer.append('<div id="photoDescr">'+photoDescr[photoNumber]+'</div>');}))
    }).attr("src",target).attr("alt",photoDescr[photoNumber]);*/
    
    photoContainer.html("");
    bigPhoto.load(function(){
        photoContainer.html($(this));
        photoContainer.append('<div id="photoDescr">'+photoDescr[photoNumber]+'</div>');
    }).attr("src",target).attr("alt",photoDescr[photoNumber]);

    if (photoNumber==0) {
        //previousButton.disabled=true;
        previousButton.hide();
    }
    else {
        //previousButton.disabled=false;
        previousButton.show();
        $.cacheImage(photoRef[photoNumber-1]);                   
    }
    
    if (photoNumber==numberphotos-1) {
        //nextButton.disabled=true;
        nextButton.hide();
    } 
    else {
        //nextButton.disabled=false;
        nextButton.show();
        $.cacheImage(photoRef[photoNumber+1]);                   
    }
}

var current=0;
var scrollLevel=-440;

function loadPrevious(){
    current--;
    loadphoto(current);

    scrollLevel-=110;
    thumbList.scrollLeft(scrollLevel);
}

function loadNext(){
    current++;
    loadphoto(current);

    scrollLevel+=110;
    thumbList.scrollLeft(scrollLevel);
}

