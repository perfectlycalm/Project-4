// Global Variables

	var searchString = "";



// Functions

	// Appends all images to the document for which show is true
	function loadGallery (gallery) {
		
		for (var i=0; i<gallery.length; i+=1) {
			
			var image = gallery[i].thumbnail;
			var title = gallery[i].title;
			var caption = gallery[i].caption;
			var show = gallery[i].show;
			var linktoFullSize = gallery[i].fullSize;
			var lightboxIdentifier = 'image-' + i+1;

			if (show) {
				$('#gallery').append('<li><a href="' + linktoFullSize + '"' + 
					'data-lightbox="' + lightboxIdentifier + '"' +
					'data-title="' + caption + '">' +
					'<img src="' + image + '"></a>' + 
					'<h2>' + title + '</h2>' +
					'<p>' + caption + '</p></li>');
			}
		}
	};


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
	};


	



// Event Listeners

	// When user inputs text into the search field, clear the gallery, search for a match
	//   and load the results
	$('#search-field').keyup(function(){
		clearGallery(imageGallery);
		searchString = $('#search-field').val().toLowerCase();
		searchGallery(imageGallery);
		loadGallery(imageGallery);
	});

	
	// When user leaves the input field, restore the original gallery
	// $('#search-field').blur(function(){	
	// 	resetGallery(imageGallery);
	// });

	// When user clicks the reset button, restore the original gallery
	$('button').click(function(){	
		resetGallery(imageGallery);
	});






loadGallery(imageGallery);


lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'alwaysShowNavOnTouchDevices': true
});

// If mobile, disable lightbox


// If desktop, enable lightbox	