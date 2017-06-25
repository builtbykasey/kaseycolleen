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
