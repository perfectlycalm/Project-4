// Global Variables

	var searchString = "";


// Functions

	// Initialize lightbox
	function initializeLightbox (){
		$('a[data-rel^=lightcase]').lightcase({});
	}

	// Appends all images to the document for which show is true
	function loadGallery (gallery) {
		
		for (var i=0; i<gallery.length; i+=1) {
			
			var image = gallery[i].thumbnail;
			var title = gallery[i].title;
			var caption = gallery[i].caption;
			var show = gallery[i].show;
			var linktoFullSize = gallery[i].fullSize;

			if (show) {
				$('#gallery').append('<li><a href="' + linktoFullSize + '"' + 
					'data-rel="lightcase:myCollection"' +
					'title="' + caption + '">' +
					'<img src="' + image + '"></a>' + 
					'<h2>' + title + '</h2>' +
					'<p>' + caption + '</p></li>');
			}
		}
	}

	// Clears all images and messages from the document and sets all show fields to false
	function clearGallery (gallery) {

		$('#gallery li').remove();
		$('#no-match').remove();	

		for (var i=0; i<gallery.length; i+=1) {
			gallery[i].show = false;
		}

	}

	// Iterates through the gallery captions and sets show to true if the user's input matches
	// any text in the caption.  Inform the user if there are no matches
	function searchGallery (gallery) {

		var searchCounter = 0;

		for (var i=0; i<gallery.length; i+=1) {
			if (gallery[i].caption.toLowerCase().indexOf(searchString) >= 0) {
				gallery[i].show = true;
				searchCounter += 1;
			}
		}

		if (searchCounter === 0) {
			$('#main-container').append('<h2 id="no-match">Sorry, there are no matches</h2>');
		}
	}

	// Clears current search results from the document, sets input field to blank, 
	//   sets all show fields to true and loads the gallery
	function resetGallery (gallery) {

		clearGallery(imageGallery);

		$('#search-field').val("");

		for (var i=0; i<gallery.length; i+=1) {
			gallery[i].show = true;
		}

		loadGallery(imageGallery);
		initializeLightbox();
	}


// Event Listeners

	// When user inputs text into the search field, clear the gallery, search for a match
	//   and load the results
	$('#search-field').keyup(function(){
		clearGallery(imageGallery);
		searchString = $('#search-field').val().toLowerCase();
		searchGallery(imageGallery);
		loadGallery(imageGallery);
		initializeLightbox();
	});

	// When user clicks the reset button, restore the original gallery
	$('button').click(function(){	
		resetGallery(imageGallery);
	});
	
	// Hide the lightbox when the browser window is reduced to less than 640px
	$(window).resize(function(){
		if ($(window).width() < 640) {
			$('html').removeClass('lightcase-open');
		}
	});


// Initialize gallery
loadGallery(imageGallery);

// Initialize lightbox
initializeLightbox();
	