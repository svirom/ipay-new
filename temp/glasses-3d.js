$(document).ready(function() {

	$('.btn-glasses').on('click', function(e) {
		var glassesPrice = '30';
		var glassesAmount = $('.glasses-amount__select > span').text();

		if ( ($(e.target).attr('data-action') == 'minus') && (glassesAmount > 1) ) {
			glassesAmount--;
		}
		if ($(e.target).attr('data-action') == 'plus') {
			glassesAmount++;
		}

		$('.glasses-amount__select > span').text(glassesAmount);
		$('.glasses-input input').val(glassesAmount);
		$('#glasses-result').text((glassesPrice*glassesAmount).toFixed(2));
	})

})