$(document).ready(function() {

  var docWidth = $(document).width();

  var popover1 = `
    <div class="popover-account popover-account--top active" id="popover-account-1">
      <p>Быстро ищите поставщиков услуг с помощью поиска по сайту</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popover2 = `
    <div class="popover-account popover-account--left" id="popover-account-2">
      <p>Здесь хранятся ваши шаблоны для быстрой оплаты. Создавайте новые и управляйте сушествующими!</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popover3 = `
    <div class="popover-account popover-account--left" id="popover-account-3">
      <p>В архиве платежей вы найдете информацию о ваших платежах и все квитанции</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  var popover4 = `
    <div class="popover-account popover-account--left" id="popover-account-4">
      <p>С помощью меню вы можете перейти в раздел мои карты и привязать карту к своему кошельку Masterpass для мгновенной оплаты услуг</p>
      <a href="#" class="btn btn-outline btn-block">Понятно</a>
    </div>`;

  $('.account-main .form-search').prepend(popover1);
  $('.account-templates h3').prepend(popover2);
  $('.account-payments h3').prepend(popover3);
  $('.catalogue-dashboard').prepend(popover4);

  $('#popover-account-1 a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-2').addClass('active');
  })

  $('#popover-account-2 a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-3').addClass('active');
  })

  $('#popover-account-3 a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
    $('#popover-account-4').addClass('active');
  })

  $('#popover-account-4 a').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.popover-account').removeClass('active');
  })


})