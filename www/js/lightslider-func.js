$(document).ready(function() {

  let heightMeasurement = function() {
    let heightSlider = [];

    $('.content-slider').find('li').each(function(index) {
      heightSlider.push($(this).outerHeight());
    });
    // console.log(heightSlider, Math.max(...heightSlider));
  
    $('.content-slider').outerHeight(Math.max(...heightSlider));
  }

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
    pause: 4000,
    responsive : [
      {
        breakpoint: 991,
        settings: {
          item: 1,
          // slideMove: 1,
          slideMargin: 30,
        }
      }
    ],

    onSliderLoad: function (el) {
      heightMeasurement();
    },
  };

  $('.content-slider').lightSlider(sliderOptions);

  $(document).resize(function() {
    heightMeasurement();
  })

})