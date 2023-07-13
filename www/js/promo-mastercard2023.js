$(document).ready(function() {

  $('.promo-popover').popover({
    container: '.btn-promo-mastercard2023',
    trigger: "toggle",
    // trigger: "click",
    html: true,
    template:
      '<div class="popover popover-main" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>',
  });

  // $('#btn-promo-mastercard2023').triggerHandler('toggle');
  $('#btn-promo-mastercard2023').popover('show');

  $('#btn-promo-mastercard2023').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $('.popover.popover-main').on('click', function(e) {
    console.log($(e.target));
    e.preventDefault();
    e.stopPropagation();
    $('#btn-promo-mastercard2023').popover('hide');
    if ($(e.target).hasClass('btn-promo-mastercard2023__modal')) {      
      $('#modal-promo-mastercard2023').modal('show');
    }
  })

  $('#modal-promo-mastercard2023').on('show.bs.modal', function() {
    $('#btn-promo-mastercard2023').popover('hide');
  })

})