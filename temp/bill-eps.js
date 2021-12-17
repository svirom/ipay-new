$(document).ready(function() {

  // disable/enable card
  $('.utility-card').each(function() {
    var currCheckbox = $(this).find('input[type="checkbox"]');

    $(currCheckbox).on('change', function() {
      var currCard = $(this).parents('.utility-card');

      $(this).is(':checked') ? $(currCard).removeClass('disabled') : $(currCard).addClass('disabled');

      if ($(currCard).hasClass('disabled')) {
        $('.utility-checkbox input[type="checkbox"]').prop('checked', false);
        $(currCard).find('.collapse').collapse('hide');
      }

    })

  })

  // checkbox check all
  $('.utility-checkbox input[type="checkbox"]').on('change', function() {

    if (!$(this).is(':checked')) {
      $('.utility-card').each(function() {
        $(this).addClass('disabled');
        $(this).find('.collapse').collapse('hide');
        $(this).find('input[type="checkbox"]').prop('checked', false);
      })
    } else {
      $('.utility-card').each(function() {
        $(this).removeClass('disabled');
        $(this).find('input[type="checkbox"]').prop('checked', true);
      })
    }

  })

  // add/remove counter
  $('.utility-card__counters').on('click', function(e) {
    e.preventDefault();

    var utilityCardHidden = $(e.target).parents('.utility-card__counters').find('.utility-card__counter.hidden');

    if ($(e.target).hasClass('btn-utility-addcounter')) {
      $(utilityCardHidden).first().removeClass('hidden');
      
      ($(utilityCardHidden).first().index() === $(utilityCardHidden).last().index()) ? $(e.target).addClass('hidden') : '';
    }

    if ($(e.target).hasClass('btn-utility-removecounter')) {
      $(e.target).parents('.utility-card__counter').addClass('hidden');
      utilityCardHidden = $(e.target).parents('.utility-card__counters').find('.utility-card__counter.hidden');

      ($(utilityCardHidden).length) ? $(e.target).parents('.utility-card__counters').find('.btn-utility-addcounter').removeClass('hidden') : '';
    }
  })
  
})