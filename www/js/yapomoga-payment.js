$(document).ready(function () {
  
  // payment buttons
  $('.yapomoga-payment__btn').on('click', function() {
    const yapomogaAmount = $('.yapomoga-payment__input-amount');
    const buttonAmount = $(this).data('price');

    yapomogaAmount.val(buttonAmount).addClass('filled');
  })

});

