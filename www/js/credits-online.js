$(document).ready(function() {

  // forEach fix for ie11
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  let links = document.querySelectorAll('.company-card__link');

	links.forEach(function(link) {
		link.addEventListener('click', function(e) {
			let url = document.createElement('a');
			url.href = this.dataset.url;
			url.target = '_blank';
			url.click();
		});
	});

})