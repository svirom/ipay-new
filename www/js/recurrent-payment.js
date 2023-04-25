$(document).ready(function() {

  // choose masterpass card
  $('#masterpass-cards .masterpass-card').each(function () {

    $(this).on('click', function () {
      let cardTitle = $(this).find('.masterpass-card__title').text();
      let cardType = $(this).find('.masterpass-card__mask-type').text();
      let cardMask = $(this).find('.masterpass-card__mask-card').text();
      let cardLogoClass = $(this).find('.masterpass-card__logo').attr('class');
      let cardLogo = cardLogoClass.slice(cardLogoClass.lastIndexOf(' '));
      let cardAlias = $(this).find('.masterpass-card__alias').val();

      $('#sender-title-card-active').removeClass('invisible').text(cardTitle);
      $('#sender-type-card-active').text(cardType);
      $('#sender-mask-card-active').text(cardMask);
      $('#p2pform-sender_masterpass_card_alias').val(cardAlias);

      $('#sender-bank-card-active').removeClass();
      $('#sender-bank-card-active').addClass('masterpass-card__logo mp-payment-card ' + cardLogo);

      $('#sender-type-card-active').text(cardType);
    })
  })

  let dateCalendar = $('.templates-add__recurrent .datepicker-input');
  let dateValue = dateCalendar.attr('data-value');

  if (dateValue) {
    dateCalendar.datepicker().data('datepicker').selectDate(new Date(Number(dateValue)));
  }
  
})