$(document).ready(function() {

  var $window = $(window);
  var $animatedItem = $(".has-animation");

  $(document).scroll(function() {

    $animatedItem.each(function (animated_index) {

      var windowTop = $window.scrollTop();
      var windowHeight = $window.height();
      var windowBottom = windowTop + windowHeight;

      var $element = $(this);
      var elementTop = $element.offset().top;
      var elementHeight = $element.outerHeight();
      var elementBottom = elementTop + elementHeight;

      // if ( ((elementTop + (elementHeight / 2) ) < (windowTop + windowHeight) ) && $(this).hasClass('has-animation') ) {
      if ( (windowTop > elementTop - windowHeight / 1.2) && $element.hasClass('has-animation') ) {
        // if (elementBottom >= windowTop && elementTop <= windowBottom) {
          $element.prop('Counter',0).animate({
            Counter: $element.data('amount')
          }, {
            duration: 1500,
            easing: 'linear',
            step: function (now) {
              if ($element.hasClass('statistics-card')) {
                $element.find('.statistics-card__amount').text(Math.ceil(now));
              }

              if ($element.hasClass('progress-card')) {
                $element.find('.progress-wrapper > span').text(Math.ceil(now) + '%');
                // $element.find('.progress-bar').css('width', Math.ceil(now) + '%').attr('aria-valuenow', Math.ceil(now) + '%');
              }

              if ($element.hasClass('statistics-templates__amount')) {
                $element.find('> span:first-child').text(Math.ceil(now));
              }

              if ($element.hasClass('statistics-rank')) {
                $element.find('h2 > span').text(Math.ceil(now));
              }
            },
            complete: function() {
              $element.removeClass('has-animation');
              $element.stop();
            },
          });
        // }

        $element.find('.progress-bar').css('width', $element.data('amount') + '%').attr('aria-valuenow', $element.data('amount') + '%');
      }
      
    });
  });

  // $(document).trigger("scroll");

  $( document ).triggerHandler("scroll");

})