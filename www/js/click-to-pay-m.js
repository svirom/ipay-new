document.addEventListener("DOMContentLoaded", function() {
  
  const params = {
    'srcDpaId': '6bc8ee6a-Ebd5-417c-8117-377ece9bce77_dpa0', // required DPA Identifier, generated during registration.
    'dpaData': {
     'dpaName': 'Testdpa0',      //required
    },
    'dpaTransactionOptions': {
      //  dpaLocale: "en_US",      // required
      'dpaLocale': 'uk_UA',      // required
      'transactionAmount': {
        'transactionAmount': 10.00,
        'transactionCurrencyCode': 'UAH'
      },
     'acquirerData': [
        {
          'cardBrand': 'mastercard',
          'acquirerMerchantId': 'SRC3DS',
          'acquirerBIN': '545301',
        },
        {
          'cardBrand': 'visa',
          'acquirerMerchantId': '33334444',
          'acquirerBIN': '432104',
        }
      ],
    },
    'cardBrands': ['mastercard', 'visa'],  // required. Array of card brands supported.
    'checkoutExperience': 'PAYMENT_SETTINGS',
    'recognitionToken': undefined
    // 'recognitionToken': "eyJpdCI6MTc3MTQwOTc4MCwidXQiOjE3NzE0MDk3ODAsImV4IjoxNzg2OTYxNzgwLCJqaSI6InNRU1VvMEpraXZzNi1hZGNWTGxwIiwibGEiOnsibG0iOiJzdioqKioqKkBnbWFpbC5jb20ifSwiZm8iOltdfQ"
  };

  const MCCHECKOUTSERVICE = new MastercardCheckoutServices();

  // const ucsUserEmail = document.getElementById('payment-method-clicktopay').dataset.userEmail;
  // const ucsUserEmail = 'svirom@yahoo.com';
  const ucsUserEmail = 'svia.rom@gmail.com';
  // const ucsUserEmail = 'svirom@outlook.com';
  const ucsPayButton = document.querySelector('.ucs-pay-button');

  const ucsAuthenticateSubmitBtn = document.getElementById('ucs-authenticate-submit');

  const emailChangeEmail = document.getElementById('ucs-change-email');

  // const ucsInput = document.getElementById('ucs-email');
  // const buttonEmailSubmit = document.getElementById('ucs-email-submit');

  // const ucsButton = document.getElementById('api-mastercard-getCards').querySelector('src-button');

  // ---------------------------------------------------

  let serviceInitiated = false;

  async function initHandler() {
    try {
      const initResult = await MCCHECKOUTSERVICE.init(params);
      console.log('Init result:', initResult);
      await getCardsHandler();
      serviceInitiated = true;
    } catch (error) {
      console.log('Init error:', error);
      disableClickToPayRadio();
    }
  }

  // ---------------------------------------------------

  async function getCardsHandler() {
    try {
      const cardsArray = await MCCHECKOUTSERVICE.getCards();

      if (cardsArray.length === 0) {
        showAuthenticateAlert();
      } else {
        showChangeEmailAlert(ucsUserEmail);
        renderCards(cardsArray);
        selectClickToPayCardHandle();
      }
    } catch (error) {
      console.log('Get cards error:', error);
      disableClickToPayRadio();
    }
  }

  // ---------------------------------------------------

  // -------------------------------------------------------------------

  async function authenticateHandler() {
    const left = Number((screen.width / 2) - (480 / 2));
    const top = Number((screen.height / 2) - (700 / 2));
    const windowRef = window.open('', 'mastercardWindow', 'width=480,height=700,top=' + top + ',left=' + left);
    const requestParameters = {
      'windowRef': windowRef,
      'accountReference': {
        'consumerIdentity': {
          'identityType': 'EMAIL_ADDRESS',
          'identityValue': ucsUserEmail,
        }
      },
      'requestRecognitionToken': true,
    }

    try {
      console.log(windowRef);
      console.log(requestParameters);
      // const initResult = await mcCheckoutService.authenticate(requestParameters);
      showLoader();
      const authResult = await MCCHECKOUTSERVICE.authenticate(requestParameters);
      windowRef.close();
      console.log('authResult', authResult);
      const cardsArr = authResult.cards;

      hideLoader();

      if (!cardsArr || cardsArr.length === 0) {
        showEmptyCardAlert();
        disableClickToPayRadio();
      } else {
        hideAuthenticateAlert();
        showChangeEmailAlert(ucsUserEmail);
        renderCards(cardsArr);
        selectClickToPayCardHandle();
      }
    } catch (error) {
      console.log('Error name:', error.name, 'Error message:', error.message);
      // коли натиснув Це не я, треба видаляти recognition token, щоб не було нескінченних спроб авторизації
      if (error.name === 'click2PayError' && error.message === 'Not you clicked') {
        try {} catch (deleteTokenError) {}
      }
      // if (windowRef && !windowRef.closed) {
      //   windowRef.close();
      // }
      windowRef?.close();
      disableClickToPayRadio();
    }
  }

  // buttonEmailSubmit.addEventListener('click', authenticateHandler);

  // ---------------------------------------------------------------

  // async function initializeCardList(cards) {
    // const cardList = document.createElement('src-card-list');

    // cardList.setAttribute('locale', 'uk_UA');
    // cardList.setAttribute('display-preferred-card', true);
    // cardList.setAttribute('card-selection-type', 'radioButton');
    // cardList.setAttribute('display-sign-out', true);
    // cardList.setAttribute('card-brands', 'mastercard, visa');

    // document.getElementById('ucs-card-list').appendChild(cardList);
    // await customElements.whenDefined('src-card-list');
    // cardList.loadCards(cards);

    // cardList.addEventListener('selectSrcDigitalCardId', function (event) {
    //   console.log('srcDigitalCardId: ', event.detail);
    // });
    // console.log('Cards: ', cards);
  // }

  // ---------------------------------------------------------------

  // encrypt consumer's card
  const buttonCardSubmit = document.getElementById('ucs-pay-button');

  buttonCardSubmit?.addEventListener('click', function(event) {
    event.preventDefault();

    console.log(event.target);

    encryptCardHandler();
    // checkoutWithCardHandler();
  });

  async function checkoutWithCardHandler(cardData) {
    const left = Number((screen.width / 2) - (480 / 2));
    const top = Number((screen.height / 2) - (700 / 2));
    const windowRef = window.open('', 'mastercardWindow', 'width=480,height=700,top=' + top + ',left=' + left);

    const cardId = document.getElementById('cardform-ucs_id').value;

    const checkoutWithCardParams = {
      'windowRef': windowRef,
      'srcDigitalCardId': cardId,

      // 'consumer': {
      //   'emailAddress': 'svia.rom@gmail.com',
      //   'mobileNumber': {
      //     'countryCode': '380',
      //     'phoneNumber': 677593208,
      //   },
      //   'firstName': 'Sviatoslav',
      //   'lastName': 'Romaniuk',
      // },

      'dpaTransactionOptions': {
        // 'acquirerMerchantId': 'SRC3DS',
        // acquirerBIN: '414950',
        // acquirerMerchantId: '6645672',
        'merchantCategoryCode': '7399',
        'merchantCountryCode': 'UA',
        'dpaLocale': 'uk_UA',
        'threeDsPreference': 'NONE',
        'authenticationPreferences': {
          'payloadRequested': 'AUTHENTICATED',
        },
        'paymentOptions': [
          {
            'dynamicDataType': 'CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM',
          }
        ],
        'transactionAmount': {
          'transactionAmount': 10.00,
          'transactionCurrencyCode': 'UAH'
        },
        'acquirerData': [
          {
            'cardBrand': 'mastercard',
            'acquirerMerchantId': 'SRC3DS',
            'acquirerBIN': '545301',
          },
          {
            'cardBrand': 'visa',
            'acquirerMerchantId': '33334444',
            'acquirerBIN': '432104',
          }
        ],
      },

      'rememberMe': true,
     
      'complianceSettings': {
        'privacy': {
          'acceptedVersion': 'LATEST',
          'latestVersion': 'LATEST',
          'latestVersionUri': 'https://www.mastercard.com/global/click-to-pay/country-listing/privacy.html',
        },
        'tnc': {
          'acceptedVersion': 'LATEST',
          'latestVersion': 'LATEST',
          'latestVersionUri': 'https://www.mastercard.com/global/click-to-pay/country-listing/terms.html',
        }
      },


      
      // "dpaTransactionOptions": {
        
      //   "dpaBillingPreference": "FULL",
      //   "dpaAcceptedBillingCountries": [],
      //   "consumerEmailAddressRequested": true,
      //   "consumerPhoneNumberRequested": true,
      //   "merchantCountryCode": "US",
      //   "merchantOrderId": "506610rt-6858-4147-9ec2-b030f1337a7d",
       
      //   "acquirerMerchantId": "SRC3DS", //deprecated - use acquirerData
      //   "acquirerBIN": "545301", //deprecated - use acquirerData
        
      // }

    }

    try {
      console.log('checkoutWithCardParams: ', checkoutWithCardParams);

      const promiseResolvedPayload = await MCCHECKOUTSERVICE.checkoutWithCard(checkoutWithCardParams);

      console.log('resultCheckoutWithCardParams: ', promiseResolvedPayload);
    } catch (promiseRejectedPayload) {
      windowRef?.close();
      console.log(promiseRejectedPayload);
    }
  }


  async function encryptCardHandler() { // this method will return a promise
    // const buttonCardNumberInput = '4622943123113624';
    const buttonCardNumberInput = '5185600630000142';
    // const buttonCardNumberInput = '4622943123113848';
    const buttonCardExpInput = document.getElementById('ucs-card-exp');
    // const buttonCardMonthInput = buttonCardExpInput.value.replace(/\D/g,'').slice(0, 2);
    const buttonCardMonthInput = '12';
    // const buttonCardYearInput = '20' + buttonCardExpInput.value.replace(/\D/g,'').slice(-2);
    const buttonCardYearInput = '27';
    // const buttonCardCvvInput = document.getElementById('ucs-card-cvv');
    const buttonCardCvvInput = '766';

    const encryptCardParams = {
      // primaryAccountNumber: buttonCardNumberInput.value,
      primaryAccountNumber: buttonCardNumberInput,
      panExpirationMonth: buttonCardMonthInput,
      panExpirationYear: buttonCardYearInput,
      // cardSecurityCode: buttonCardCvvInput.value
      cardSecurityCode: buttonCardCvvInput,
      cardholderFirstName: 'Sviatoslav',
      cardholderLastName: 'Romaniuk',
    }

    try {
      const encryptedCard = await MCCHECKOUTSERVICE.encryptCard(encryptCardParams);
      console.log(encryptedCard);
      checkoutWithNewCardHandler(encryptedCard);
    } catch (promiseRejectedPayload) {
      console.log(promiseRejectedPayload);
    }
  }

  async function checkoutWithNewCardHandler(cardData) {
    const left = Number((screen.width / 2) - (480 / 2));
    const top = Number((screen.height / 2) - (700 / 2));
    const windowRef = window.open('', 'mastercardWindow', 'width=480,height=700,top=' + top + ',left=' + left);

    const checkoutWithNewCardParams = {
      'windowRef': windowRef,
      'encryptedCard': cardData.encryptedCard,
      'cardBrand': cardData.cardBrand,
      'consumer': {
        'emailAddress': 'svia.rom@gmail.com',
        'mobileNumber': {
          'countryCode': '380',
          'phoneNumber': '677593208',
        },
        'firstName': 'Sviatoslav',
        'lastName': 'Romaniuk',
      },
      'dpaTransactionOptions': {
        // 'acquirerBIN': '414950',
        // 'acquirerMerchantId': 'SRC3DS',
        'merchantCategoryCode': '7399',
        'merchantCountryCode': 'UA',
        'dpaLocale': 'uk_UA',
        'threeDsPreference': 'NONE',
        'authenticationPreferences': {
          'payloadRequested': 'AUTHENTICATED',
        },
        'paymentOptions': [
          {
            'dynamicDataType': 'CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM',
          }
        ],
        'transactionAmount': {
          'transactionAmount': 10.00,
          'transactionCurrencyCode': 'UAH'
        },
        "acquirerData": [
          {
            "cardBrand" : "mastercard",
            "acquirerMerchantId" : "SRC3DS",
            "acquirerBIN": "545301"
          },
          {
          "cardBrand": "visa",
          "acquirerMerchantId": "33334444",
          "acquirerBIN": "432104"
          }
        ],
      },
      'rememberMe': true,
      'recognitionTokenRequested': true,
      'complianceSettings': {
        "privacy": {
          "acceptedVersion": "LATEST",
          "latestVersion": "LATEST",
          "latestVersionUri": "https://www.mastercard.com/global/click-to-pay/country-listing/privacy.html"
        },
        "tnc": {
          "acceptedVersion": "LATEST",
          "latestVersion": "LATEST",
          "latestVersionUri": "https://www.mastercard.com/global/click-to-pay/country-listing/terms.html"
        }
      },
    }

    try {
      console.log('checkoutWithNewCardParams: ', checkoutWithNewCardParams);

      const promiseResolvedPayload = await MCCHECKOUTSERVICE.checkoutWithNewCard(checkoutWithNewCardParams);

      console.log('resultCheckoutWithNewCardParams: ', promiseResolvedPayload);
    } catch (promiseRejectedPayload) {
      windowRef?.close();
      console.log(promiseRejectedPayload);
    }
  }


  // function encryptCardHandler() {
  //   // const buttonCardNumberInput = document.getElementById('ucs-card-number');
  //   // const buttonCardNumberInput = '5186001700008785';
  //   const buttonCardNumberInput = '4622943123113624';
  //   const buttonCardExpInput = document.getElementById('ucs-card-exp');
  //   // const buttonCardMonthInput = buttonCardExpInput.value.replace(/\D/g,'').slice(0, 2);
  //   const buttonCardMonthInput = '12';
  //   // const buttonCardYearInput = '20' + buttonCardExpInput.value.replace(/\D/g,'').slice(-2);
  //   const buttonCardYearInput = '27';
  //   // const buttonCardCvvInput = document.getElementById('ucs-card-cvv');
  //   const buttonCardCvvInput = '218';

  //   const encryptCardParams = {
  //     // primaryAccountNumber: buttonCardNumberInput.value,
  //     primaryAccountNumber: buttonCardNumberInput,
  //     panExpirationMonth: buttonCardMonthInput,
  //     panExpirationYear: buttonCardYearInput,
  //     // cardSecurityCode: buttonCardCvvInput.value
  //     cardSecurityCode: buttonCardCvvInput,
  //     cardholderFirstName: 'Sviatoslav',
  //     cardholderLastName: 'Romaniuk',
  //   }

  //   // const encryptCardPromise = mcCheckoutService.encryptCard(encryptCardParams);
  //   const encryptCardPromise = MCCHECKOUTSERVICE.encryptCard(encryptCardParams);

  //   encryptCardPromise
  //     .then(function(cardData) {
  //       console.log('cardData: ', cardData);
  //       const card = document.createElement('src-card');
  //       // card.setAttribute('dark', true);
  //       card.setAttribute('descriptor-name', 'Citi');
  //       card.setAttribute('account-number-suffix', '1234');
  //       document.getElementById('ucs-payment-card').appendChild(card);

  //       const checkoutButton = document.createElement('button');
  //       checkoutButton.setAttribute('type', 'button');
  //       checkoutButton.id = 'ucs-new-card-checkout'
  //       checkoutButton.classList.add('btn', 'btn-green');
  //       checkoutButton.textContent = 'Оплатити методом';

  //       document.getElementById('ucs-payment-card').appendChild(card);
  //       document.getElementById('ucs-payment-card').appendChild(checkoutButton);

  //       $('#modal-ucs-card').modal('hide');

  //       console.log('cardData.encryptedCard: ', cardData.encryptedCard);
  //       console.log('cardData.cardBrand: ', cardData.cardBrand);

  //       const left = Number((screen.width / 2) - (480 / 2));
  //       const top = Number((screen.height / 2) - (700 / 2));
  //       const windowRef = window.open('', 'mastercardWindow', 'width=480,height=700,top=' + top + ',left=' + left);

  //       const checkoutWithNewCardParams = {
  //         windowRef: windowRef, // required.
  //         encryptedCard: cardData.encryptedCard, // required
  //         cardBrand: cardData.cardBrand, // required
  //         consumer: {
  //           emailAddress: 'svia.rom@gmail.com',
  //           mobileNumber: {
  //             countryCode: '380',
  //             phoneNumber: 677593208
  //           },
  //           firstName: 'Sviatoslav',
  //           lastName: 'Romaniuk',
  //         }, // optional
  //         dpaTransactionOptions: {
  //           paymentOptions: [
  //             {
  //               dynamicDataType: 'CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM'
  //             }
  //           ],
  //           dpaLocale: 'uk_UA', // optional
  //           merchantCountryCode: "UA",
  //           transactionAmount: {
  //             transactionAmount: 100.00, // optional
  //             transactionCurrencyCode: 'UAH' // optional
  //           }
  //         },
  //         rememberMe: true, // optional, default is false
  //         recognitionTokenRequested: true, // optional, default is false
  //       };

  //       console.log('checkoutWithNewCardParams: ', checkoutWithNewCardParams);

  //       // const checkoutWithNewCardPromise = mcCheckoutService.checkoutWithNewCard(checkoutWithNewCardParams);
  //       const checkoutWithNewCardPromise = MCCHECKOUTSERVICE.checkoutWithNewCard(checkoutWithNewCardParams);
  //       checkoutWithNewCardPromise
  //         .then(function(data) {
  //           console.log('CheckoutWithNewCard: ', data);
  //         })
  //         .catch(function(error) {
  //           console.log('Name checkout: ', error.name);
  //           console.log('Reason: ', error.reason);
  //           console.log('Details: ', error.details);
  //           console.log('Message: ', error.message);
  //         })
  //     })
  //     .catch(function(error) {
  //       console.log('Name: ', error.name);
  //       console.log('Reason: ', error.reason);
  //       console.log('Details: ', error.details);
  //       console.log('Message: ', error.message);
  //     }
  //   )
  // }

  // -----------------------------------------------------------

  

  // ------------------------render cards--------------------------------------
  function renderCards(cards) {

    console.log('Cards for render: ', cards);

    const ucsCards = document.querySelector('.ucs-cards');
    const ucsCardsSelect = document.querySelector('.ucs-cards-select');
    const ucsCardActiveId = document.getElementById('cardform-ucs_id');

    const ucsCardsMenu = document.getElementById('ucs-cards-menu');
  
    ucsCards.append(ucsCardsMenu);

    for (let [index, card] of cards.entries()) {
      const ucsCard = document.createElement('div');
      const ucsCardHeader = document.createElement('div');
      const ucsCardHeaderType = document.createElement('div');
      const ucsCardHeaderTypeImg = document.createElement('img');
      const ucsCardBody = document.createElement('div');
      const ucsCardBodyTitle = document.createElement('span');
      const ucsCardBodyMask = document.createElement('span');
      const ucsCardId = document.createElement('input');

      ucsCard.classList.add('ucs-card');
      ucsCardsMenu.append(ucsCard);

      ucsCardHeader.classList.add('ucs-card__header');
      (card['panBin'] && card['panBin'][0] === '4') && ucsCardHeader.classList.add('ucs-card__header--visa');
      ucsCardHeaderType.classList.add('ucs-card__header-type');
      ucsCardHeaderTypeImg.src = card['digitalCardData']['artUri'];
      // (card['panBin'] && card['panBin'][0] === '4') && ucsCardHeader.append(ucsCardHeaderTypeImg);
      // ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucsCardHeaderType.append(ucsCardHeaderTypeImg);
      // ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucsCardHeader.append(ucsCardHeaderType);
      ucsCardHeaderTypeImg.src && ucsCardHeader.append(ucsCardHeaderTypeImg);
      ucsCard.append(ucsCardHeader);

      ucsCardBody.classList.add('ucs-card__body');
      ucsCardBodyTitle.classList.add('ucs-card__body-network');
      (card['panBin'] && card['panBin'][0] === '4') && ucsCardBodyTitle.classList.add('ucs-card__body-network--visa');
      ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucsCardBodyTitle.classList.add('ucs-card__body-network--mastercard');
      ucsCardBodyMask.classList.add('ucs-card__body-mask');
      ucsCardBodyMask.textContent = '.... ' + card['panLastFour'];
      ucsCardBody.append(ucsCardBodyTitle);
      ucsCardBody.append(ucsCardBodyMask);
      ucsCard.append(ucsCardBody);

      if (index === 0) {
        const ucsCardActive = ucsCard.cloneNode(true);
        ucsCardsSelect.append(ucsCardActive);
        ucsCardActiveId.value = card['srcDigitalCardId'];

        ucsCardsMenu.querySelector('.ucs-card').classList.add('ucs-card--active');
      }

      ucsCardId.classList.add('ucs-card__id');
      ucsCardId.type = 'hidden';
      ucsCardId.value = card['srcDigitalCardId'];
      ucsCardId.setAttribute('elemValue', index);
      ucsCard.append(ucsCardId);
    }
  }

  // ------------------------select click to pay card handle--------------------------------------
  function selectClickToPayCardHandle() {
    // select card active
    document.getElementById('ucs-cards-menu').querySelectorAll('.ucs-card').forEach(function(card) {
      card.addEventListener('click', function() {
        document.getElementById('ucs-cards-menu').querySelectorAll('.ucs-card').forEach(function(card) {
          card.classList.remove('ucs-card--active');
        });

        const cardsSelect = document.getElementById('ucs-cards-select');

        this.classList.add('ucs-card--active');

        cardsSelect.querySelector('.ucs-card .ucs-card__header').innerHTML = this.querySelector('.ucs-card__header').innerHTML;
        this.querySelector('.ucs-card__body-network').classList.contains('ucs-card__body-network--mastercard') && cardsSelect.querySelector('.ucs-card .ucs-card__header').classList.remove('ucs-card__header--visa');
        this.querySelector('.ucs-card__body-network').classList.contains('ucs-card__body-network--visa') && cardsSelect.querySelector('.ucs-card .ucs-card__header').classList.add('ucs-card__header--visa');
        cardsSelect.querySelector('.ucs-card .ucs-card__body-network').classList.remove('ucs-card__body-network--visa', 'ucs-card__body-network--mastercard');
        this.querySelector('.ucs-card__body-network').classList.contains('ucs-card__body-network--visa') && cardsSelect.querySelector('.ucs-card .ucs-card__body-network').classList.add('ucs-card__body-network--visa');
        this.querySelector('.ucs-card__body-network').classList.contains('ucs-card__body-network--mastercard') && cardsSelect.querySelector('.ucs-card .ucs-card__body-network').classList.add('ucs-card__body-network--mastercard');
        cardsSelect.querySelector('.ucs-card .ucs-card__body-mask').textContent = this.querySelector('.ucs-card__body-mask').textContent;

        document.getElementById('cardform-ucs_id').value = this.querySelector('.ucs-card__id').value;
      }) 
    })
  }

  // -----------------------------------------------------------------------
  // ------------------------disable click-to-pay radio-------------------------
  function disableClickToPayRadio() {
    document.getElementById('customRadioClickToPay').setAttribute('disabled', true);
    document.getElementById('customRadioClickToPay').checked = false;
    document.getElementById('customRadioClickToPay').nextElementSibling.setAttribute('aria-expanded', false);
    document.getElementById('radio-clicktopay').classList.remove('show');
    document.getElementById('payment-method-clicktopay').style.pointerEvents = 'none';
    document.getElementById('customRadioCard').checked = true;
    document.getElementById('customRadioCard').nextElementSibling.setAttribute('aria-expanded', true);
    document.getElementById('radio-customcard').classList.add('show');
    if (document.getElementById('cardform-masterpass_uid')) {
      document.getElementById('cardform-masterpass_uid').value = '';
    }
    ucsPayButton.setAttribute('disabled', true);
  }

  
  // prevent active payment method collapse on click on it (custom.js)
  $('#payment-method-widget [type="radio"]').on('change', function(e) {
    $('#payment-method-widget').find('[type="radio"]').prop('checked', false);
    $(e.target).prop('checked',true);
    $(e.target).parents('.payment-method__radio').find('.collapse').collapse('show');
  });


  // ----------------------------------------------

  window.addEventListener('load', async function() {
    if (!serviceInitiated) {
      await initHandler();
      console.log('Init script called');
    }
    // await getCardsHandler();
    
    hideLoader();
    // console.log('getCards script called');
  });

  ucsAuthenticateSubmitBtn?.addEventListener('click', async function() {
    await authenticateHandler();
  });




  // -----------------------------------------------------------

  // show loader
  function showLoader() {
    const loader = document.getElementById('ucs-checking');

    loader.classList.remove('d-none');
  }

  // hide loader
  function hideLoader() {
    const loader = document.getElementById('ucs-checking');

    loader.classList.add('d-none');
  }

  // -----------------------------------------------------------------

  // show authenticate alert
  function showAuthenticateAlert() {
    document.getElementById('ucs-authenticate-alert').classList.remove('d-none');
  }

  // hide authenticate alert
  function hideAuthenticateAlert() {
    document.getElementById('ucs-authenticate-alert').classList.add('d-none');
  }

  // -----------------------------------------------------------------

  // show empty card alert
  function showEmptyCardAlert() {
    document.getElementById('ucs-empty-card').classList.remove('d-none');
  }

  // hide empty card alert
  function hideEmptyCardAlert() {
    document.getElementById('ucs-empty-card').classList.add('d-none');
  }

  // -----------------------------------------------------------------

  // show change email alert
  function showChangeEmailAlert(email) {
    emailChangeEmail.textContent = email;
    document.getElementById('ucs-change-alert').classList.remove('d-none');
    document.getElementById('ucs-change-alert').classList.add('d-flex');
  }

  // hide change email alert
  function hideChangeEmailAlert() {
    document.getElementById('ucs-change-alert').classList.add('d-none');
    document.getElementById('ucs-change-alert').classList.remove('d-flex');
  }

});