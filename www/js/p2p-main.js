$(document).ready(function() {

  // bonuses popover
  bonusesOptions = {
    title: 'Что такое Бонусы Добра?',
    content: 'Это бонусы, которые Вы накапливаете в личном кабинете на сервисе iPay.ua при совершении платежей или переводе денег с карты на карту.<br><br> <a href="https://ipay-v4.romaniuk.office.udc.ua/ru/yapomoga" target="_blank">Подробнее</a>',
    trigger: 'toggle',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  // invoice popover
  invoiceOptions = {
    content: 'Вы можете посчитать сумму перевода прямо в поле. Например, 700+450-150',
    trigger: 'toggle',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>'
  }
  
  $("#bonus-tooltip").popover(bonusesOptions);
  $("#invoice-popover").popover(invoiceOptions);

})