$(document).ready(function() {

  // change currency on radio checkbox
  $('.crossborder__transfer-currency input[type=radio]').change(function() {
    if ($(this).val() == 'eur') {
      $(this).parents('.crossborder__transfer-currency')
        .find('.label-currency').text('EUR').end()
        .find('.currency-eur').addClass('active').end()
        .find('.currency-pln').removeClass('active');

      $(this).parents('.crossborder__transfer').find('#send-currency').text('EUR');
    }
    else if ($(this).val() == 'pln') {
      $(this).parents('.crossborder__transfer-currency')
        .find('.label-currency').text('PLN').end()
        .find('.currency-pln').addClass('active').end()
        .find('.currency-eur').removeClass('active');
      
      $(this).parents('.crossborder__transfer').find('#send-currency').text('PLN');
    }
  });

  var docWidth = $(document).width();

  // crossborder popovers
	crossborderOptions = {
		trigger: 'toggle',
		placement: 'right',
		html: true,
		template: '<div class="popover popover-crossborder" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>'
	}

  if (docWidth < 768) {
    crossborderOptions.placement = 'bottom';
  }

  $(".crossborder-tooltip").popover(crossborderOptions);

})