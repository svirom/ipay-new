document.addEventListener("DOMContentLoaded", function() {

  // const popover = document.getElementById('template-guide-popover');
  // const popoverBtn = document.getElementById('template-guide-btn');
  // const popoverBkgr = document.getElementById('template-guide-bkgr');
  // const popoverClose = document.getElementById('template-guide-close');

  // if (popover.classList.contains('step-2')) {
  //   popover.parentElement.querySelector('.form-search').classList.add('activated');
  // }

  // if (popoverBtn) {
  //   popoverBtn.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     popoverBkgr.classList.add('active');
  //     popover.classList.add('active');
  //     popover.classList.add('template-popover-open');
  //     popover.parentElement.querySelector('.template-add__button').classList.add('activated');
  //   })
  // }

  // popoverClose.addEventListener('click', function(e) {
  //   e.preventDefault();
  //   popoverBkgr.classList.remove('active');
  //   popover.classList.remove('active');
  //   popover.classList.remove('template-popover-open');
    
  //   if (popover.classList.contains('step-1')) {
  //     popover.parentElement.querySelector('.template-add__button').classList.remove('activated');
  //   }

  //   if (popover.classList.contains('step-2')) {
  //     popover.parentElement.querySelector('.form-search').classList.remove('activated');
  //   }
  // })

  const popover = $('#template-guide-popover');
  const popoverBtn = $('#template-guide-btn');
  const popoverBkgr = $('#template-guide-bkgr');
  const popoverClose = $('#template-guide-close');

  const popoverSearchTitle = popover.data('search-title');
  const popoverSearchText = popover.data('search-text');
  const popoverSelectTitle = popover.data('select-title');
  const popoverSelectText = popover.data('select-text');

  if (popover.hasClass('step-2') || popover.hasClass('step-3') || popover.hasClass('step-4')) {
    popover.parent().find('.form-search').addClass('activated');
  }

  if (popoverBtn) {
    popoverBtn.on('click', function(e) {
      e.preventDefault();
      popoverBkgr.addClass('active');
      popover.addClass('active');
      popover.addClass('template-popover-open');
      popover.parent().find('.template-add__button').addClass('activated');
    })
  }

  popoverClose.on('click', function(e) {
    e.preventDefault();
    popoverBkgr.removeClass('active');
    popover.removeClass('active');
    popover.removeClass('template-popover-open');
    
    if (popover.hasClass('step-1')) {
      popover.parent().find('.template-add__button').removeClass('activated');
    }

    if (popover.hasClass('step-2') || popover.hasClass('step-3') || popover.hasClass('step-4')) {
      popover.parent().find('.form-search').removeClass('activated');
    }
  })

  popover.parent().find('.input-search').on('keyup', function(e) {
    if ($(e.target).val().length >= 3) {
      $('#template-guide-popover .template-guide-title').text(popoverSelectTitle);
      $('#template-guide-popover .template-guide-text').text(popoverSelectText);
      popover.removeClass('step-2').addClass('step-3');
    } else {
      $('#template-guide-popover .template-guide-title').text(popoverSearchTitle);
      $('#template-guide-popover .template-guide-text').text(popoverSearchText);
      popover.removeClass('step-3').addClass('step-2');
    }
  })

  if ($('#templateGuideModal')) {
    $('#templateGuideModal').modal('show');
  }

});