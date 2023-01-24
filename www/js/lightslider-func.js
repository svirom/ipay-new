$(document).ready(function() {

  // slider
  let sliderOptions = {
    item: 2,
    loop: true,
    auto: true,
    pauseOnHover: true,
    slideMove: 1,
    slideMargin: 30,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    // controls: false,
		// pager: false,
    // auto: true,
    pause: 4000,
    // adaptiveHeight: true,
    responsive : [
      {
        breakpoint: 991,
        settings: {
          item: 1,
          // slideMove: 1,
          slideMargin: 30,
        }
      },
      // {
      //   breakpoint: 767,
      //   settings: {
      //     item: 2,
      //     slideMargin: 14,
      //     // slideMove: 1
      //   }
      // }
    ],

    onSliderLoad: function (el) {
      // let height = $(el).find('.lslide').height();
      let height = [];

      $(el).find('.lslide').each(function(index) {
        height.push($(this).height());
      });
      console.log(height, Math.max(...height));

      $('.content-slider').height(Math.max(...height));
    },
  };

  var slider = $('.content-slider').lightSlider(sliderOptions);

  $(document).resize(function() {
    $('.content-slider').lightSlider(sliderOptions);
  })

  // invoice slider
  // var invoiceSlider = $('.invoice-slider').lightSlider({
  //   item: 1,
  //   loop: true,
  //   slideMove: 1,
  //   slideMargin: 30,
  //   easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
  //   speed: 600,
	// 	pager: false,
    
  //   onSliderLoad: function(el) {  
	// 	  var slideCount = $(el).find('.lslide').length;

  //     $('#items-amount').text(slideCount);
  //     $('#current-item-number').text('1');

  //     $(el).find('.slider-card').on('click', function() {
  //       var currImage = $(this).find('img').attr('src');

  //       $('#invoice-modal').find('.modal-body img').attr('src', currImage);
  //     })

  //     $('#invoice-modal').on('hidden.bs.modal', function() {
  //       $(this).find('.modal-body img').attr('src', '');
  //     })
  //   },

  //   onBeforeSlide: function() {
  //     var currSlide = invoiceSlider.getCurrentSlideCount();

  //     $('#current-item-number').text(currSlide);
  //   },
  // });

})