$(document).ready(function() {

  $('.payment-amount__input .payment-input').on('change paste keyup', function(e) {
    if ($(e.target).val()) {
      $(e.target).parents('.payment-amount__input').find('.payment-amount__currency').addClass('active');
    } else {
      $(e.target).parents('.payment-amount__input').find('.payment-amount__currency').removeClass('active');
    }
    // console.log($(e.target).val());
  })

  $('.payment-amount__buttons .btn').on('click', function(e) {
    const btnAmount = $(e.target).data('amount');
    
    $('.payment-amount__input .payment-input').val(btnAmount);
    $(e.target).parents('.payment-form__amount').find('.payment-amount__currency').addClass('active');
    updateSize();
  })

  if ($('.payment-amount__input .payment-input').val()) {
    $('.payment-amount__input .payment-input').parents('.payment-form__amount').find('.payment-amount__currency').addClass('active');
  }

  function updateSize() {
    const span = document.getElementById('size-calibration');
    // const input = document.getElementById('autosized-input')
    const input = document.querySelector('.payment-input');
    span.innerText = input.value;
  }
  // document.addEventListener('DOMContentLoaded', () => {
    // const input = document.getElementById('autosized-input');
    const input = document.querySelector('.payment-input');
    input.oninput = updateSize;
    
    // Provide some initial content
    // input.value = "";
    updateSize();
  // })

})