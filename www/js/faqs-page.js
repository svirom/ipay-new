$(document).ready(function() {

  let currentPage = $('.faqs-accordion').find('.faqs-card__collapse .active').attr('href');
  let cookieValue = [];

  // get cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  if (document.cookie.split(';').filter(function(item) {
    return item.trim().indexOf(currentPage.slice(3)) == 0
  }).length) {
    cookieValue = getCookie(currentPage.slice(3));
    cookieValue = JSON.parse(cookieValue);

    if (cookieValue == '0') {
      $('.faqs-vote').addClass('vote-negative');
    }
    if (cookieValue == '1') {
      $('.faqs-vote').addClass('vote-positive');
    }
  }

  $('.faqs-vote__button').on('click', function() {
    if ($(this).hasClass('negative')) {
      $(this).parents('.faqs-vote').removeClass('vote-positive').addClass('vote-negative');
      document.cookie = currentPage.slice(3) + '=0' + '; max-age=604800; path=/';
    }
    if ($(this).hasClass('positive')) {
      $(this).parents('.faqs-vote').removeClass('vote-negative').addClass('vote-positive');
      document.cookie = currentPage.slice(3) + '=1' + '; max-age=604800; path=/';
    }
  })
  
})