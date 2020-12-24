$(document).ready(function() {

  $('.p2c-input').addClass('filled');

  $('.p2c-field-add').on('click', fieldAdd);
  $('#p2c__fields-more').on('click', fieldRemove);

  // additional field add function
  function fieldAdd(e) {
    e.preventDefault();

    var fieldTitle = $('#field-add').val();
    var fieldId = $("#p2c__fields-more").find(".p2c__field-wrapper:last").attr("id");

  	if ( fieldId  === undefined){
  		fieldId = 'add-0';
    }
    
    var num = parseInt(fieldId.split('-')[1]) + 1;

    var html = '<div class="p2c__field-wrapper" id="add-'+ num +'">';
        html += '<input type="hidden" name="Fields['+ (num - 1) + ']" value="' + fieldTitle +'">';
        html += '<div class="p2c__field">';
        html += '<span class="p2c__field-text">'+ fieldTitle +'</span>';
        html += '<span class="p2c__field-btn">';
        html += '</span>';
        html += '</div>';
        html += '</div>';

    if (fieldTitle) {
      $('#field-add').nextAll('.p2c__field-error').removeClass('active');
      $('.p2c__field-add').before(html);
    } else {
      $('#field-add').nextAll('.p2c__field-error').addClass('active');
    }

    $('#field-add').val('');

  }

  // additional field remove function
  function fieldRemove(e) {
    e.preventDefault();

    if ( $(e.target).hasClass('p2c__field-btn') ) {
      $(e.target).parents('.p2c__field-wrapper').remove();
    }
    
  }

  // clipboard plugin initiate
  var clipboard = new ClipboardJS('.btn-link-generated');

  clipboard.on('success', function(e) {

    $('.p2c-link__btn span').addClass('copied');

    setTimeout(removeCopied, 2000);

    function removeCopied() {
      $('.p2c-link__btn span').removeClass('copied');
    }

    e.clearSelection();
  });

})