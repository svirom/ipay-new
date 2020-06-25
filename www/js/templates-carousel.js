$(document).ready(function() {

	var slider = $(".templates-carousel__slider").lightSlider({
		item: 2,
		loop: true,
		slideMove: 1,
		speed: 600,
		useCSS: true,
		slideMargin: 0,
		galleryMargin: 20,
		controls: false,
		pager: false,
		responsive : [
			{
				breakpoint: 992,
				settings: {
					pager: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					item: 1,
					slideMove: 1,
					slideMargin: 6,
					pager: true
				}
			}
		]
	})

	$('.prev-slide').on('click', function(e) {
		e.preventDefault();
		slider.goToPrevSlide();
	})

	$('.next-slide').on('click', function(e) {
		e.preventDefault();
		slider.goToNextSlide();
	})

});
