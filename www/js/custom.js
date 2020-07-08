$(document).ready(function() {

  var docWidth = $(document).width();

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
  $('.catalogue-mobile__next').on('click', catalogueMobile);
  $('.catalogue-mobile__back').on('click', catalogueMobileHide);

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

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // cvv popover
  popoverOptions = {
    title: 'CVV',
    content: 'Трехзначный код на оборотной стороне банковской карты',
    trigger: 'toggle',
    placement: 'right',
    template: '<div class="popover popover-cvv" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  if (docWidth < 768) {
    popoverOptions.placement = 'bottom';
  }
  $("#cvv-popover, #cvv-popover2, #cvv-popover3, #cvv-popover4").popover(popoverOptions);

  // search input mobile
  $('.input-search').on('focus', function() {
    $(this).closest('.form-search').addClass('focused');
  })

  $('.input-search').on('blur', function() {
    $(this).closest('.form-search').removeClass('focused');
  })

  // search cancel button, hide modal
  $('.form-search__cancel').on('click', searchCancel);
  $('#searchModal').on('hidden.bs.modal', searchCancel);

  function searchCancel() {
    $(this).closest('#searchModal')
    .find('.form-search').removeClass('focused')
    .find('.input-search').removeClass('filled').val('');
  }

  // In your Javascript (external .js resource or <script> tag)
  /* $(document).ready(function() {
    $('.select-input').select2({
      placeholder: "Выберите из списка",
      allowClear: true,
      dropdownCssClass: 'select-dropdown',
      selectionCssClass: 'cldjfhf'
    });
  }); */

})