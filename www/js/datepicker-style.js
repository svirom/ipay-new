$(document).ready(function() {

  // initialization of datepicker element
  $('.datepicker-input').each(function() {
    $this = $(this);

    $this.datepicker({
      classes: 'datepicker-wrapper',
      autoClose: true,
      onSelect: function onSelect() {
        $this.val() ? $this.addClass('filled') : $this.removeClass('filled');
      }
    })
  })
  

})