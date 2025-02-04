$(document).ready(function () {
  
  // payment buttons
  $('.yapomoga-payment__btn').on('click', function() {
    const yapomogaAmount = $('.yapomoga-payment__input-amount');
    const buttonAmount = $(this).data('price');

    yapomogaAmount.val(buttonAmount).addClass('filled');
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

