$(document).ready(function () {

  const yapomogaHiddenInput = $('#yapomoga-hidden-input');
  
  // payment buttons
  $('.yapomoga-payment__btn').on('click', function() {
    const yapomogaAmount = $('.yapomoga-payment__input-amount');
    const buttonAmount = $(this).data('price');

    yapomogaAmount.val(buttonAmount).addClass('filled');
    yapomogaHiddenInput.val(buttonAmount);
  })

  // yapomoga input val to hidden input
  $('#yapomoga-amount').on('input', function() {
    yapomogaHiddenInput.val($(this).val());
  })

  // enable/disable input and buttons
  $('#checkbox-switch-yapomoga').on('change', function() {
    if (!$(this).is(':checked')) {
      $('#yapomoga-amount').val(null);
    }
  })

  // open modal inside collapse button
  $('.yapomoga-switch__button').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#yapomogaDescriptionModal').modal('show');
  })

});

