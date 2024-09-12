$(document).ready(function () {

  let timerStart = true;
  let verifPhoneTimeCount = $('#modal-diia-call').data('verifphonetimecount');
  let verifPhoneTimeCountPage = $('.main-content').data('verifphonetimecount');

  verifPhoneTimeCountPage ? verifPhoneTimeCount = verifPhoneTimeCountPage : '';

  const verifPhoneProgressStart = verifPhoneTimeCount;

  updateTimer(verifPhoneTimeCount);

  function updateTimer(verifPhoneTimeCount) {
    let verifPhoneMinCount = Math.floor(verifPhoneTimeCount / 60);
    let verifPhoneSecCount = verifPhoneTimeCount - (verifPhoneMinCount * 60);
    let verifPhoneProgressCount = ((verifPhoneTimeCount / verifPhoneProgressStart) * 100).toFixed(2);

    verifPhoneMinCount = verifPhoneMinCount < 10 ? '0' + verifPhoneMinCount : verifPhoneMinCount;
    verifPhoneSecCount = verifPhoneSecCount < 10 ? '0' + verifPhoneSecCount : verifPhoneSecCount;
    
    $('#verifphonetimeprogress').width(verifPhoneProgressCount + '%');
    $('#verifphonemincount').text(verifPhoneMinCount);
    $('#verifphoneseccount').text(verifPhoneSecCount);
    $('#verifphonetimecount').hasClass('invisible') ? $('#verifphonetimecount').removeClass('invisible') : '';
  }

  $('#modal-diia-call').on('shown.bs.modal', function() {
    if (timerStart && verifPhoneTimeCount) {
      let callTimerStart = setInterval(function() {
        verifPhoneTimeCount--;
        updateTimer(verifPhoneTimeCount);
        verifPhoneTimeCount < 1 ? clearInterval(callTimerStart) : '';
      }, 1000);
    }
  })

  $('#modal-diia-call').on('hidden.bs.modal', function() {
    timerStart = false;
  })

  if (verifPhoneTimeCountPage) {
    let callTimerStart = setInterval(function() {
      verifPhoneTimeCount--;
      updateTimer(verifPhoneTimeCount);
      verifPhoneTimeCount < 1 ? clearInterval(callTimerStart) : '';
    }, 1000);
  }

  $('.diia-card .dropdown-item').on('click', function(e) {
    if ($(e.target).attr('data-toggle') === 'modal') {
      e.preventDefault();
    }
  })

})