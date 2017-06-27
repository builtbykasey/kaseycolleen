// If user scrolls, change transparent menus to default menus

var $document = $(document),
    $element = $('.navbar'),
    navbarDefault = 'navbar-default';
    navbarTransparent = 'navbar-transparent';

    fadeInDown = 'fadeInDown';

$document.scroll(function() {
  if ($document.scrollTop() >= 100) {
    //user scrolled more than 100 pixels
    $element.addClass(navbarDefault);
    $element.removeClass(navbarTransparent);

    $element.addClass(fadeInDown);
  } else {
    $element.addClass(navbarTransparent);
    $element.removeClass(navbarDefault);

    $element.removeClass(fadeInDown);
  }
});

$document.ready(function() {

});

$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/@kaseycolleen'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';

			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 10){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
        var postCategories = item.categories
        if(postCategories.length === 0 || postCategories === null || postCategories === undefined) {
        } else {
          output += '<div class="row blog-row' + visibleSm + '">';
  				output += '<div class="blog-post">';
  				// output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";

          //Image Find and Output
  				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
  				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
  				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
  				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
  				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
  				// output += '<div class="col-md-4"><div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></div>';


          output += '<div class="blog-content"><div class="post-title"><a href="'+ item.link + '" target="_blank">' + item.title + '</a></div>';
          // output += '<div class="post-author">By ' + item.author + '</div>';
  				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
  				var maxLength = 120 // maximum number of characters to extract
  				//trim the string to the maximum length
  				var trimmedString = yourString.substr(0, maxLength);
  				//re-trim if we are in the middle of a word
  				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  				output += '<p>' + trimmedString + '...</p>';
          // output += '<p class="read-more"><a href="'+ item.link + '" target="_blank">Read More</a></p>'
  				output += '</div></div></div>';
  				return k < 10;
        }
			});
			$content.html(output);

		}
	});
});
