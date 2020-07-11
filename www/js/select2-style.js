$(document).ready(function() {

  // In your Javascript (external .js resource or <script> tag)
  $(document).ready(function() {
    $('.select-input').select2({
      placeholder: "Выберите период",
      allowClear: true,
      dropdownCssClass: 'select-dropdown',
      selectionCssClass: 'select-selection',
      minimumResultsForSearch: Infinity,
      dropdownParent: $('.select-input-wrapper')
    });
  });

})