$(document).ready(function() {

  var docWidth = $(document).width();

  // bonuses popover
  bonusesOptions = {
    // title: 'Что такое Бонусы Добра?',
    // content: 'Это бонусы, которые Вы накапливаете в личном кабинете на сервисе iPay.ua при совершении платежей или переводе денег с карты на карту.<br><br> <a href="https://ipay-v4.romaniuk.office.udc.ua/ru/yapomoga" target="_blank">Подробнее</a>',
    trigger: 'toggle',
    placement: 'right',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  // invoice popover
  invoiceOptions = {
    content: 'Вы можете посчитать сумму перевода прямо в поле. Например, 700+450-150',
    trigger: 'toggle',
    placement: 'right',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><div class="popover-body py-3"></div></div>'
  }

  if (docWidth < 768) {
    bonusesOptions.placement = 'bottom';
    invoiceOptions.placement = 'bottom';
  }
  
  $("#bonus-tooltip").popover(bonusesOptions);
  $("#invoice-popover").popover(invoiceOptions);

  // p2p masterpass always one collapsed element open
  $('.payment-method--p2p [data-toggle=collapse]').on('click', function (e) {
    e.preventDefault();
    if(!$(this).hasClass('collapsed')){
      e.stopPropagation();
      return false;
    }
  })

})