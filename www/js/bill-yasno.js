$(document).ready(function() {

  $('.select-counter-type').select2({
    allowClear: false,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper')
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
      }

      $('.select-counter-type').val(currClass);
      $('.select-counter-type').trigger('change');
    })
  })// synchronize active buttons on desktop and select value mobile

})