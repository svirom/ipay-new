$(document).ready(function() {

  // show/hide password
  function myFunction() {
    var inp = $(this).closest('.form-group').find('.form-input');
    if (inp.attr('type') == "password") {
        inp.attr('type', 'text');
        $(this).addClass('show-pass');
    } else {
      inp.attr('type', 'password');
      $(this).removeClass('show-pass');
    }
  }
  $('.password-button').on('click', myFunction);
})