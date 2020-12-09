$(document).ready(function() {

  var docWidth = $(document).width();

  // bonuses popover
  bonusesOptions = {
    trigger: 'toggle',
    placement: 'right',
    html: true,
    template: '<div class="popover popover-bonuses" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  if (docWidth < 768) {
    bonusesOptions.placement = 'bottom';
  }
  
  $("#bonus-tooltip").popover(bonusesOptions);

})