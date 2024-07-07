$(document).ready(function () {
  
  $('.dropdown-item--delete').on('click', function() {
    $('#modal-group-delete').modal('show');
  });

  $('.modal-group--template-add .new-template-card').on('click', function() {
    
    if ($(this).find('.checkbox-control').length && $(this).find('.checkbox-control .checkbox-input').is(':checked')) {
      $(this).find('.checkbox-control .checkbox-input').removeAttr('checked');
    } else {
      $(this).find('.checkbox-control .checkbox-input').attr('checked', true);
    }
  })

  // create template, choose group
  $('.templates-add__dropdown-group, .templates-add__dropdown-initial').on('click', function(e) {
    e.preventDefault();
    const groupAddress = $(this).text();

    $(this).parents('.templates-add__group').find('.templates-add__group-btn').text(groupAddress);
  });

  // $('.templates-add__dropdown-initial').on('click', function(e) {
  //   e.preventDefault();
  //   const groupAddress = $(this).text();

  //   $(this).parents('.templates-add__group').find('.templates-add__group-btn').text(groupAddress);
  // });

});

