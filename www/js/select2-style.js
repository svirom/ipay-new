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

})