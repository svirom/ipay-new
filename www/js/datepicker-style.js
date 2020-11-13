$(document).ready(function() {

  // initialization of datepicker element
  $('.datepicker-input').each(function() {
    $this = $(this);

    $this.datepicker({
      classes: 'datepicker-wrapper',
      autoClose: true,
      onSelect: function onSelect() {
        $(this).addClass('filled');
      }
    })

    var datepicker = $this.datepicker().data('datepicker');

    $this.on('focus', function() {
      $(this).addClass('filled');
    })

    $this.on('blur', function() {  
      thisBlur = $(this);

      setTimeout(function() {
        !datepicker._prevOnSelectValue ? thisBlur.removeClass('filled') : '';
      }, 200);
        
    })
  })

})