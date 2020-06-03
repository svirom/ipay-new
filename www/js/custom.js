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

  // catalogue mobile
  $('.catalogue__next').on('click', catalogueMobile);
  $('.catalogue__back').on('click', catalogueMobileHide);

  function catalogueMobile(e) {
    e.preventDefault();

    var catalogueHeight = $('.navbar-collapse').find('.catalogue-mobile').height();

    $(this).closest('.navbar-collapse').removeClass('overflow-hidden')
      .find('.catalogue-mobile').addClass('active').end()
      .css({'height' : catalogueHeight});
  }

  function catalogueMobileHide(e) {
    e.preventDefault();

    var mobileMenuHeight = $('.navbar-collapse__menu').height();

    $(this).closest('.navbar-collapse').addClass('overflow-hidden')
      .find('.catalogue-mobile').removeClass('active').end()
      .css({'height' : mobileMenuHeight});
  }

  // catalogue mobile registered (temporary)
  $('.catalogue__nextR').on('click', catalogueMobileR);
  $('.catalogue__backR').on('click', catalogueMobileHideR);

  function catalogueMobileR(e) {
    e.preventDefault();

    var catalogueHeight = $('.navbar-collapse').find('.catalogue__backR').closest('.catalogue-mobile').height();

    $(this).closest('.navbar-collapse').removeClass('overflow-hidden')
      .find('.catalogue-mobile').addClass('active').end()
      .css({'height' : catalogueHeight});
  }

  function catalogueMobileHideR(e) {
    e.preventDefault();

    var mobileMenuHeight = $('.navbar-collapse__menu').height();

    $(this).closest('.navbar-collapse').addClass('overflow-hidden')
      .find('.catalogue-mobile').removeClass('active').end()
      .css({'height' : mobileMenuHeight});
  }

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

})