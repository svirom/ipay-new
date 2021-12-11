$(document).ready(function() {

  var docWidth = $(document).width();

  // bonuses popover
  bonusesOptions = {
    trigger: 'toggle',
    placement: 'right',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  // invoice popover
  invoiceOptions = {
    trigger: 'toggle',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>'
  }

  // p2p connection
	popoverOptions = {
		trigger: 'toggle',
		html: true,
		template: '<div class="popover popover-bonuses p2p-popover" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>'
	}

  if (docWidth < 768) {
    bonusesOptions.placement = 'bottom';
    invoiceOptions.placement = 'bottom';
    popoverOptions.placement = 'bottom';
  }
  
  $("#bonus-tooltip").popover(bonusesOptions);
  $("#invoice-popover").popover(invoiceOptions);
  $(".p2p-popover").popover(popoverOptions);

  // p2p masterpass
  $('.p2p-tablist__link').on('shown.bs.tab', function (event) {
    var senderTitle = $(event.target).data('title');

    $('#p2p-sender-title').text(senderTitle);

    if ($('#p2p-masterpass').is(':visible')) {
      // console.log('visible');
    }
  })

  var activeCard = $('#sender-mask-card-active').text();

  // choose masterpass card
  $('#masterpass-cards .masterpass-card').each(function () {
    var card = $(this).find('.masterpass-card__card').text();

    if (activeCard == card) {
      $(this).addClass('masterpass-card--active');
    }

    $(this).on('click', function () {
      var text = $(this).find('.masterpass-card__purpose').text();
      var card = $(this).find('.masterpass-card__card').text();
      var bank = $(this).find('.mp-payment-card').attr('class');
      // var cardAlias = $(this).find('.masterpass-card__alias').val();
      var bankLogo = bank.slice(bank.lastIndexOf(' '));
      var type = $(this).find('.masterpass-card__type').attr('class');
      var cardType = type.slice(type.lastIndexOf(' '));

      $('#sender-title-card-active').text(text);
      $('#sender-mask-card-active').text(card);
      // $('#p2pform-sender_masterpass_card_alias').val(cardAlias);

      $('#sender-bank-card-active').removeClass();
      $('#sender-bank-card-active').addClass('masterpass-card__bank mp-payment-card ' + bankLogo);

      $('#sender-type-card-active').removeClass();
      $('#sender-type-card-active').addClass('masterpass-card__type ' + cardType);

      $(".dropdown-menu .masterpass-card--active").removeClass('masterpass-card--active');
      $(this).addClass('masterpass-card--active');

      // happy addressee check on masterpass
      // masterPassSmsCheck($('#sender-mask-card-active').text()[0]);

      // calcCommission($('#sender-mask-card-active'));
    })
  })

})