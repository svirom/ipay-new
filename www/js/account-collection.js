$(document).ready(function() {

  // choose image icon and write it to hidden input
  $('.modal-collection-card').on('click', function() {
    let dataIcon = $(this).data('icon');

    $(this).parents('.modal-body').find('.modal-collection-card').removeClass('active').end()
      .find('#modal-collection-card').val(dataIcon);
    $(this).addClass('active');
  })

  // change collection icon on modal hide
  $('#collectionImgEdit').on('hide.bs.modal', function() {
    let collectionImg = $('.collection-page').find('.collection-page__header-img > img');
    let collectionImgArray = collectionImg.attr('src').split('');
    
    collectionImgArray.splice(-5, 1, $('#modal-collection-card').val());
    collectionImg.attr('src', collectionImgArray.join(''));
  })

})