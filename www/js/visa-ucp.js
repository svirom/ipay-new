document.addEventListener("DOMContentLoaded", function() {

  const ucpCheckingLoader = document.getElementById('ucp-checking');
  const ucpPayButton = document.querySelector('.ucp-pay-button');
  
  // const identityEmail = 'svia.rom@gmail.com';
  // const identityEmail = 'svirom@yahoo.com';
  // const identityEmail = 'svirom@outlook.com';
  // const identityEmail = 'svirom25@ukr.net';
  // const identityEmail = 'svia.rom28051982@gmail.com';
  // const identityEmail = 'svia.rom2805198222@gmail.com';
 
  // pending
  const ucpPendingAlert = document.getElementById('ucp-pending-alert');
  const ucpOtp = document.getElementById('ucp-pending-otp');
  const ucpOtpSubmit = document.getElementById('ucp-otp-submit');
  const ucpOtpSendAgain = document.getElementById('ucp-pending-send');
  const otpTimeDelay = 60;

  // inputs
  const inputEncryptedPayload = document.getElementById('clicktopayform-encryptedpayload');
  const inputEci = document.getElementById('clicktopayform-eci');

  const paymentMethodClicktopay = document.getElementById('payment-method-clicktopay');
  const identityEmail = paymentMethodClicktopay.dataset.userEmail;
  const identityPhone = paymentMethodClicktopay.dataset.userPhone;
  const ucpTransactionAmount = paymentMethodClicktopay.dataset.paymentAmount;

  // payment guid
  const paymentGuid = paymentMethodClicktopay.dataset.paymentGuid;

  // add card to click-to-pay checkbox
  const ucpAddCard = document.getElementById('ucp-add-card');
  const ucpAddCardCheckbox = document.getElementById('ucp-checkbox');
  const ucpAddCardFields = document.getElementById('ucp-add-card-fields');

  const isClickToPayPayment = document.getElementById('customRadioClickToPay');
  const isCardPayment = document.getElementById('customRadioCard');

  // form
  const form = document.getElementById('cardform');

  const cardPan = document.getElementById('cardform-pan');
  const cardExp = document.getElementById('cardform-exp');
  const cardCvv = document.getElementById('cardform-cvv');

  const userEmail = document.getElementById('ucp-add-card-email');
  const userPhone = document.getElementById('ucp-add-card-phone');
  const userFirstName = document.getElementById('ucp-add-card-name');
  const userLastName = document.getElementById('ucp-add-card-surname');

  const inputFields = [cardPan, cardExp, cardCvv, userEmail, userPhone, userFirstName, userLastName];

  const consumerIdentity = {
    "identityType": "EMAIL_ADDRESS",
    "identityValue": identityEmail
  };

  const ch = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ю': 'Yu', 'Я': 'Ya', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'iu', 'я': 'ia', 'Ё': 'YO', 'Ъ': '', 'ё': 'yo', 'ъ': '', 'Ы': 'Y', 'Э': 'E', 'ы': 'y', 'э': 'e'
  };


  window.addEventListener('load', function() {

    let initUcp = async function () {

      // Create a shorthand reference to the Visa Checkout SDK
      const Vsb = window.VSDK;
  
      // Define your DpaTransactionOptions
      const dpaTransactionOptions = {
        transactionAmount: {
          transactionAmount: ucpTransactionAmount,
          transactionCurrencyCode: 'UAH'
        },
        dpaShippingPreference: 'NONE',
        dpaBillingPreference: 'NONE',
        payloadTypeIndicatorCheckout: 'FULL',
        paymentOptions: [
          {
            dpaDynamicDataTtlMinutes: 2,
            dynamicDataType: 'CARD_APPLICATION_CRYPTOGRAM_LONG_FORM'
          }
        ],
        dpaLocale: 'uk_UA'
      };
  
      // Initialize the Visa Checkout SDK with your DpaTransactionOptions
      try {
        await Vsb.initialize({
          dpaTransactionOptions: dpaTransactionOptions
        });
  
        //Invoke getCards and other apis here onwards
        const cards = await Vsb.getCards({ consumerIdentity });
  
        return {Vsb, cards};
  
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };

    initUcp()
      .then(function({Vsb, cards}) {
        const { actionCode } = cards;

        // console.log('Init cards:', cards);

        ucpCheckingLoader.classList.add('d-none');

        switch (actionCode) {

          case 'SUCCESS':
            //handle getCards response in UI
            console.log('Handle getCards response in the UI ', cards);
            renderCards(cards);
            selectClickToPayCardHandle();
            break;

          // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
          case 'PENDING_CONSUMER_IDV':
            ucpPendingAlert.classList.remove('d-none');

            sendOtpAgainClicktopayHandler(otpTimeDelay, event);
            
            ucpOtpSubmit.addEventListener('click', function(event) {
              event.preventDefault();

              cards = Vsb.getCards({
                "consumerIdentity": {
                  "identityType": "EMAIL_ADDRESS",
                  "identityValue": identityEmail
                },
                "validationData": ucpOtp.value,
                "complianceSettings": {
                  "complianceResources": [
                    {
                      "complianceType": 'REMEMBER_ME',
                      "uri": 'www.ipay.ua/media/files/Privacy-policy.pdf'
                    },
                    {
                      "complianceType": 'TERMS_AND_CONDITIONS',
                      "uri": 'www.ipay.ua/media/files/public-offer.pdf'
                    },
                    {
                      "complianceType": 'PRIVACY_POLICY',
                      "uri": 'www.ipay.ua/media/files/Privacy-policy.pdf'
                    } 
                  ]
                },
              });

              ucpOtpSubmit.setAttribute('disabled', true);
              ucpPendingAlert.querySelector('.help-block').classList.remove('visible');

              sendOtpAgainClicktopayHandler(otpTimeDelay, event);

              cards
                .then(function(result) {
                  // console.log(result);

                  if (result.actionCode === 'SUCCESS') {
                    ucpPendingAlert.classList.add('d-none');
                    renderCards(result);

                    selectClickToPayCardHandle();

                    console.log('PENDING_CONSUMER_IDV -> SUCCESS', result);
                  } else {
                    ucpOtpSubmit.removeAttribute('disabled');
                    ucpPendingAlert.querySelector('.help-block').classList.add('visible');
                    ucpOtpSendAgain.classList.remove('d-none');
                  }
                })
                .catch(function(err) {
                  console.log(err);
                })
            })
            
            console.log('PENDING_CONSUMER_IDV', cards);
            break;

          case 'ERROR':
            console.log('Handle error cases:');
            break;

          default:
            console.log('No cards found >> ', cards.actionCode);
            // console.log('No cards found: ', cards);
            break;
        }


        // onload if Click to pay checked
        if (isClickToPayPayment.checked) {
          if (document.getElementById('cardform-masterpass_uid')) {
            document.getElementById('cardform-masterpass_uid').value = '';
          }
          cardPan.value = '';
          cardExp.value = '';
          cardCvv.value = '';
        }

        // required fields transliteration
        const inputFieldsTransliteration = [userFirstName, userLastName];
        inputFieldsTransliteration.forEach(function(transliterationField) {
          const transliterationResult = transliterate(transliterationField.dataset.value);
          transliterationField.value = transliterationResult;
        })


        // make Click to pay radio section disabled
        if (!['SUCCESS', 'PENDING_CONSUMER_IDV'].includes(actionCode)) {
          document.getElementById('customRadioClickToPay').setAttribute('disabled', true);
          document.getElementById('customRadioClickToPay').removeAttribute('checked');
          document.getElementById('customRadioClickToPay').nextElementSibling.setAttribute('aria-expanded', false);
          document.getElementById('radio-clicktopay').classList.remove('show');
          document.getElementById('payment-method-clicktopay').style.pointerEvents = 'none';
          document.getElementById('customRadioCard').setAttribute('checked', true);
          document.getElementById('customRadioCard').nextElementSibling.setAttribute('aria-expanded', true);
          document.getElementById('radio-customcard').classList.add('show');
          if (document.getElementById('cardform-masterpass_uid')) {
            document.getElementById('cardform-masterpass_uid').value = '';
          }
          ucpPayButton.setAttribute('disabled', true);
        }


        // make checkbox section visible
        if (!['ERROR', undefined].includes(actionCode)) {
          // console.log('nice');
          ucpAddCard.classList.remove('d-none');
        } else {
          console.log('some error');
        }


        // checkbox button
        ucpAddCardCheckbox.addEventListener('click', function() {
          if (ucpAddCardCheckbox.checked === true) {
            ucpAddCardFields.classList.remove('d-none');
          } else {
            ucpAddCardFields.classList.add('d-none');
          }
        });


        // submit button
        ucpPayButton.addEventListener('click', function(event) {
          if (isClickToPayPayment.checked || ((isCardPayment.checked && ucpAddCardCheckbox.checked))) {
            event.preventDefault();
            
            submitCheckout(Vsb);
          }
        });


        // send again button
        ucpOtpSendAgain.addEventListener('click', function() {
          const otpSend = Vsb.initiateIdentityValidation({});

          sendOtpAgainClicktopayHandler(otpTimeDelay, event);

          otpSend
            .then(function(result) {
              // console.log('result otpSendButton', result);
            })
            .catch(function(err) {
              console.log('error', err);
            })
        });

      })
      .catch((err) => {
        console.log(err);
      });
  
  })


  // ------------------------render cards--------------------------------------
  function renderCards(result) {

    const resultProfile = result.hasOwnProperty('profiles') ? result['profiles'] : [];
    const maskedCards = resultProfile.filter(function(cards) {
      return cards.hasOwnProperty('maskedCards');
    })

    const cardsList = maskedCards[0]['maskedCards'];
    // console.log(resultProfile);
    // console.log(cardsList);

    const ucpCards = document.querySelector('.ucp-cards');
    const ucpCardsSelect = document.querySelector('.ucp-cards-select');
    const ucpCardActiveId = document.getElementById('cardform-ucp_id');

    const ucpCardsMenu = document.createElement('div');

    // cards dropdown menu
    ucpCardsMenu.id = 'ucp-cards-menu';
    ucpCardsMenu.classList.add('dropdown-menu');
    ucpCardsMenu.setAttribute('ariaLabelledby', 'ucp-cards-select');
  
    // ucpPayment.append(ucpCards);
  
    ucpCards.append(ucpCardsMenu);

    for (let [index, card] of cardsList.entries()) {
      const ucpCard = document.createElement('div');
      const ucpCardHeader = document.createElement('div');
      const ucpCardHeaderType = document.createElement('div');
      const ucpCardHeaderTypeImg = document.createElement('img');
      const ucpCardBody = document.createElement('div');
      const ucpCardBodyTitle = document.createElement('span');
      const ucpCardBodyMask = document.createElement('span');
      const ucpCardId = document.createElement('input');

      ucpCard.classList.add('ucp-card');
      ucpCardsMenu.append(ucpCard);

      ucpCardHeader.classList.add('ucp-card__header');
      card['panBin'][0] === '4' && ucpCardHeader.classList.add('ucp-card__header--visa');
      ucpCardHeaderType.classList.add('ucp-card__header-type');
      ucpCardHeaderTypeImg.src = card['digitalCardData']['artUri'];
      // ucpCardHeaderType.append(ucpCardHeaderTypeImg);
      // ucpCardHeader.append(ucpCardHeaderType);
      (card['panBin'] && card['panBin'][0] === '4') && ucpCardHeader.append(ucpCardHeaderTypeImg);
      ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucpCardHeaderType.append(ucpCardHeaderTypeImg);
      ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucpCardHeader.append(ucpCardHeaderType);
      ucpCard.append(ucpCardHeader);

      ucpCardBody.classList.add('ucp-card__body');
      ucpCardBodyTitle.classList.add('ucp-card__body-network');
      (card['panBin'] && card['panBin'][0] === '4') && ucpCardBodyTitle.classList.add('ucp-card__body-network--visa');
      ((card['panBin'] && card['panBin'][0] === '5') || (card['paymentCardDescriptor'] && card['paymentCardDescriptor'] === 'mastercard')) && ucpCardBodyTitle.classList.add('ucp-card__body-network--mastercard');
      ucpCardBodyMask.classList.add('ucp-card__body-mask');
      ucpCardBodyMask.textContent = '.... ' + card['panLastFour'];
      ucpCardBody.append(ucpCardBodyTitle);
      ucpCardBody.append(ucpCardBodyMask);
      ucpCard.append(ucpCardBody);

      if (index === 0) {
        const ucpCardActive = ucpCard.cloneNode(true);
        ucpCardsSelect.append(ucpCardActive);
        ucpCardActiveId.value = card['srcDigitalCardId'];

        ucpCardsMenu.querySelector('.ucp-card').classList.add('ucp-card--active');
      }

      ucpCardId.classList.add('ucp-card__id');
      ucpCardId.type = 'hidden';
      ucpCardId.value = card['srcDigitalCardId'];
      ucpCardId.setAttribute('elemValue', index);
      ucpCard.append(ucpCardId);
    }
  }


  // ------------------------select click to pay card handle--------------------------------------
  function selectClickToPayCardHandle() {
    // select card active
    document.getElementById('ucp-cards-menu').querySelectorAll('.ucp-card').forEach(function(card) {
      card.addEventListener('click', function() {
        document.getElementById('ucp-cards-menu').querySelectorAll('.ucp-card').forEach(function(card) {
          card.classList.remove('ucp-card--active');
        });

        const cardsSelect = document.getElementById('ucp-cards-select');

        this.classList.add('ucp-card--active');

        cardsSelect.querySelector('.ucp-card .ucp-card__header').innerHTML = this.querySelector('.ucp-card__header').innerHTML;
        this.querySelector('.ucp-card__body-network').classList.contains('ucp-card__body-network--mastercard') && cardsSelect.querySelector('.ucp-card .ucp-card__header').classList.remove('ucp-card__header--visa');
        this.querySelector('.ucp-card__body-network').classList.contains('ucp-card__body-network--visa') && cardsSelect.querySelector('.ucp-card .ucp-card__header').classList.add('ucp-card__header--visa');
        cardsSelect.querySelector('.ucp-card .ucp-card__body-network').classList.remove('ucp-card__body-network--visa', 'ucp-card__body-network--mastercard');
        this.querySelector('.ucp-card__body-network').classList.contains('ucp-card__body-network--visa') && cardsSelect.querySelector('.ucp-card .ucp-card__body-network').classList.add('ucp-card__body-network--visa');
        this.querySelector('.ucp-card__body-network').classList.contains('ucp-card__body-network--mastercard') && cardsSelect.querySelector('.ucp-card .ucp-card__body-network').classList.add('ucp-card__body-network--mastercard');
        cardsSelect.querySelector('.ucp-card .ucp-card__body-mask').textContent = this.querySelector('.ucp-card__body-mask').textContent;

        document.getElementById('cardform-ucp_id').value = this.querySelector('.ucp-card__id').value;
      }) 
    })
  }


  // ------------------------submit checkout--------------------------------------
  function submitCheckout(Vsb) {

    // add new card to click to pay account
    if (isCardPayment.checked && ucpAddCardCheckbox.checked) {

      const cardPanValue = cardPan.value.replace(/[^0-9]/g, '');
      const cardExpMonthValue = cardExp.value.replace(/[^0-9]/g, '').length === 4 ? cardExp.value.replace(/[^0-9]/g, '').slice(0, 2) : '';
      const cardExpYearValue = cardExp.value.replace(/[^0-9]/g, '').length === 4 ? '20' + cardExp.value.replace(/[^0-9]/g, '').slice(2) : '';
      const cardCvvValue = cardCvv.value;

      const userEmailValue = userEmail.value ? userEmail.value : identityEmail;
      const userPhoneValue = userPhone.value ? userPhone.value : identityPhone;
      const userFullNameValue = userFirstName.value + ' ' + userLastName.value;

      const inputValues = [cardPanValue, cardExpMonthValue, cardExpYearValue, cardCvvValue, userEmailValue, userPhoneValue, userFullNameValue];

      // add error classes to extra field
      const inputExtraFields = inputFields.slice(4);
      inputExtraFields.forEach(function(inputField) {
        if ( (inputField.value === '') || 
          ((inputField === userFirstName) && !(/^[A-Za-z\s\-]+$/).test(inputField.value)) ||
          ((inputField === userLastName) && !(/^[A-Za-z\s\-]+$/).test(inputField.value)) ) {
            inputField.parentElement.classList.add('has-error');
        } else {
          inputField.parentElement.classList.remove('has-error');
        }
      });

      // preloader start
      showLoader();

      if (!inputValues.includes('')) {
        // check card fields
        jQuery('#cardform').data('yiiActiveForm').submitting = false;
        jQuery('#cardform').yiiActiveForm('validateAttribute', 'cardform-pan');
        jQuery('#cardform').yiiActiveForm('validateAttribute', 'cardform-exp');
        jQuery('#cardform').yiiActiveForm('validateAttribute', 'cardform-cvv');

        setTimeout(function() {
          let fieldsError = inputFields.filter(function(field) {
            return field.parentElement.classList.contains('has-error');
          });

          if (fieldsError.length === 0) {

            // console.log('checkout success!');

            fetch('/secure/click-to-pay/encryption', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({ payload: '{"card":{"primaryAccountNumber":"' + cardPanValue + '","panExpirationMonth":"' + cardExpMonthValue + '","panExpirationYear":"' + cardExpYearValue + '","cardSecurityCode":"' + cardCvvValue + '","cardholderFullName":"' + userFullNameValue + '","billingAddress":{"countryCode":"UA"}}}', _csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content') }),
            })
              .then(response => response.json())
              .then(result => {
                // console.log(result);
                if (result.status === 'success') {
                  addNewCardCheckout(Vsb, result.jweToken, userEmailValue, userPhoneValue, userFullNameValue);
                }
              })
              .catch(error => {
                console.error('Fetch error:', error);
                // form submit
                form.submit();
              })

          } else {
            console.log('there are errors in fields');

            // preloader finish
            hideLoader();
          }
        }, 300);
      } else {
        console.log('everything is not ok!');

        // preloader finish
        hideLoader();
      }

    }


    // click to pay selected card checkout
    if (isClickToPayPayment.checked) {
      const ucpCardActiveId = document.getElementById('cardform-ucp_id');
      const srcDigitalCardId = ucpCardActiveId.value;

      const checkoutParameters = {
        srcDigitalCardId: srcDigitalCardId,
        windowRef: "",
        dpaTransactionOptions: {
          dpaBillingPreference: 'NONE',
          paymentOptions: [
            {
              dpaDynamicDataTtlMinutes: 2,
              dynamicDataType: 'CARD_APPLICATION_CRYPTOGRAM_LONG_FORM'
            }
          ],
          dpaLocale: 'uk_UA',
          acquirerBIN: '455555',
          merchantName: 'iPay',
          acquirerMerchantId: '123456789',
          transactionAmount: {
            transactionAmount: ucpTransactionAmount,
            transactionCurrencyCode: 'UAH'
          }
        },
        payloadTypeIndicatorCheckout: 'FULL',
        authenticationPreferences: {
          payloadRequested: "AUTHENTICATED",
          authenticationMethods: [
            {
              authenticationMethodType: "3DS",
              authenticationSubject: "CARDHOLDER",
              methodAttributes: {
                challengeIndicator: "01"
              }
            }
          ],
          suppressChallenge: false
        },
        "authenticationContext": {
            "authenticationReasons": [
                "TRANSACTION_AUTHENTICATION"
            ],
        },
      };

      // console.log('checkoutParameters (existing card):', checkoutParameters);

      // Call checkout
      const checkoutResponse = Vsb.checkout(checkoutParameters);
          
      // Log the checkout response
      // console.log(checkoutResponse);

      // preloader start
      showLoader();

      checkoutResponse
        .then(function(res) {
          console.log('response checkout', res);

          if (res.actionCode === 'SUCCESS') {
            let checkoutResponseObject = res.checkoutResponse;
            checkoutResponseObject = checkoutResponseObject.split('.');

            const checkoutResponse = checkoutResponseObject[1];

            // console.log('checkoutResponse: ', checkoutResponse);
            let checkoutResponseDecoded = atob(checkoutResponse);
            checkoutResponseDecoded = JSON.parse(checkoutResponseDecoded);
            // console.log(checkoutResponseDecoded);

            const encryptedPayload = checkoutResponseDecoded.encryptedPayload;

            const checkoutResponseAssuranceData = checkoutResponseDecoded.hasOwnProperty('assuranceData') ? checkoutResponseDecoded['assuranceData'] : '';
            const eci = checkoutResponseAssuranceData.hasOwnProperty('eci') ? checkoutResponseAssuranceData['eci'] : '';

            inputEncryptedPayload.value = encryptedPayload;
            inputEci.value = eci;
            
            // console.log('encryptedPayload: ', encryptedPayload);
            // console.log('eci: ', eci);

            // form submit
            form.submit();

          } else {
            // preloader finish
            hideLoader();
          }

          
        })
        .catch(function(err) {
          console.log('error', err);
          // preloader finish
          hideLoader();
        })
    }

  }

  // ------------------------add new card checkout--------------------------------------
  function addNewCardCheckout(Vsb, jweToken, email, phone, fullName) {

    // const encryptedCard = jweToken;
    const encryptedCard = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIiwiaWF0IjoxNzQwNzM3NzYyNjIwLCJraWQiOiJZU0taQlQxQTNDSkxaSFYyUEhQUTEzeW9fRGxIWHozYVFENlBKM2lheGtQQm5zYldVIn0.AYLb2KpOxgCZBvciS3DyIoQVvtK-OIiOWcXvrU6749_2cgcQkXDjAu-juJ4Eev98uxqSsgczJT87NqaX10e_6ffAQvCDwpfnp2iKdwXJOWFxQJXI4z-03qpT5JhDlYhufTWcPc_C2n4k6CqgwVyMD3G9J6fZ7A6ZxAbGosRxgm5DtVh8N4xUwmV32bHX_Yn45iaCljTt2ionAMRmSMF3ilWPH6WCN_dPb7aEVUW-MgXvebYBdG1hBEfjbl0uhROC6tpSpd1B3ngH6BG2qtijatASAGSZ7_8rqC3NYrBIupA__QmRsbFgrF8UQ8UdwpsNWmirCFWPUWqD3XBqEhVZQg.4c4O6WnlGdMmGMsB.tDxfoaGR3aZeEvpp-yxF0d17wbTbmlFCOH86MiMsrpB-vPNMaN1VMsHBkC7rq-2Wz4I5XXJWpw8WOdp71XP0b6zgHC7gMuQaHIZk0yI0fiUSm2bG9shzGZAySPgQ1-5kn7xnXvf_WhYbiLlzSW_mAIKDYgCKZx-SRRXh9iL3tkv9t6ieouX6BblwGEqyaZp3WT7sgW4tspxz9aFXwO4g73JJj12H_X7IyaBAYOI9UN4iKT4InXG6x5ijvl3pZXXzr9Pm96TjaVskMA83awhfxPk_po-AtAQeKmC8eevkbkEnKrchKqDCs_Qutv9a2lGmWzvxNlpe8Sp8X6RJcTB470RdYiXmGbekc4wZEDEhIydPpAt_Gp1STXp9qJyj_pXyFp-7oLfF1AVC.rH9sSvTIkQ2yqUXzAoZG-g';

    const checkoutParameters = {
      encryptedCard: encryptedCard,
      consumer: {
        consumerIdentity: {
          identityValue: email,
          identityType: "EMAIL_ADDRESS"
        },
        fullName: fullName,
        mobileNumber: {
          countryCode: '380',
          phoneNumber: phone.slice(3)
        }
      },
      complianceSettings: {
        complianceResources: [
          {
            complianceType: 'REMEMBER_ME',
            uri: 'www.ipay.ua/media/files/Privacy-policy.pdf'
          },
          {
            complianceType: 'TERMS_AND_CONDITIONS',
            uri: 'www.ipay.ua/media/files/public-offer.pdf'
          },
          {
            complianceType: 'PRIVACY_POLICY',
            uri: 'www.ipay.ua/media/files/Privacy-policy.pdf'
          } 
        ]
      },
      dpaTransactionOptions: {
        paymentOptions: [
          {
            dpaDynamicDataTtlMinutes: 2,
            dynamicDataType: 'CARD_APPLICATION_CRYPTOGRAM_LONG_FORM'
          }
        ],
        dpaLocale: 'uk_UA',
        acquirerBIN: '455555',
        merchantName: 'iPay',
        acquirerMerchantId: '123456789',
        transactionAmount: {
          transactionAmount: ucpTransactionAmount,
          transactionCurrencyCode: 'UAH'
        }
      },
      authenticationMethodType: '3DS',
      payloadRequested: 'AUTHENTICATED'
    };

    console.log(checkoutParameters);
  
    // Call checkout
    const checkoutResponse = Vsb.checkout(checkoutParameters);
    
    // Log the checkout response
    console.log(checkoutResponse);

    checkoutResponse
      .then(function(result) {
        console.log('result', result);
        if (result.actionCode === 'SUCCESS') {
          document.cookie = 'addNewCardClicktopay=' + paymentGuid + '; max-age=3600; path=/';
        }
      })
      .catch(function(err) {
        console.log('error', err);
      })
      .finally(function() {
        // form submit
        form.submit();
        // preloader start
        showLoader();
        console.log('finally');
      });
  }

  // ------------------------wipe out masterpass & card data when choose click to pay--------------------------------------
  document.getElementById('payment-choose-clicktopay').addEventListener('click', function() {
    if (document.getElementById('cardform-masterpass_uid')) {
      document.getElementById('cardform-masterpass_uid').value = '';
    }
    cardPan.value = '';
    cardExp.value = '';
    cardCvv.value = '';
  });

  // ------------------------wipe out click to pay inputs when choose masterpass--------------------------------------
  document.getElementById('payment-choose-masterpass').addEventListener('click', function() {
    inputEncryptedPayload.value = '';
    inputEci.value = '';
  });

  // ------------------------wipe out click to pay when choose custom card--------------------------------------
  document.getElementById('payment-choose-card').addEventListener('click', function() {
    inputEncryptedPayload.value = '';
    inputEci.value = '';
  });


  // ------------------------send otp again button--------------------------------------
  function sendOtpAgainClicktopayHandler(time, event) {
    event.preventDefault();
    !ucpOtpSendAgain.classList.contains('d-none') ? ucpOtpSendAgain.classList.add('d-none') : '';

    var sendOtpClicktopayButton = setInterval(function() {
      time-=1;
      if (time < 0) {
        clearInterval(sendOtpClicktopayButton);
        ucpOtpSendAgain.classList.remove('d-none');
      }
    }, 1000);
  }


  // ------------------------loader show function--------------------------------------
  function showLoader() {
    const lang = document.documentElement.getAttribute('lang');
    let loadingText = '';

    switch (lang) {
      case 'ru-RU':
        loadingText = 'Осуществляется обработка данных';
        break;
      case 'uk-UA':
        loadingText = 'Здійснюється обробка даних';
        break;
      case 'en-US':
        loadingText = 'The data are processed';
        break;
      default:
        loadingText = 'Осуществляется обработка данных';
    }

    let html = '';

    html += '<div class="container-loader">';
    html += '<div class="loader-wrapper">';
    html += '<div class="loader--text">' + loadingText + '</div>';
    html += '<div class="loader">';
    html += '<div class="loader--dot"></div>';
    html += '<div class="loader--dot"></div>';
    html += '<div class="loader--dot"></div>';
    html += '<div class="loader--dot"></div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    document.body.classList.add('overflow-hidden');
    document.getElementById('loading').innerHTML = html;
  }

  // ------------------------loader hide function--------------------------------------
  function hideLoader() {
    document.body.classList.remove('overflow-hidden');
    document.getElementById('loading').innerHTML = '';
  }

  
  // ------------------------click to pay popover--------------------------------------
  let popoverOptions = {
    trigger: 'toggle',
    placement: 'right',
    template: '<div class="popover popover-main" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
  }

  jQuery("#clicktopay-popover").popover(popoverOptions);

  if (window.innerWidth < 768) {
    popoverOptions.placement = 'bottom';
  }


  // ------------------------deny cyryllic symbols add card fields--------------------------------------
  inputFields.slice(4).forEach(function(inputField) {
    inputField.addEventListener('input', function () {
      this.value = this.value.replace(/[А-Яа-яЁёЇїІіЄєҐґ]/g, '');
    });
  })

  // ------------------------cyrillic symbols transliteration--------------------------------------
  function transliterate(word){
    return word.split('').map(function (char, index) {
      if (index === 0) {
        switch (char) {
          case 'є':
            return 'ye';
          case 'ї':
            return 'yi';
          case 'й':
            return 'y';
          case 'ю':
            return 'yu';
          case 'я':
            return 'ya';
          default:
            return ch[char] || char;
        }
      }
      
      return ch[char] || char; 
    }).join('');
  }
   
})
