$(document).ready(function() {

  $('.account-card').on('click', function(e) {
    var docWidth = $(document).width();
    e.preventDefault();
    console.log(e.target);

    if ( $(e.target).hasClass('account-card__confirm-cancel') ) {
      $(this).find('.account-card__confirm').fadeOut(400);
      $(document).find('body').removeClass('overflow-hidden');
    }

    if ( $(e.target).hasClass('account-card__mobile-cancel') ) {
      $(this).find('.account-card__mobile').fadeOut(400);
      $(document).find('body').removeClass('overflow-hidden');
    }

    if ( $(e.target).hasClass('account-card__delete-button') ) {
      if ( docWidth >= 576 ) {
        $(this).find('.account-card__confirm').fadeIn(400);
      } else {
        $(this).find('.account-card__mobile').fadeIn(400);
        $(document).find('body').addClass('overflow-hidden');
      }
    }

    $('#modalCardDefault [type="submit"]').on('click', function(e) {
      e.preventDefault();
      $('#modalCardDefault').modal('hide');
      
      setTimeout(function() {
        $('#modalCardDefaultSuccess').modal('show');
      }, 350);
    })

  })

})