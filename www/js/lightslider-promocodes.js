$(document).ready(function() {

  let heightMeasurement = function() {
    let heightSlider = [];
    // let heightSlider2 = [];

    $('.awards-slider').children().each(function(index) {
      heightSlider.push($(this).outerHeight());
      // heightSlider2.push($(this).offsetHeight);
    });
    console.log(heightSlider, Math.max(...heightSlider), $('.awards-slider').outerHeight());
    // console.log(heightSlider2, Math.max(...heightSlider2));
  
    // $('.awards-slider').outerHeight(Math.max(...heightSlider2));
    $('.awards-slider').css('height', Math.max(...heightSlider));
  }

  // heightMeasurement();

  // slider
  let sliderOptions = {
    item: 1,
    loop: true,
    // auto: true,
    auto: false,
    mode: 'fade',
    adaptiveHeight: true,
    pauseOnHover: true,
    slideMove: 1,
    slideMargin: 30,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    // controls: false,
		// pager: false,
    pause: 4000,
    // responsive : [
    //   {
    //     breakpoint: 991,
    //     settings: {
    //       item: 1,
    //       // slideMove: 1,
    //       slideMargin: 30,
    //     }
    //   }
    // ],

    onSliderLoad: function (el) {
      heightMeasurement();
      // var maxHeight = 0,
      //   container = $(el),
      //   children = container.children();
      // children.each(function () {
      //   var childHeight = $(this).height();
      //   if (childHeight > maxHeight) {
      //     maxHeight = childHeight;
      //   }
      // });
      // container.height(maxHeight);
    },
  };

  $('.promocodes-slider').lightSlider(sliderOptions);

  $(document).resize(function() {
    heightMeasurement();
  })

})