document.addEventListener("DOMContentLoaded", function() {

  const ucpPayButton = document.querySelector('.ucp-pay-button');

  document.getElementById('customRadioClickToPay').setAttribute('disabled', true);
  document.getElementById('customRadioClickToPay').removeAttribute('checked');
  document.getElementById('customRadioClickToPay').nextElementSibling.setAttribute('aria-expanded', false);
  document.getElementById('radio-clicktopay').classList.remove('show');
  document.getElementById('payment-method-clicktopay').style.pointerEvents = 'none';
  document.getElementById('customRadioCard').setAttribute('checked', true);
  document.getElementById('customRadioCard').nextElementSibling.setAttribute('aria-expanded', true);
  document.getElementById('radio-customcard').classList.add('show');
  if (document.getElementById('cardform-masterpass_uid')) {
    document.getElementById('cardform-masterpass_uid').value = '';
  }
  ucpPayButton.setAttribute('disabled', true);
   
})
