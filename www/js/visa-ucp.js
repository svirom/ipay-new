// document.addEventListener("DOMContentLoaded", function() {

  const ucpButton = document.getElementById('api-visa-button');
  const ucpPayButton = document.getElementById('ucp-pay-button');
  const ucpPendingAlert = document.getElementById('ucp-pending-alert');
  // const identityEmail = 'svia.rom@gmail.com';
  // const identityEmail = 'svirom@yahoo.com';
  const identityEmail = 'svirom@outlook.com';
  const ucpCheckbox = document.getElementById('checkbox-ucp');
  const ucpOtp = document.getElementById('ucp-pending-otp');
  const ucpOtpSubmit = document.getElementById('ucp-otp-submit');

  const ucpTransactionAmount = '95.95';

  const consumerIdentity = {
    // identityProvider: "iPayDPA-iPaySRC",
    // identityValue: identityEmail,
    "identityType": "EMAIL_ADDRESS",
    "identityValue": identityEmail
  };

  // click-to-pay payment flag
  let isClickToPayPayment = true;

  // ---------------------------------------------------

  window.addEventListener('load', function() {
    let initUcp = async function () {

      // Create a shorthand reference to the Visa Checkout SDK
      const Vsb = window.VSDK;
  
      // Define your DpaTransactionOptions
      const dpaTransactionOptions = {
        // Fill in your specific options here
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

        console.log(Vsb);

        console.log('Init cards:', cards);

        switch (actionCode) {

          case 'SUCCESS':
            //handle getCards response in UI
            console.log('Handle getCards response in the UI ', cards);
            renderCards(cards);
            break;

          // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
          case 'PENDING_CONSUMER_IDV':
            ucpPendingAlert.classList.remove('d-none');
            
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

              cards
                .then(function(result) {
                  ucpPendingAlert.classList.add('d-none');
                  console.log(result);

                  renderCards(result);
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
            break;
        }

        // check whether payment is click-to-pay or not
        ucpCheckbox.addEventListener('click', function() {
          if (ucpCheckbox.checked === true) {
            isClickToPayPayment = false;
          } else {
            isClickToPayPayment = true;
          }
          console.log('isClickToPayPayment', isClickToPayPayment);
        });

        ucpPayButton.addEventListener('click', function(event) {
          event.preventDefault();

          submitCheckout(Vsb);
        })

        const otpSendButton = document.getElementById('otp-send');

        otpSendButton.addEventListener('click', function() {
          const otpSend = Vsb.initiateIdentityValidation({});

          otpSend
          .then(function(result) {
            console.log('result otpSendButton', result);
            // renderCards(cards);
          })
          .catch(function(err) {
            console.log('error', err);
          })
        });

      })
      .catch((err) => {
        console.log(err);
      });;
  });


  // ------------------------submit button--------------------------------------
  function submitCheckout(Vsb) {

    // add new card to click to pay account
    if (ucpCheckbox.checked === true) {

      const encryptedCard = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIiwiaWF0IjoxNzM4ODQ5OTg1MjAwLCJraWQiOiJZU0taQlQxQTNDSkxaSFYyUEhQUTEzeW9fRGxIWHozYVFENlBKM2lheGtQQm5zYldVIn0.gsnUbasLb-5SHbl1emAxcNuza_GeTsAVQBtkO55NnbIZ2T6mNLTJceI3a-CIpe1YFm2K2mIQfOkPfM6O0E_zHoZETFWMQ35579EuXIrfwQTe-xfdq68X9dP8ZXRHV1GgeslHnZ6BVJahuFbpIMRTvZUsLDB1bTdim11DqSo1FjmlxUlyabD7i56DG600NseuSu-p_3NFdkZZW5JjiUMS97SzGhPazjRyKQc2eYCs9gL8jGVJ38tcyDzjZazeusk7TGXPMoQDPkYphwoGV_Y4RQpP7IL2hCvIoim4gBL4iXOhMPF4IYEo7RTnYw0DXYmgSnxiytpyFvLe3kmrLljc-w.VcMO0h8Nh649j2aF.HvVCWt16C_rmXc0McOXsxirQm6kXAC_eS4Ljy9OyQwCab8CUZC9VmwisHog4gvdW3oJ8sV8C-_ZDoBeW8Vk1qAgX71okL28R8gHF65EXMDamG-lZmk4-Jah9QLcTk6mLKDWIT3o5oI-5IZ4eDEKZ75h1aI0cKGi5Ee-gaIZidbyg7NPpmmqvGylsIiWzuG7aJYutdauUdXAs0Tq_yy_edl3v7seS-tSbbYxwTswWuo5G7JVqbMjF8KtZ5amJG7HRhFR6DBp3E_li6nuDiulHbXDCfGE_4IcPZgn6CpnZIlmXM-YSLJ7N9ZEGOBsYxMbzdBaBn2xfyg5r_-eUp94xLsawU4T7w27j3BLEVrqij6wg_jJmZqOq4m-uCv9_c6B3P8K45zruhW9g.4yA9mZJbFpXXoZiuc99fhg';
      
      const checkoutParameters = {
        encryptedCard: encryptedCard,
        consumer: {
          consumerIdentity: {
            identityValue: identityEmail,
            identityType: "EMAIL_ADDRESS"
          },
          fullName: 'SVIATOSLAV ROMANIUK',
          mobileNumber: {
            countryCode: '380',
            phoneNumber: '677593208'
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
    
      // Call checkout
      const checkoutResponse = Vsb.checkout(checkoutParameters);
      
      // Log the checkout response
      console.log(checkoutResponse);

      checkoutResponse
        .then(function(res) {
          console.log('result', res);
        })
        .catch(function(err) {
          console.log('error', err);
        })

    } else {

      // pay with click to pay existing card
      if (isClickToPayPayment) {
        const ucpCardActiveId = document.getElementById('cardform-ucp_id');
        const srcDigitalCardId = ucpCardActiveId.value;
  
        const checkoutParameters = {
          srcDigitalCardId: srcDigitalCardId,
          windowRef: "",
          // windowRef: window.open('/', 'example', 'width=480,height=700'),
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
              transactionCurrencyCode: '980'
            }
          },
          payloadTypeIndicatorCheckout: 'FULL',
          authenticationMethodType: '3DS',
          payloadRequested: 'AUTHENTICATED'
        };
  
        console.log('checkoutParameters (existing card):', checkoutParameters);
  
        // Call checkout
        const checkoutResponse = Vsb.checkout(checkoutParameters);
            
        // Log the checkout response
        console.log(checkoutResponse);
  
        checkoutResponse
          .then(function(res) {
            console.log('result', res);
          })
          .catch(function(err) {
            console.log('error', err);
          })
      }
    }

  }

  // ------------------------render cards---------------------------------------

  function renderCards(result) {

    const resultProfile = result.hasOwnProperty('profiles') ? result['profiles'] : [];
    const maskedCards = resultProfile.filter(function(cards) {
      return cards.hasOwnProperty('maskedCards');
    })

    const cardsList = maskedCards[0]['maskedCards'];
    // console.log(resultProfile);
    console.log(cardsList);

    const ucpPayment = document.getElementById('ucp-payment');
    const ucpCards = document.querySelector('.ucp-cards');
    const ucpCardsSelect = document.querySelector('.ucp-cards-select');
    const ucpCardActiveId = document.getElementById('cardform-ucp_id');

    const ucpCardsMenu = document.createElement('div');

    // card active

  
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
      // (index === 0) ? ucpCardsSelect.append(ucpCard) : '';

      ucpCardHeader.classList.add('ucp-card__header');
      ucpCardHeaderType.classList.add('ucp-card__header-type');
      ucpCardHeaderTypeImg.src = card['digitalCardData']['artUri'];
      ucpCardHeaderType.append(ucpCardHeaderTypeImg);
      ucpCardHeader.append(ucpCardHeaderType);
      ucpCard.append(ucpCardHeader);

      ucpCardBody.classList.add('ucp-card__body');
      ucpCardBodyTitle.classList.add('ucp-card__body-title');
      // ucpCardBodyTitle.textContent = card['dcf']['name'];
      ucpCardBodyMask.classList.add('ucp-card__body-mask');
      ucpCardBodyMask.textContent = '**** ' + card['panLastFour'];
      ucpCardBody.append(ucpCardBodyTitle);
      ucpCardBody.append(ucpCardBodyMask);
      ucpCard.append(ucpCardBody);

      if (index === 0) {
        const ucpCardActive = ucpCard.cloneNode(true);
        ucpCardsSelect.append(ucpCardActive);
        ucpCardActiveId.value = card['srcDigitalCardId'];
      }

      ucpCardId.classList.add('ucp-card__id');
      ucpCardId.type = 'hidden';
      ucpCardId.value = card['srcDigitalCardId'];
      ucpCardId.setAttribute('elemValue', index);
      ucpCard.append(ucpCardId);
    }
  }


  // ---------------------------------------------------------------

// });