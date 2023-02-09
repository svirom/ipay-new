window.onbeforeunload = function() {
  window.scrollTo(0, 0);
}

$(document).ready(function() {
	const parallaxEls = document.querySelectorAll("[data-speed]");
 
	window.addEventListener("scroll", scrollHandler);
	
	function scrollHandler() {
		for (const parallaxEl of parallaxEls) {
			const direction = parallaxEl.dataset.direction == "up" ? "-" : "";
			const transformY = this.pageYOffset * parallaxEl.dataset.speed;
			if (parallaxEl.classList.contains("parallax-1")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${90 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-2")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${56 - this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-3")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${45 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			}
		}
	}
	
})