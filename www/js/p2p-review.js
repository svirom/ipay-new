$(document).ready(function() {

  $('.modal-review__rating .rating-input').change(function() {
    var ratingValue = $(this).find('input:checked').data('vote');    
    var ratingText = $('.rating-result').data('rating-' + ratingValue);

    $('.rating-result').removeClass('no-rating');

    $('.rating-result').text(ratingText);

    if ((ratingValue === 4) || (ratingValue === 5)) {
      $('.rating-result').addClass('rating-positive');
    } else {
      $('.rating-result').removeClass('rating-positive');
    }

    if (ratingValue > 0) {
      $('.modal-review__form [type="submit"]').removeAttr('disabled');
    } else {
      $('.modal-review__form [type="submit"]').attr('disabled', 'disabled');
    }
  })

  // if ($('#rating-contacts').hasClass('phone-unsuccess') && $('#rating-contacts').parent('.form-group').hasClass('has-success')) {
	// 	$('.modal-review__form [type="submit"]').removeAttr('disabled');
	// }

	$('#rating-contacts').change(function() {
		setTimeout(function() {
			if ($('#rating-contacts').parent('.form-group').hasClass('has-success')) {
				$('.modal-review__form [type="submit"]').removeAttr('disabled');
			} else {
				$('.modal-review__form [type="submit"]').attr('disabled', 'disabled');
			}
		}, 250);
	})

})