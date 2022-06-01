$(document).ready(function() {

  var lang = {
    "uk": 
    {
      siteTitle: "Технічне обслуговування",
      title: "Сайт тимчасово недоступний",
      text: "Ми проводимо технічні роботи на даний момент, але незабаром ви зможете знову проводити свої платежі на iPay.ua",
      supportTitle: "Технічна підтримка",
      supportEmail: "Пишіть на e-mail",
      supportPhone: "Безкоштовно з мобільного",
      supportWidget1: "Пн - Пт  8:00 - 22:00",
      supportWidget2: "Сб - Нд  9:00 - 21:00",
    },
    "ru":
    {
      siteTitle: "Техническое обслуживание",
      title: "Сайт временно недоступен",
      text: "Мы проводим технические работы в данный момент, но вскоре вы сможете вновь проводить свои платежи на iPay.ua",
      supportTitle: "Техническая поддержка",
      supportEmail: "Пишите на e-mail",
      supportPhone: "Бесплатно с мобильного",
      supportWidget1: "Пн - Пт  8:00 - 22:00",
      supportWidget2: "Сб - Вс  9:00 - 21:00",
    },
    "en": 
    {
      siteTitle: "Maintenance",
      title: "Site temporarily unavailable",
      text: "We are carrying out technical work at the moment, but soon you will be able to make your payments on iPay.ua again",
      supportTitle: "Support",
      supportEmail: "Write to e-mail",
      supportPhone: "Free from mobile",
      supportWidget1: "Mon - Fri  8:00 - 22:00",
      supportWidget2: "Sat - Sun  9:00 - 21:00",
    }
  };

  $('.main-nav__item .dropdown-item').on('click', changeLanguage);

  function changeLanguage(e) {
    e.preventDefault();
    var targetLang = $(this).data('lang');
    var targetLangNode = $(this).text();
    var langItems = $('.dropdown-menu .dropdown-item');
    
    $('#dropdown-lang').text(targetLangNode);

    for (var i=0; i < langItems.length; i++) {
      langItems.removeClass('active');
    }

    $(this).addClass('active');

    $('title').text(lang[targetLang].siteTitle);
    $('[data-title]').text(lang[targetLang].title);
    $('[data-text]').text(lang[targetLang].text);
    $('[data-support-title]').text(lang[targetLang].supportTitle);
    $('[data-support-email]').text(lang[targetLang].supportEmail);
    $('[data-support-phone]').text(lang[targetLang].supportPhone);
    $('[data-widget-1]').text(lang[targetLang].supportWidget1);
    $('[data-widget-2]').text(lang[targetLang].supportWidget2);
  }

})