$(document).ready(function() {

	// version 1
	function loading1() {
		var html = '';
		
		html += '<div class="container-loader">';
		html += '<div class="loader-wrapper">';
		html += '<div class="loader--text">Осуществляется обработка данных</div>';
		html += '<div class="loader">';
		html += '<div class="loader--dot"></div>';
		html += '<div class="loader--dot"></div>';
		html += '<div class="loader--dot"></div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('body').addClass('overflow-hidden');
		$('#loading-1').html(html);	
	}

	$('.loading-1').click(function() {
		loading1();
	});

	// version 2
	function loading2() {
		var lang = $('html').attr('lang');
		var loadingText = '';

		switch (lang) {
			case 'ru-RU':
				loadingText = 'Осуществляется обработка данных';
				break;
			case 'uk-UA':
				loadingText = 'Здійснюється обробка даних';
				break;
			case 'en-US':
				loadingText = 'The data are processed';
				break;
			default:
				loadingText = 'Осуществляется обработка данных';
		}

		var html = '';
		
		html += '<div class="container-loader">';
		html += '<div class="loader-wrapper">';
		html += '<div class="loader--text">' + loadingText + '</div>';
		html += '<div class="loader2">';
		html += '<div class="loader2--dot"></div>';
		html += '<div class="loader2--dot"></div>';
		html += '<div class="loader2--dot"></div>';
		html += '<div class="loader2--dot"></div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('body').addClass('overflow-hidden');
		$('#loading-2').html(html);	
	}

	$('.loading-2').click(function() {
		loading2();
	});

	// version 3
	function loading3() {
		var html = '';
		
		html += '<div class="container-loader">';
		html += '<div class="loader-wrapper">';
		html += '<div class="loader--text">Осуществляется обработка данных</div>';
		html += '<div class="loader3">';
		html += '<div class="loader3--dot"></div>';
		html += '<div class="loader3--dot"></div>';
		html += '<div class="loader3--dot"></div>';
		html += '<div class="loader3--dot"></div>';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('body').addClass('overflow-hidden');
		$('#loading-3').html(html);	
	}

	$('.loading-3').click(function() {
		loading3();
	});

	// version 4
	function loading4() {
		var html = '';
		
		html += '<div class="container-loader">';
		html += '<div class="loader-wrapper">';
		html += '<div class="loader--text">Осуществляется обработка данных</div>';
		html += '<div class="loader4">';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('body').addClass('overflow-hidden');
		$('#loading-4').html(html);	
	}

	$('.loading-4').click(function() {
		loading4();
	});

	// version 4
	function loading5() {
		var html = '';
		
		html += '<div class="container-loader">';
		html += '<div class="loader-wrapper">';
		html += '<div class="loader--text">Осуществляется обработка данных</div>';
		html += '<div class="loader5">';
		html += '</div>';
		html += '</div>';
		html += '</div>';

		$('body').addClass('overflow-hidden');
		$('#loading-5').html(html);	
	}

	$('.loading-5').click(function() {
		loading5();
	});


	// close loaders
	$('body').click(function(e) {

		if ( !$(e.target).hasClass('go-to-pay') && !$(e.target).hasClass('loading-1') && !$(e.target).hasClass('loading-2') && !$(e.target).hasClass('loading-3') && !$(e.target).hasClass('loading-4') && !$(e.target).hasClass('loading-5') ) {
			$(this).removeClass('overflow-hidden');
			$('#loading, #loading-1, #loading-2, #loading-3, #loading-4, #loading-5').html('');
		}
  })

})