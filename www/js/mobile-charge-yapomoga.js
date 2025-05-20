$(document).ready(function () {

  const yapomogaHiddenInput = $('#yapomoga-oneclick-input');

  // show/hide yapomoga form
  $('#checkbox-yapomoga-inp').on('change', function() {
    if ($(this).is(':checked')) {
      $('.mobile-charge-yapomoga__form').removeClass('d-none');
    } else {
      $('.mobile-charge-yapomoga__form').addClass('d-none');
    }
  });
  
  // yapomoga payment buttons
  $('.mobile-charge-yapomoga__btn').on('click', function() {
    const yapomogaAmount = $('.mobile-charge-yapomoga__input-amount');
    const buttonAmount = $(this).data('price');

    yapomogaAmount.val(buttonAmount).addClass('filled');
    yapomogaHiddenInput.val(buttonAmount);
  });

  // yapomoga input val to hidden input
  $('#yapomoga-oneclick-amount').on('input', function() {
    yapomogaHiddenInput.val($(this).val());
  });

});

