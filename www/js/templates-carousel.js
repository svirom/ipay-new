$(document).ready(function() {

	/* $('#templates-carousel').carousel({
		interval: false,
	});
	
	$('.carousel .carousel-item').each(function() {
		var minPerSlide = 1;
		var next = $(this).next();
		if (!next.length) {
			next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
	
		for (var i = 0; i < minPerSlide; i++) {
			next = next.next();
			if (!next.length) {
				next = $(this).siblings(':first');
			}
	
			next.children(':first-child').clone().appendTo($(this));
		}
	}); */

	$(".templates-slider").lightSlider({
		item: 2,
		loop: true,
		slideMove: 1,
		speed: 600,
		useCSS: true,
		slideMargin: 0,
		galleryMargin: 20,
		responsive : [
			{
				breakpoint: 992,
				settings: {
					item: 1,
					slideMove: 1,
					slideMargin: 6,
				}
			}
		]
	}); 

});
