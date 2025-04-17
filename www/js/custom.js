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
    if (!$(this).hasClass('datepicker-input')) {
      $(this).val() ? $(this).addClass('filled') : $(this).removeClass('filled');
    } 
  })

  // input with filled value
  $('input.form-input').on('change', inputFilled);

  function inputFilled() {
    if (!$(this).hasClass('datepicker-input')) {
      $(this).val() ? $(this).addClass('filled') : $(this).removeClass('filled');
    }
  }

  // catalogue mobile
  $('.main-nav__mobile-next').on('click', catalogueMobile);
  $('.catalogue-mobile__back').on('click', catalogueMobileHide);

  function catalogueMobile(e) {
    e.preventDefault();
    $(this).closest('.navbar-collapse').find('.catalogue-mobile').addClass('active');
  }

  function catalogueMobileHide(e) {
    e.preventDefault();
    $(this).closest('.navbar-collapse').find('.catalogue-mobile').removeClass('active');
  }

  // hide login button on mobile menu show
  $('.main-nav__opener').on('click',function() {
    const accountItem = $(this).parents('.main-nav__nav-mobile').find('.main-nav__item-account');
    if (!accountItem.hasClass('logged-in')) {
      accountItem.toggleClass('d-none');
    }
  })

  // resolve issue with height and mobile bottom bar
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');

  window.addEventListener('resize', function() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });

  // initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // cvv popover
  popoverOptions = {
    title: 'CVV',
    content: 'Трехзначный код на оборотной стороне банковской карты',
    trigger: 'toggle',
    trigger: 'click',
    placement: 'right',
    template: '<div class="popover popover-cvv" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  // regular popover
  popoverRegularOptions = {
    trigger: "toggle",
    // placement: "right",
    html: true,
    template:
      '<div class="popover popover-main" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>',
  };

  if (docWidth < 768) {
    popoverOptions.placement = 'bottom';
    popoverRegularOptions.placement = "bottom";
  }
  $("#cvv-popover").popover(popoverOptions);
  $(".question-popover").popover(popoverRegularOptions);

  // national cashback label prevent click on bill (category) card
  $('.category-card .category-card__cashback').on('click', function(e) {
    e.preventDefault();
  });

  // search input mobile
  if (docWidth < 992) {
    $('.modal .input-search').addClass('filled');
  }

  // search cancel button, hide modal
  $('.form-search__cancel').on('click', searchCancel);
  $('#searchModal').on('hidden.bs.modal', searchCancel);

  function searchCancel(e) {
    e.preventDefault();
    $(this).removeClass('active').closest('.form-search').find('.input-search').removeClass('filled').val('').end()
      .find('.form-search__list').html('');
  }
  
  let searchesFields = $('.form-search .input-search');

  $.each(searchesFields, function(index) {
    if ($(this).val().length >= 3) {
      $(this).closest('form').find('.form-search__cancel').addClass('active');
    } else {
      $(this).closest('form').find('.form-search__cancel').removeClass('active');
    }
  })

  $('.form-search .input-search').on('keyup', function() {
    if ($(this).val().length >= 3) {
      $(this).closest('form').find('.form-search__cancel').addClass('active');
    } else {
      $(this).closest('form').find('.form-search__cancel').removeClass('active');
    }
  })

  // search field
  $('.search-field__cancel').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.search-field').find('.form-input').removeClass('filled').val('').end()
      .find('.input-search__list ul').html('');
  })

  $('.input-search__list').on('click', function(e) {
    if ($(e.target).hasClass('input-search__item')) {
      var itemValue = $(e.target).text();
      $(this).closest('.search-field').find('.form-input').val(itemValue);
      $(this).html('');
    }
  })

  // scroll to anchor
  $('.scrollto').click(function(e) {
    e.preventDefault();
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top - 80
    }, 800);
  });

  // add bank logo and card type if value
  if ( $('.method-card-number input').val() ) {    
    checkTargetPan('.method-card-number input');
  }

  $('.method-card-number input').on('keyup change focusout', function() {
    checkTargetPan(this);
  })

  function checkTargetPan(elem) {
    const currentPan = $(elem).val();

    if (currentPan.length > 0) {
      $(elem).siblings('.method-card-type').removeClass('method-card-type--mastercard method-card-type--visa method-card-type--prostir');

      if (currentPan[0] == '4') {
        $(elem).siblings('.method-card-type').removeClass('method-card-type--card').addClass('method-card-type--visa');
      } else if (currentPan[0] == '5') {
        $(elem).siblings('.method-card-type').removeClass('method-card-type--card').addClass('method-card-type--mastercard');
      } else if (currentPan[0] == '9') {
        $(elem).siblings('.method-card-type').removeClass('method-card-type--card').addClass('method-card-type--prostir');
      } else if (currentPan.substring(0, 4) == '6262') {
        $(elem).siblings('.method-card-type').removeClass('method-card-type--card').addClass('method-card-type--prostir');
      } else {
        $(elem).siblings('.method-card-type').removeClass('method-card-type--mastercard method-card-type--visa method-card-type--prostir').addClass('method-card-type--card');
      }
    } else {
      $(elem).siblings('.method-card-type').removeClass('method-card-type--mastercard method-card-type--visa method-card-type--prostir').addClass('method-card-type--card');
    }
  }

  // archive card collapse
  $('.archive-card .collapse').on('show.bs.collapse', function() {
    $(this).parents('.archive-card').addClass('opened');
  });
  $('.archive-card .collapse').on('hide.bs.collapse', function() {
    $(this).parents('.archive-card').removeClass('opened');
  });

  // sticky menu (footer)
  $('#sticky-footer-catalog-link').on('click', function(e) {
    e.preventDefault();
    $('.main-nav__mobile-next').trigger('click');
    $('.main-nav__opener').trigger('click');
  })

})