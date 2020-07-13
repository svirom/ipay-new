$(document).ready(function() {

  var docWidth = $(document).width();

  var popoverSearch = `
    <div class="popover-account popover-account--search active" id="popover-account-search">
      <p>Быстро ищите поставщиков услуг с помощью поиска по сайту</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popoverTemplates = `
    <div class="popover-account popover-account--templates" id="popover-account-templates">
      <p>Здесь хранятся ваши шаблоны для быстрой оплаты. Создавайте новые и управляйте сушествующими!</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popoverPayments = `
    <div class="popover-account popover-account--payments" id="popover-account-payments">
      <p>В архиве платежей вы найдете информацию о ваших платежах и все квитанции</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popoverMenu = `
    <div class="popover-account popover-account--menu" id="popover-account-menu">
      <p>С помощью меню вы можете перейти в раздел мои карты и привязать карту к своему кошельку Masterpass для мгновенной оплаты услуг</p>
      <a href="#" class="btn btn-outline btn-block">Завершить!</a>
    </div>`;

  $('.account-main .form-search').prepend(popoverSearch);
  $('.account-templates h3').prepend(popoverTemplates);
  $('.account-payments h3').prepend(popoverPayments);

  docWidth >= 992 ? $('.catalogue-dashboard').prepend(popoverMenu) : $('.main-nav__item-mobile').prepend(popoverMenu);

  $('#popover-account-search a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-templates').addClass('active');
  })

  $('#popover-account-templates a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-payments').addClass('active');
  })

  $('#popover-account-payments a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-menu').addClass('active');
  })

  $('#popover-account-menu a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
  })


})