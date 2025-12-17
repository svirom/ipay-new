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
      const cardName = activeCard.querySelector('[data-card-name]');
      const cardTitle = activeCard.querySelector('[data-card-title]');
      const cardDiscountNumber = activeCard.querySelector('[data-card-discount-number]');
      const cardDiscountDate = activeCard.querySelector('[data-card-discount-date]');
      const cardInfo = activeCard.querySelector('[data-card-info]');
      const cardUrl = activeCard.dataset.cardUrl;

      const cardModal = document.getElementById('promocodes-card-modal');
      let modalTraderUrl = cardModal.querySelector('[data-card-modal-logo] a');
      let modalImg = cardModal.querySelector('[data-card-modal-logo] img');
      let modalName = cardModal.querySelector('[data-card-modal-name]');
      let modalTitle = cardModal.querySelector('[data-card-modal-title]');
      let modalInfo = cardModal.querySelector('[data-card-modal-info]');
      let modalUrl = cardModal.querySelector('[data-card-modal-url]');
      let modalDiscountNumber = cardModal.querySelector('[data-card-modal-discount-number]');
      let modalDiscountDate = cardModal.querySelector('[data-card-modal-discount-date]');

      if (cardTraderUrl) {
        modalTraderUrl.href = cardTraderUrl.href;
        modalImg.src = cardImg.src;
        modalImg.alt = cardImg.alt;
        cardModal.querySelector('[data-card-modal-logo]').classList.remove('promocodes-empty-logo');
      } else {
        cardModal.querySelector('[data-card-modal-logo]').classList.add('promocodes-empty-logo');
      }

      modalName.textContent = cardName.textContent.trim();
      modalName.href = cardName.href;
      modalTitle.textContent = cardTitle.textContent.trim();
      modalInfo.textContent = cardInfo.textContent.trim();
      modalUrl.href = cardUrl;

      if (cardDiscountNumber) {
        modalDiscountNumber.classList.remove('d-none');
        modalDiscountNumber.textContent = cardDiscountNumber.textContent.trim();
        cardDiscountNumber.classList.contains('promocodes-card__discount-number--top') ? modalDiscountNumber.classList.add('promocodes-card-modal__discount-number--top') : modalDiscountNumber.classList.remove('promocodes-card-modal__discount-number--top');
      }
      modalDiscountDate.textContent = cardDiscountDate.textContent.trim();
      cardDiscountDate.classList.contains('promocodes-card__discount-date--hot') ? modalDiscountDate.classList.add('promocodes-card-modal__discount-date--hot', 'promocodes-discount-date--hot') : modalDiscountDate.classList.remove('promocodes-card-modal__discount-date--hot', 'promocodes-discount-date--hot');

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
    let modalName = cardModal.querySelector('[data-card-modal-name]');
    let modalTitle = cardModal.querySelector('[data-card-modal-title]');
    let modalInfo = cardModal.querySelector('[data-card-modal-info]');
    let modalUrl = cardModal.querySelector('[data-card-modal-url]');
    let modalDiscountNumber = cardModal.querySelector('[data-card-modal-discount-number]');
    let modalDiscountDate = cardModal.querySelector('[data-card-modal-discount-date]');

    modalTraderUrl.href = '';
    modalImg.src = '';
    modalImg.alt = '';
    modalName.textContent = '';
    modalName.href = '';
    modalTitle.textContent = '';
    modalInfo.textContent = '';
    modalUrl.href = '';
    modalDiscountNumber.textContent = '';
    modalDiscountDate.textContent = '';

    modalDiscountNumber.classList.remove('promocodes-card-modal__discount-number--top');
    modalDiscountDate.classList.remove('promocodes-card-modal__discount-date--hot', 'promocodes-discount-date--hot');
    modalDiscountNumber.classList.add('d-none');

    if (document.querySelector('.promocodes-card-modal__promocode')) {
      document.querySelector('.promocodes-card-modal__promocode').remove();
    }
  })

  if (document.querySelector('#promocodes-card-modal')) {
    document.querySelector('#promocodes-card-modal .modal-body').addEventListener('click', function(e) {
      if (e.target.classList.contains('promocodes-card-modal__promocode--copy')) {
        console.log('promocode copied');
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