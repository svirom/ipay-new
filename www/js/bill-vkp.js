$(document).ready(function() {

  $('.bill-countercard').each(function() {

    $(this).click(function(e) {
      e.preventDefault();

      var rows = $(this).find('.bill-countercard__row');
      var counter = rows.length;

      if ($(e.target).hasClass('btn-bill-counteradd')) {
      
        if (rows.length < 3) {

          $(rows).each(function() {
            ($(this).data('counter') == counter) ? counter++ : counter;
          })
    
          var html = '<div class="bill-countercard__row mt-4" data-counter="' + counter + '">';
          html += '<div class="row justify-content-between mb-1">';
          html += '<div class="col-12 col-md-auto mb-2 mb-md-0 d-flex align-items-center">';
          html += '<p class="heading-color mb-1">Показания счетчика №' + counter + '</p>';
          html += '</div>';
          html += '<div class="col-12 col-md-auto text-md-right mb-2 mb-md-0">';
          html += '<a href="#" class="btn btn-link btn-bill-counterremove">Удалить счетчик</a>';
          html += '</div>';
          html += '</div>';
          html += '<div class="row">';
          html += '<div class="col-md-4">';
          html += '<div class="form-group">';
          html += '<input type="text" id="billform-currentvalue0" class="form-control form-input" name="">';
          html += '<label class="control-label form-label" for="billform-currentvalue0">Текущие, кВт</label>';
          html += '</div>';
          html += '</div>';
          html += '<div class="col-md-4">';
          html += '<div class="form-group">';
          html += '<input type="text" id="billform-oldvalue0" class="form-control form-input" name="">';
          html += '<label class="control-label form-label" for="billform-oldvalue0">Предыдущие, кВт</label>';
          html += '</div>';
          html += '</div>';
          html += '<div class="col-md-4">';
          html += '<div class="form-group">';
          html += '<input type="text" id="billform-tariff" class="form-control form-input" name="">';
          html += '<label class="control-label form-label" for="billform-tariff">Тариф</label>';
          html += '</div>';
          html += '</div>';
          html += '<div class="col-12 mb-2">';
          html += '<div class="bill-countercard__row-result">';
          html += '<p class="mb-2 mr-4 d-md-inline-block heading-color">Разница:<span class="heading-color">0</span></p>';
          html += '<p class="mb-2 d-md-inline-block heading-color">К оплате:<span class="heading-color">0 грн</span></p>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
    
          $(this).find('.bill-countercard__add').before(html);
    
        }
  
        (rows.length === 2) ? $(this).find('.btn-bill-counteradd').css('display', 'none') : $(this).find('.btn-bill-counteradd').css('display', 'block');
      }


      if ($(e.target).hasClass('btn-bill-counterremove')) {
        $(e.target).parents('.bill-countercard__row').remove();

        counter--;

        (rows.length <= 3) ? $(this).find('.btn-bill-counteradd').css('display', 'block') : $(this).find('.btn-bill-counteradd').css('display', 'none');
      }

    })

  })

})