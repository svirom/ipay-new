$(document).ready(function () {
  var docWidth = $(document).width();

  p2rOptions = {
    trigger: "toggle",
    placement: "right",
    html: true,
    template:
      '<div class="popover popover-p2r" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>',
  };

  if (docWidth < 768) {
    p2rOptions.placement = "bottom";
  }
 
  $(".p2r-popover").popover(p2rOptions);

  $('.select-p2r').select2({
    placeholder: '',
    allowClear: false,
    dropdownCssClass: 'select-dropdown',
    selectionCssClass: 'select-selection',
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.select-input-wrapper'),
    width: '100%'
  });
  
  $("#p2rform-category").change(function () {
    var category_id = $(this).val();
    var placeholder = $(this).data("placeholder-" + category_id);
    $("#p2rform-desc").attr("placeholder", placeholder);
  });

});

