$(document).ready(function() {

  // In your Javascript (external .js resource or <script> tag)
  $('.select-period').select2({
    placeholder: "Выберите период",
    allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper')
  });

  $('.select-address').select2({
    placeholder: "Область",
    allowClear: true,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper')
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

  $(".select-input-wrapper").each(function () {
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
            return "Ничего не найдено";
          }
        }
    });
});

})