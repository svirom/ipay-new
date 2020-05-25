$(document).ready(function() {

  // show/hide password
  $('.password-button').on('click', togglePassword);

  function togglePassword() {
    var inp = $(this).closest('.form-group').find('.form-input');
    if (inp.attr('type') == "password") {
        inp.attr('type', 'text');
        $(this).addClass('show-pass');
    } else {
      inp.attr('type', 'password');
      $(this).removeClass('show-pass');
    }
  }


  // add class filled to inputs with values
  $('input.form-input').each(function() {
    $(this).val() ? $(this).addClass('filled') : $(this).removeClass('filled');
  })

  // input with filled value
  $('input.form-input').on('change', inputFilled);

  function inputFilled() {
    $(this).val() ? $(this).addClass('filled') : $(this).removeClass('filled');
  }

})