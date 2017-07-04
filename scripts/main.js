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

// Display posts from Medium
$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/@kaseycolleen'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
      var posts = $.map(response.items, function(post, i) {
        var postCategories = response.items[i].categories
        if(postCategories.length !== 0 ) {
          return post;
        }
      });

			$.each(posts, function (k, item) {
				var visibleSm;
				if(k < 4){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
          output += '<div class="row blog-row' + visibleSm + '">';
  				output += '<div class="blog-post">';
          output += '<div class="blog-content"><div class="post-title"><a href="'+ item.link + '" target="_blank">' + item.title + '</a></div>';
  				var yourString = item.description.replace(/<img[^>]*>/g,"");
  				var maxLength = 120
  				var trimmedString = yourString.substr(0, maxLength);
  				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  				output += '<p>' + trimmedString + '...</p>';
  				output += '</div></div></div>';
  				return k < 4;
			});
			$content.html(output);
		}
	});
});
