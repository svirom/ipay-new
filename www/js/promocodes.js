document.addEventListener('DOMContentLoaded', function() {

  let heightMeasurement = function() {
    let heightSlider = [];
    // let heightSlider2 = [];

    $('.promocodes-slider').children().each(function(index) {
      heightSlider.push($(this).outerHeight());
      // heightSlider2.push($(this).offsetHeight);
    });
    console.log(heightSlider, Math.max(...heightSlider), $('.promocodes-slider').outerHeight());
    // console.log(heightSlider2, Math.max(...heightSlider2));
  
    // $('.awards-slider').outerHeight(Math.max(...heightSlider2));
    $('.promocodes-slider').css('height', Math.max(...heightSlider));
  }

  // heightMeasurement();

  // slider
  let sliderOptions = {
    item: 1,
    loop: true,
    // auto: true,
    auto: false,
    mode: 'fade',
    adaptiveHeight: true,
    pauseOnHover: true,
    slideMove: 1,
    slideMargin: 30,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed: 600,
    pause: 4000,

    onSliderLoad: function (el) {
      heightMeasurement();
      // var maxHeight = 0,
      //   container = $(el),
      //   children = container.children();
      // children.each(function () {
      //   var childHeight = $(this).height();
      //   if (childHeight > maxHeight) {
      //     maxHeight = childHeight;
      //   }
      // });
      // container.height(maxHeight);
    },
  };

  if ($('.promocodes-slider').length > 0) {
    $('.promocodes-slider').lightSlider(sliderOptions);
  }

  $(document).resize(function() {
    heightMeasurement();
  })

  if (document.querySelector('#promocodes-search-input')) {
    document.querySelector('#promocodes-search-input').addEventListener('keyup', function() {
      const searchValue = this.value.toLowerCase();
      const cardsContainer = document.getElementById('promocodes-all');
      const cards = cardsContainer.querySelectorAll('[data-card]');

      cards.forEach(function(card) {
        const cardValue = card.querySelector('[data-card-title]').textContent.trim();

        card.parentElement.classList.remove('inactive');

        if (!cardValue.toLowerCase().includes(searchValue)) {
          card.parentElement.classList.add('inactive');
        }
      })
    })
  }

  const modalShowButtons = document.querySelectorAll('[data-target="#promocodes-card-modal"]');
  modalShowButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const activeCard = button.closest('[data-card]');
      const cardTraderUrl = activeCard.querySelector('[data-card-logo] a');
      const cardImg = activeCard.querySelector('[data-card-logo] img');
      const cardTitle = activeCard.querySelector('[data-card-title]');
      const cardDate = activeCard.querySelector('[data-card-date]');
      const cardInfo = activeCard.querySelector('[data-card-info]');
      const cardUrl = activeCard.dataset.cardUrl;

      const cardModal = document.getElementById('promocodes-card-modal');
      let modalTraderUrl = cardModal.querySelector('[data-card-modal-logo] a');
      let modalImg = cardModal.querySelector('[data-card-modal-logo] img');
      let modalTitle = cardModal.querySelector('[data-card-modal-title]');
      let modalInfo = cardModal.querySelector('[data-card-modal-info]');
      let modalUrl = cardModal.querySelector('[data-card-modal-url]');
      let modalDate = cardModal.querySelector('[data-card-modal-date]');

      if (cardTraderUrl) {
        modalTraderUrl.href = cardTraderUrl.href;
        modalImg.src = cardImg.src;
        modalImg.alt = cardImg.alt;
        cardModal.querySelector('[data-card-modal-logo]').classList.remove('promocodes-empty-logo');
      } else {
        cardModal.querySelector('[data-card-modal-logo]').classList.add('promocodes-empty-logo');
      }

      modalTitle.textContent = cardTitle.textContent.trim();
      modalInfo.textContent = cardInfo.textContent.trim();
      modalUrl.href = cardUrl;
      modalDate.textContent = cardDate.textContent.trim(); 

      cardDate.classList.contains('promocodes-date--hot') ? modalDate.classList.add('promocodes-card-modal__date--hot', 'promocodes-date--hot') : modalDate.classList.remove('promocodes-card-modal__date--hot', 'promocodes-date--hot');

      if (activeCard.dataset.cardPromocode) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const a = document.createElement('a');

        div.classList.add('promocodes-card-modal__promocode');
        span.textContent = activeCard.dataset.cardPromocode;
        a.classList.add('promocodes-card-modal__promocode--copy');
        div.append(span, a);

        modalInfo.parentNode.insertBefore(div, modalInfo.nextSibling);

      } else {
        if (document.querySelector('.promocodes-card-modal__promocode')) {
          document.querySelector('.promocodes-card-modal__promocode').remove();
        }
      }
    })
  });

  $('#promocodes-card-modal').on('hidden.bs.modal', function() {
    const cardModal = document.getElementById('promocodes-card-modal');
    let modalTraderUrl = cardModal.querySelector('[data-card-modal-logo] a');
    let modalImg = cardModal.querySelector('[data-card-modal-logo] img');
    let modalTitle = cardModal.querySelector('[data-card-modal-title]');
    let modalInfo = cardModal.querySelector('[data-card-modal-info]');
    let modalUrl = cardModal.querySelector('[data-card-modal-url]');
    let modalDate = cardModal.querySelector('[data-card-modal-date]');

    modalTraderUrl.href = '';
    modalImg.src = '';
    modalImg.alt = '';
    modalTitle.textContent = '';
    modalInfo.textContent = '';
    modalUrl.href = '';
    modalDate.textContent = '';

    modalDate.classList.remove('promocodes-card-modal__date--hot', 'promocodes-date--hot');

    if (document.querySelector('.promocodes-card-modal__promocode')) {
      document.querySelector('.promocodes-card-modal__promocode').remove();
    }
  })

  if (document.querySelector('#promocodes-card-modal')) {
    document.querySelector('#promocodes-card-modal .modal-body').addEventListener('click', function(e) {
      if (e.target.classList.contains('promocodes-card-modal__promocode--copy')) {
        console.log('good');
        const promocode = document.querySelector('.promocodes-card-modal__promocode > span').textContent; 
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
          document.querySelector('.promocodes-card-modal__promocode').classList.add('copied');

          setTimeout(() => {
            document.querySelector('.promocodes-card-modal__promocode').classList.remove('copied');
          }, 1000);

          return navigator.clipboard.writeText(promocode);
        }
        return Promise.reject('The Clipboard API is not available.');
      }
    })
  }

})