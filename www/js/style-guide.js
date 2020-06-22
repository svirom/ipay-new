$(document).ready(function() {

  // catalogue mobile registered (temporary)
  $('.catalogue-mobile__nextR').on('click', catalogueMobileR);
  $('.catalogue-mobile__backR').on('click', catalogueMobileHideR);

  function catalogueMobileR(e) {
    e.preventDefault();

    var catalogueHeight = $('.navbar-collapse').find('.catalogue-mobile__backR').closest('.catalogue-mobile').height();

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

})