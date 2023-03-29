$(document).ready(function() {

  let cookieValue;

  // get cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  }

  if (document.cookie.split(';').filter(function(item) {
    return item.trim().indexOf('sweettvBirthdayPromo=') == 0
  }).length) {
   // cookieValue = JSON.parse(decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)lastFiveBills\s*\=\s*([^;]*).*$)|^.*$/, "$1")));
    cookieValue = getCookie('sweettvBirthdayPromo');
    cookieValue = JSON.parse(cookieValue);
  }

  if (cookieValue) {
    $('.account-birthday__code').find('.account-birthday__code-overlay').addClass('opened d-none');
  }

  var clipboard;

  $('.account-birthday__code').on('click', function(e) {
    if (!$(this).find('.account-birthday__code-overlay').hasClass('opened')) {
      $(this).find('.account-birthday__code-overlay').addClass('opened');
      document.cookie = 'sweettvBirthdayPromo=1; max-age=31536000; path=/';
    } else {
      clipboard = new ClipboardJS('.account-birthday__code');
      $(this).find('.account-birthday__code-main').addClass('copied');

      let $this = $(this);

      setTimeout(function() {
        $this.find('.account-birthday__code-main').removeClass('copied');
      }, 200);
    }
  })

})