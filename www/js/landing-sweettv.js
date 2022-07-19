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
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(${0 - this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-2")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${90 - this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-3")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${280 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-4")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(${310 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-5")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${320 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("parallax-6")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-${10 + this.pageYOffset * parallaxEl.dataset.speed / 2}deg)`;
			} else if (parallaxEl.classList.contains("non-parallax-1")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(32deg)`;
			} else if (parallaxEl.classList.contains("non-parallax-2")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(90deg)`;
			} else if (parallaxEl.classList.contains("non-parallax-3")) {
				parallaxEl.style.transform = `translate3d(0,${direction}${transformY}px,0) rotate(-140deg)`;
			}
		}
	}
	
})