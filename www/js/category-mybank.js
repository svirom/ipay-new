$(document).ready(function () {

  

});

document.addEventListener('DOMContentLoaded', function() {
    
  // category mybank - logo slider
  if (document.getElementById('mybank-logo-slider')) {
    const splideMybankLogos = new Splide( '#mybank-logo-slider', {
      type   : 'loop',
      drag   : 'free',
      snap   : true,
      lazyLoad: 'nearby',
      pagination: false,
      gap    : '0.625rem',
      perPage: 7,
      perMove: 7,
      breakpoints: {
        1199: {
          perPage: 5,
          perMove: 5,
        },
        575: {
          perPage: 3,
          perMove: 3,
        },
      },
    } );

    splideMybankLogos.mount();
  }

});

