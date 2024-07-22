$(document).ready(function() {

  // In your Javascript (external .js resource or <script> tag)
  $('.select-period').select2({
    placeholder: "Выберите период",
    allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper'),
    width: '100%'
  });

  $('.select-address').select2({
    placeholder: "Область",
    allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper'),
    width: '100%'
  });

  $('.select-search').select2({
    placeholder: "Область",
    allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: 3,
    dropdownParent: $('.select-input-wrapper'),
    width: '100%'
  });

  if ($('.select-month').length) {
    $('.select-month').select2({
      placeholder: $('.select-month').data('localization'),
      allowClear: false,
      dropdownCssClass: 'select-dropdown',
      selectionCssClass: 'select-selection',
      minimumResultsForSearch: Infinity,
      dropdownParent: $('.select-input-wrapper-month'),
      width: '100%',
    });
  }

  if ($('.select-year').length) {
    $('.select-year').select2({
      placeholder: '2024',
      allowClear: false,
      dropdownCssClass: 'select-dropdown',
      selectionCssClass: 'select-selection',
      minimumResultsForSearch: Infinity,
      dropdownParent: $('.select-input-wrapper-year'),
      width: '100%',
    });
  }

  $(".select-input-wrapper").each(function () {

    var lang = $('html').attr('lang');
    var searchPlaceholder = '';
    var searchNothing = '';

    switch (lang) {
      case 'ru-RU':
        searchPlaceholder = 'Начните вводить...';
        searchNothing = 'Ничего не найдено';
        break;
      case 'uk-UA':
        searchPlaceholder = 'Почніть вводити...';
        searchNothing = 'Нічого не знайдено';
        break;
      case 'en-US':
        searchPlaceholder = 'Start typing...';
        searchNothing = 'Nothing found';
        break;
      default:
        searchPlaceholder = 'Начните вводить...';
        searchNothing = 'Ничего не найдено';
    }

    $(this).find('.js-example-basic-single').select2({
      placeholder: $(this).data('label'),
      allowClear: true,
      dropdownCssClass: 'select-dropdown',
      selectionCssClass: 'select-selection',
      minimumResultsForSearch: $(this).find('.js-example-basic-single').hasClass('select-search') ? 3 : Infinity,
      dropdownParent: $(this),
      width: '100%',
      language: {
        noResults: function() {
          return searchNothing;
        }
      }
    });

    $(this).one('select2:open', function(e) {
      $('input.select2-search__field').prop('placeholder', searchPlaceholder);
    });
  });

})