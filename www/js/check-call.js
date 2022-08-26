$(document).ready(function () {

  var timerStart = true;
  // var callCheckTryCount = $('#modal-auth').data('callchecktrycount');
  var callCheckTryCount = $('#modal-verif-5').data('callchecktrycount');
  var callCheckTryCountPage = $('.main-content').data('callchecktrycount');

  callCheckTryCountPage ? callCheckTryCount = callCheckTryCountPage : '';

  $('#callchecktrycount').text(callCheckTryCount);

  // $('#modal-auth').on('shown.bs.modal', function() {
  $('#modal-verif-5').on('shown.bs.modal', function() {

    if (timerStart && callCheckTryCount) {
      var callTimerStart = setInterval(function() {
        callCheckTryCount--;
        $('#callchecktrycount').text(callCheckTryCount);
        callCheckTryCount < 1 ? clearInterval(callTimerStart) : '';
      }, 1000);
    }

  })

  // $('#modal-auth').on('hidden.bs.modal', function() {
  $('#modal-verif-5').on('hidden.bs.modal', function() {
    timerStart = false;
  })

  if (callCheckTryCountPage) {
    var callTimerStart = setInterval(function() {
      callCheckTryCount--;
      $('#callchecktrycount').text(callCheckTryCount);
      callCheckTryCount < 1 ? clearInterval(callTimerStart) : '';
    }, 1000);
  }

})