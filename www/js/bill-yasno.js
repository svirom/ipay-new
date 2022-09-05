$(document).ready(function() {

  $('.select-counter-type').select2({
    allowClear: false,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper'),
    width: '100%'
  });

  // choose relative fields on select change
  $('.select-counter-type').on('change', function() {
    var currValue = 's' + $(this).val();

    $('.bill-yasno__tab-content .tab-pane').each(function() {
      
      $(this).removeClass('show active');

      if ($(this).hasClass(currValue)) {

        // synchronize active buttons on desktop and mobile
        var currId = $(this).attr('id');
        $('.bill-yasno__tariff-pills .btn').each(function() {
          $(this).removeClass('active').attr('aria-selected', 'false');

          if ( $(this).attr('href') == ('#' + currId) ) {
            $(this).addClass('active').attr('aria-selected', 'true');
          }
        })// synchronize active buttons on desktop and mobile

        $(this).addClass('show active');
      }
    })

    calcValues($(this).val());

  })

  // synchronize active buttons on desktop and select value mobile
  $('.bill-yasno__tariff-pills a[data-toggle="pill"]').on('click', function () {
    var currClass = '0';
    var currId = $(this).attr('href');
    
    $('.bill-yasno__tab-content .tab-pane').each(function() {

      if ( ('#' + $(this).attr('id')) == currId ) {
        
        if ($(this).hasClass('s0')) {
          currClass = '0';
        } else if ($(this).hasClass('s1')) {
          currClass = '1';
        } else if ($(this).hasClass('s2')) {
          currClass = '2';
        }

        calcValues(currClass);
      }

      $('.select-counter-type').val(currClass);
      $('.select-counter-type').trigger('change');

    })
  }) // synchronize active buttons on desktop and select value mobile

  // change titles and values of calculator
  function calcValues(value) {
    $('.bill-yasno__card-row').find('input').val('');

    var titleS0 = $('[data-calc="s0"]').find('.bill-yasno__card-title');
    var titleS0_s1 = titleS0.data('s1');
    var titleS0_s2 = titleS0.data('s2');
    var titleS1 = $('[data-calc="s1"]').find('.bill-yasno__card-title');
    var titleS1_s1 = titleS1.data('s1');
    var titleS1_s2 = titleS1.data('s2');
    var titleS2 = $('[data-calc="s2"]').find('.bill-yasno__card-title');
    var titleS2_s2 = titleS2.data('s2');

    if (value === '0') {
      $('[data-calc="s0"]').addClass('active');
      $('[data-calc="s1"]').removeClass('active');
      $('[data-calc="s2"]').removeClass('active');

      titleS0.find('span').text('');

    } else if (value === '1') {
      $('[data-calc="s0"]').addClass('active');
      $('[data-calc="s1"]').addClass('active');
      $('[data-calc="s2"]').removeClass('active');

      titleS0.find('span').text(', ' + titleS0_s1);
      titleS1.find('span').text(', ' + titleS1_s1);
      
    } else if (value === '2') {
      $('[data-calc="s0"]').addClass('active');
      $('[data-calc="s1"]').addClass('active');
      $('[data-calc="s2"]').addClass('active');

      titleS0.find('span').text(', ' + titleS0_s2);
      titleS1.find('span').text(', ' + titleS1_s2);
      titleS2.find('span').text(', ' + titleS2_s2);
    }
  }

})