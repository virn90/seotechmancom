function IframelazyLoad() {
$('iframe').each(function() {
var frame = $(this),
vidSource = $(frame).attr('src'),
distance = $(frame).offset().top - $(window).scrollTop(),
distTopBot = window.innerHeight - distance,
distBotTop = distance + $(frame).height();
if (distTopBot >= 0 && distBotTop >= 0) {
$(frame).attr('src', vidSource);
$(frame).removeAttr('src');
}
});
}
var app = function () {
		var body = undefined;
		var menu = undefined;
		var menuItems = undefined;
		var init = function init() {
			body = document.querySelector('body');
			menu = document.querySelector('.menu-bar');
			menuItems = document.querySelectorAll('li');
			applyListeners();
		};
var applyListeners = function applyListeners() {
			menu.addEventListener('click', function () {
				return toggleClass(body, 'nav-active');
			});
		};
var toggleClass = function toggleClass(element, stringClass) {
			if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
		};
		init();
	}();
;(function($, window, document, undefined) {  
  'use strict'; 
	var $html = $('html');  
  $html.on('click.ui.dropdown', '.js-dropdown', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-open');
  });
  $html.on('click.ui.dropdown', '.js-dropdown [data-dropdown-value]', function(e) {
    e.preventDefault();
    var $item = $(this);
    var $dropdown = $item.parents('.js-dropdown');
    $dropdown.find('.js-dropdown__input').val($item.data('dropdown-value'));
    $dropdown.find('.js-dropdown__current').text($item.text());
  });
  $html.on('click.ui.dropdown', function(e) {
    var $target = $(e.target);
    if (!$target.parents().hasClass('js-dropdown')) {
      $('.js-dropdown').removeClass('is-open');
    }
  });
  
})(jQuery, window, document);
