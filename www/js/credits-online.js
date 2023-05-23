$(document).ready(function() {

  // forEach fix for ie11
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

	// handle links to companies sites
  let links = document.querySelectorAll('.company-card__link');

	links.forEach(function(link) {
		link.addEventListener('click', function(e) {
			let url = document.createElement('a');
			url.href = this.dataset.url;
			url.target = '_blank';
			url.click();
		});
	});

	// initialize select
	$('.select-input-wrapper').each(function () {
		$(this).find('.js-example-basic-single').select2({
			placeholder: $(this).data('label'),
			width: '100%',
			allowClear: true,
			dropdownCssClass: 'select-dropdown',
			selectionCssClass: 'select-selection',
			minimumResultsForSearch: Infinity,
			dropdownParent: $(this),
		});
	});

	// let input only numeric characters on amount input
	$('#credits-amount').on('input', function() {
		let creditsAmount = $(this).val();
		const re = /[^0-9+]/;
		creditsAmount = creditsAmount.replace(re, '');
		$(this).val(creditsAmount);
	});

	$('#credits-form-submit').on('click', function() {
		const amount = $('#credits-amount').val(); // input max amount of credit
		const period = $('#credits-period').val(); // input max period of credit

		// filter companies cards with max amount and period
		$('.company-card').each(function() {
			const amountCard = $(this).data('amount'); // max amount of credit
			const periodCard = $(this).data('period'); // max term of credit

			if ( (amount && (amountCard < amount)) || (period && (periodCard < period)) ) {
				$(this).addClass('hidden');
			} else {
				$(this).removeClass('hidden');
			}
		})
	});

	// reset filter
	$('#credit-reset').on('click', function(e) {
		e.preventDefault();

		$('.company-card').each(function() {
			$(this).removeClass('hidden');
			$('#credits-amount').val('');
			$('#credits-period').val(null).trigger('change');
		});
	});

})