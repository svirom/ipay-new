window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}

$(document).ready(function() {
	const parallaxEls = document.querySelectorAll("[data-speed]");
 
	window.addEventListener("scroll", scrollHandler);
	
	function scrollHandler() {
		for (const parallaxEl of parallaxEls) {
			const transformY = this.pageYOffset * parallaxEl.dataset.speed;
			const transformX = this.pageYOffset * parallaxEl.dataset.speed / 5;
			parallaxEl.style.transform = `translate3d(0,${transformY}px,0)`;
			if (parallaxEl.classList.contains("parallax-3")) {
				parallaxEl.style.transform = `translate3d(${transformX}px,${transformY}px,0)`;
			}
		}
	}

	// regular popover
  popoverRegularOptions = {
    trigger: "toggle",
    placement: "top",
    html: true,
    template:
      '<div class="popover popover-donate" role="tooltip"><div class="arrow"></div><div class="popover-body"><div class="popover-header"></div></div></div>',
  };
  $(".question-popover").popover(popoverRegularOptions);

	// scroll to anchor
  $('.scrollto').click(function(e) {
    e.preventDefault();
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top - 80
    }, 800);
  });

	// play youtube video on button push
	$('#help99-video-button').on('click', function(e) {
		e.preventDefault();
    $("#help99-video")[0].src += "&autoplay=1";
		$(this).addClass('d-none').next('.info-video__bkgr').addClass('d-none');
  });

  // drones amount
  const amountResult = $('#help99-drones').data('drones-amount');
  const amountPurpose = $('#help99-drones').data('drones-purpose');
  const $animatedItem = $('.has-animation');

  $animatedItem.each(function (animated_index) {
    const $element = $(this);

    $element.prop('Counter',0).animate({
      Counter: amountResult
    }, {
      duration: 2000,
      easing: 'linear',
      step: function (now) {
        if ($element.hasClass('donate-progress')) {
          $element.find('.drones-amount-result').text(Math.ceil(now) + ' ₴')
            .end().find('.donate-progress__progressbar-filled').css('width', Math.floor(now / amountPurpose * 100) + '%')
            .end().find('.donate-progress__progressbar-percent').text(Math.floor(now / amountPurpose * 100) + '%');
        }
      },
      complete: function() {
        $element.removeClass('has-animation');
        $element.stop();
      },
    });
  });

  // fpv images
  const dronesAmount = $('#drones-amount-fpv').find('.fpv-drone');
  const oneFvpAmount = amountPurpose / dronesAmount.length;
  const activeDronesAmount = amountResult / oneFvpAmount;

  dronesAmount.each(function(index) {
    if (index <= (Math.floor(activeDronesAmount) - 1)) {
      $(this).addClass('active');
    }
  });

  // only allows numbers in amount input
  const inputField = $('#bill-amount');
  inputField.on('keydown', function(event) {
    // Only allow if the e.key value is a number or if it's 'Backspace'
    if (isNaN(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  });

  // buttons values to input amount
  $('.form-buttons__btn').on('click', function() {
    const btnAmount = $(this).data('btn-amount');
    $('#bill-amount').val(btnAmount);
  });
  
})