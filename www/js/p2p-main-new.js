$(document).ready(function() {

  var docWidth = $(document).width();

  // p2p popover
	popoverOptions = {
		trigger: 'toggle',
		// trigger: 'click',
		html: true,
		template: '<div class="popover popover-p2p" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>'
	}

  if (docWidth < 768) {
    popoverOptions.placement = 'top';
  }
  
  $(".p2p-popover").popover(popoverOptions);

  // choose masterpass card
  $('#masterpass-cards .masterpass-card').each(function () {

    $(this).on('click', function () {
      let cardTitle = $(this).find('.masterpass-card__title').text();
      let cardType = $(this).find('.masterpass-card__mask-type').text();
      let cardMask = $(this).find('.masterpass-card__mask-card').text();
      let cardLogoClass = $(this).find('.masterpass-card__logo').attr('class');
      let cardLogo = cardLogoClass.slice(cardLogoClass.lastIndexOf(' '));
      let cardAlias = $(this).find('.masterpass-card__alias').val();

      $('.masterpass-card--active').removeClass('masterpass-card--custom');

      $('#sender-title-card-active').removeClass('invisible').text(cardTitle);
      $('#sender-type-card-active').text(cardType);
      $('#sender-mask-card-active').text(cardMask);
      $('#p2pform-sender_masterpass_card_alias').val(cardAlias);

      $('#sender-bank-card-active').removeClass();
      $('#sender-bank-card-active').addClass('masterpass-card__logo mp-payment-card ' + cardLogo);

      $('#sender-type-card-active').text(cardType);

      if ($(this).hasClass('masterpass-card--custom')) {
        $('.masterpass-card--active').addClass('masterpass-card--custom');
        $('#p2pform-sender_masterpass_card_alias').val('');
        $('#sender-title-card-active').addClass('invisible');
        $('.p2p-new__card').removeClass('invisible');
      } else {
        $('.p2p-new__card').addClass('invisible');
      }

      // happy addressee check on masterpass
      // masterPassSmsCheck($('#sender-mask-card-active').text()[0]);

      // calcCommission($('#sender-mask-card-active'));
    })
  })

  // add bank logo and card type if value
  if ( $('#p2pform-target_card_pan').val() ) {    
    checkTargetPan('#p2pform-target_card_pan');
  }

  $('#p2pform-target_card_pan').on('keyup change focusout', function() {
    checkTargetPan(this);
  })

  function checkTargetPan(elem) {
    let currentPan = $(elem).val();

    let dataContentVisa = $('.p2p-new__popover-data').data('content-visa');
    let dataContentMastercard = $('.p2p-new__popover-data').data('content-mastercard');
    let dataContentProstir = $('.p2p-new__popover-data').data('content-prostir');

    if (currentPan.length > 0) {
      $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--mastercard p2p-new-popover--visa p2p-new-popover--prostir').attr('data-content', '');
  
      if (currentPan[0] == '4') {
        $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--card').addClass('p2p-new-popover--visa').attr('data-content', dataContentVisa);
      } else if (currentPan[0] == '5') {
        $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--card').addClass('p2p-new-popover--mastercard').attr('data-content', dataContentMastercard);
      } else if (currentPan[0] == '9') {
        $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--card').addClass('p2p-new-popover--prostir').attr('data-content', dataContentProstir);
      } else if (currentPan.substring(0, 4) == '6262') {
        $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--card').addClass('p2p-new-popover--prostir').attr('data-content', dataContentProstir);
      } else {
        $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--mastercard p2p-new-popover--visa p2p-new-popover--prostir').addClass('p2p-new-popover--card').attr('data-content', '');
      }
    } else {
      $(elem).siblings('.p2p-new-popover').removeClass('p2p-new-popover--mastercard p2p-new-popover--visa p2p-new-popover--prostir').addClass('p2p-new-popover--card').attr('data-content', '');
    }
  }

})