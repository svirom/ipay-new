$(document).ready(function() {

  // check/uncheck slider item and button class
  $('#upsale-mobile-add').click(function() {
    var itemActive = $('#carousel-goods').find('.carousel-item.active');
    var itemsArr = $('#carousel-goods').find('.carousel-item');

    var titleActive = itemActive.find('.carousel-goods__item-title').text();
    var amountActive = itemActive.find('.carousel-goods__item-amount').text();
    var imgActive = itemActive.find('.carousel-goods__item-img img').attr('src');

    if ( !itemActive.hasClass('checked') ) {

      itemActive.addClass('checked').attr('data-item', titleActive);

      $(this).addClass('upsale-mobile__add--remove');

      var html = '';

      html += '<tr class="upsale-table__item" data-item="' + titleActive + '">';
      html += '<td class="upsale-table__title">' + titleActive + '</td>';
      html += '<td class="upsale-table__content">';
      html += '<span class="upsale-table__img"><img src=' + imgActive + '></span>';
      html += '<span>' + amountActive + '</span>';
      html += '<a href="#" class="upsale-table__remove"></a>';
      html += '</td>';
      html += '</tr>';

      $('.archive-bill').find('.table-summary').before(html);

    } else {

      $('.upsale-table__item').each(function(index) {
        if ( $(this).attr('data-item') == titleActive ) {
          $(this).remove();
        }
      })
      
      itemActive.removeClass('checked');
      
      $(this).removeClass('upsale-mobile__add--remove');
    }

    // manage delivery form
    if ( itemsArr.hasClass('checked') ) {
      $('.upsale-mobile__address').slideDown();
    } else {
      $('.upsale-mobile__address').slideUp();
    }

    
  })

  // manage add button after slider slide/swipe
  $('#carousel-goods').on('slid.bs.carousel', function () {
    var itemActive = $('#carousel-goods').find('.carousel-item.active');

    if ( itemActive.hasClass('checked') ) {
      $('#upsale-mobile-add').addClass('upsale-mobile__add--remove');
    } else {
      $('#upsale-mobile-add').removeClass('upsale-mobile__add--remove');
    }
  })

  // click remove item button (in info table)
  $('.archive-bill__collapse').click(function(e) {
    e.preventDefault();

    if ( $(e.target).hasClass('upsale-table__remove') ) {
      var currentItemAttr = $(e.target).parents('.upsale-table__item').attr('data-item');
      var itemsArr = $('#carousel-goods').find('.carousel-item');

      $(e.target).parents('.upsale-table__item').remove();

      itemsArr.each(function(index) {
        if ( $(this).attr('data-item') == currentItemAttr ) {
          $(this).removeClass('checked');

          if ($(this).hasClass('active')) {
            $('#upsale-mobile-add').removeClass('upsale-mobile__add--remove');
          }
        }
      })

      // manage delivery form
      if ( itemsArr.hasClass('checked') ) {
        $('.upsale-mobile__address').slideDown();
      } else {
        $('.upsale-mobile__address').slideUp();
      }

    }
  })

  // smooth scroll to bill result (success/unsuccess page)
  $('.upsale-mobile__title-main a').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $('.bill-title h1').offset().top
    }, 500);
  })

  $('.upsale-mobile__title-upsale a').click(function(e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: $('.bill-title h2').offset().top
    }, 500);
  })

  // select city
  $('#upsale-select-city').select2({
    placeholder: "Выберите нас. пункт",
    // allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-city'),
    width: '100%'
  });

  // select post office
  $('#upsale-select-office').select2({
    placeholder: "Выберите отделение",
    // allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-office'),
    width: '100%'
  });

})