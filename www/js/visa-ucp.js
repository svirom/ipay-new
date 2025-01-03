// document.addEventListener("DOMContentLoaded", function() {

  const ucpButton = document.getElementById('api-visa-button');
  const ucpPayButton = document.getElementById('ucp-pay-button');
  const identityEmail = 'svia.rom@gmail.com';
  // const identityEmail = 'svirom@yahoo.com';
  const ucpCheckbox = document.getElementById('checkbox-ucp');
  const ucpOtp = document.getElementById('ucp-pending-otp');
  const ucpOtpSubmit = document.getElementById('ucp-otp-submit');

  const consumerIdentity = {
    // identityProvider: "iPayDPA-iPaySRC",
    // identityValue: identityEmail,
    "identityType": "EMAIL_ADDRESS",
    "identityValue": identityEmail
  };

  // ---------------------------------------------------

  window.addEventListener('load', function() {
    let initUcp = async function () {

      // Create a shorthand reference to the Visa Checkout SDK
      const Vsb = window.VSDK;
  
      // Define your DpaTransactionOptions
      const dpaTransactionOptions = {
        // Fill in your specific options here
        transactionAmount: {
          transactionAmount: '99.95',
          transactionCurrencyCode: 'UAH'
        },
        // payloadTypeIndicator: "FULL",
        // authenticationPreferences: {
        //   payloadRequested: 'NON_AUTHENTICATED'
        // },
        dpaShippingPreference: 'NONE',
        dpaBillingPreference: 'NONE'
        // merchantOrderId: '8e15ce5c-58a3-4748-acab-71c67432dfa7',
      };
  
      // Initialize the Visa Checkout SDK with your DpaTransactionOptions
      try {
        await Vsb.initialize({
          dpaTransactionOptions: dpaTransactionOptions
        });
  
        //Invoke getCards and other apis here onwards
        
        const cards = await Vsb.getCards({ consumerIdentity });
  
        // console.log('Init cards:', cards);
  
        return {Vsb, cards};
  
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };
    
    initUcp()
      .then(function({Vsb, cards}) {
        const { actionCode } = cards;

        console.log('Init cards:', cards);

        switch (actionCode) {

          case 'SUCCESS':
            //handle getCards response in UI
            console.log('Handle getCards response in the UI ', cards);
            break;

          // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
          case 'PENDING_CONSUMER_IDV':
            ucpOtpSubmit.addEventListener('click', function(event) {
              event.preventDefault();
              const validationDataInput = { 
                consumerIdentity, 
                "validationData": ucpOtp.value 
              }; // Replace with your actual validation data
              cards = Vsb.getCards({
                "consumerIdentity": {
                  "identityType": "EMAIL_ADDRESS",
                  "identityValue": identityEmail
                },
                "validationData": ucpOtp.value
              });

              ucpOtpSubmit.setAttribute('disabled', true);

              cards
                .then(function(result) {
                  console.log(result);
                  renderCards(result);

                  ucpPayButton.addEventListener('click', function(event) {
                    event.preventDefault();

                    const ucpCardActiveId = document.getElementById('cardform-ucp_id');
                    srcDigitalCardId = ucpCardActiveId.value;

                    const checkoutParameters = {
                      // srcDigitalCardId: srcDigitalCardId,
                      srcDigitalCardId: 'T8-t-UxQQQ-gDsmqZaXIMQ000000000000US',
                      // consumer: {
                      //   consumerIdentity: {
                      //     identityValue: identityEmail,
                      //     identityType: "EMAIL_ADDRESS"
                      //   },
                      //   fullName: 'SVIATOSLAV ROMANIUK',
                      //   mobileNumber: {
                      //     countryCode: '+380',
                      //     phoneNumber: '677593208'
                      //   }
                      // },
                      windowRef: "",
                      // windowRef: window.open('/', 'example', 'width=480,height=700'),
                      dpaTransactionOptions: {
                        dpaBillingPreference: 'NONE',
                      }
                    };

                    console.log('checkoutParameters:', checkoutParameters);
                  
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
                  }) 

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

        ucpPayButton.addEventListener('click', function(event) {
          event.preventDefault();

          // const encryptedCard = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIiwiaWF0IjoxNzM0NDMyNzE3NTQzLCJraWQiOiJZU0taQlQxQTNDSkxaSFYyUEhQUTEzeW9fRGxIWHozYVFENlBKM2lheGtQQm5zYldVIn0.kMc96VwMmSiowQDkCBe-Kd2dlljoY7JSInid2YePI6Aryor6USFGw5iG_SxNrdcggY8SGF4uPvbJcXChho5QR_fAkQ2morp28Z3ir-cRnxsIW0q3tjvT-LB2eUpIHfQ1bWk1n9rNxjTMafTSpRpUzpBAwbyLjzTh4gUr5BTPX9w66J4JMU6G7vXUcSwQ4WV6hhH0DJXXTStsN_bls7qoZcIfJhAO-VJ98F4coHGBTUZHpkvZm0II84m5tgL3RjtyaBHG17mFxASlTeaBAWf5PIS0iYNyNm8eEYodUJdZ0fEmRW8J7ZiyVmGpXDxAbXdtl-iLgjca9mB5bkeOFzqORA.unYxT65Fzb2eR8Fa.PaEESQbvk0tLkV7TKqS9CAfrwpI7mA_SYHZjOIYHVDJxJPS9j9kHPENlODAYyLhWomqIcQRkUwgoVXYv2ec5V5Bhf1Vh7oy6ZoEFimxRPauJqH6kanJa_vrPdNlqY7CfjOCyTRUxv8cSet_xoiufpAR2cktmmE59FQZxK0Tu2B4p5p8vfvMThXLM6bFLdX8U3m-ERFXZdj_uIcMeRSo3ib-jEG-2P_tXXjIAL2I.4YaqV9kkb0Iv_uAmS9nOhQ';

          const encryptedCard = 'eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4R0NNIiwiaWF0IjoxNzM1OTAwNTY4NDA0LCJraWQiOiJZU0taQlQxQTNDSkxaSFYyUEhQUTEzeW9fRGxIWHozYVFENlBKM2lheGtQQm5zYldVIn0.VoHbRohJ5XF_VURlVUuPq_zaS1ZodxW9l3mGOJF01wIAkiU4W4PHQXKHYcVAbxEWtS3Xn0B0ommPtH4daCmEEUrJFEdxojnsafm9-CYrt_ATxYqISetKw5KLSj6Nastb9wBgoJI-JiMcWEyPLKVbltCVd5HFxHFfg_cqjw9y2a156vCJL4CG0yigNIboYxwPYN2LupT45vnmYQo8yk-VH3KAPPG9UyHKHs_EfpqYWS9lmVk9vRFPV8yBOOgXshTddpU1vAxIjfxVxL4t4nhAylPEigd903v8556dOWAhmub4vkGhgVHmWrb4S2ytb3lvu6lIBqy1XBzWY7COWf6bPA.agg1d4enf3zK2Udz.Z-vWgytHuYdexOFrxwhLhjlMdoA-anPWsx2mSP_DSAoWNPRo9hzA3_tod-j7Ffwz3xK6ux11oGhSjXOY3AjLQNkdNPu55_OYUs41tCeA0tZk2VZ8Q7kfyrNiBjrl0MIwDtKeNraCE8Yw3xQrHH3M9LAiwqc-UeGEqmiPpS6-9PQLS0uIQTJg5EhfZQrotnxUvPu_qYa07tuhBtawMfMrdlN8VmBPnw2ebC_d7om0YD3oO62Apuh1-jD51gPwd9tNViyIGCRt05pGLoI0sM3QnLO8fFP1v3Ze7v1MKYLcmGfy1LtoveIuIIQyc8yJ4y8fh4mpUc4ee7Gkn_EQImbJzra13toetp7NCivvqNzLWPl1Ype6TEld7Td3C9zGbINj8lOY96CS1-UN.v8dcHONr3Qztday-lKPQ6A';

          if (ucpCheckbox.checked === true) {
            const checkoutParameters = {
              // srcDigitalCardId: 'nE5xhI3jQcSis6Vf7IAH-A000000000000US',
              // srcDigitalCardId: "",
              encryptedCard: encryptedCard,
              consumer: {
                consumerIdentity: {
                  identityValue: identityEmail,
                  identityType: "EMAIL_ADDRESS"
                },
                fullName: 'SVIATOSLAV ROMANIUK',
                mobileNumber: {
                  countryCode: '+380',
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
              // windowRef: "",
              // windowRef: window.open('/', 'example', 'width=480,height=700'),
              // payloadTypeIndicatorCheckout: 'FULL',
              // dpaTransactionOptions: {
              //   dpaBillingPreference: 'NONE',
              //   consumerNationalIdentifierRequested: false,
              //   paymentOptions: [
              //     {
              //       dpaDynamicDataTtlMinutes: 2,
              //       dynamicDataType: 'CARD_APPLICATION_CRYPTOGRAM_LONG_FORM'
              //     }
              //   ]
              // },
              // authenticationReasons: [
              //   'TRANSACTION_AUTHENTICATION'
              // ],
              // authenticationMethod: {
              //   authenticationMethodType: 'SMS_OTP',
              //   authenticationSubject: 'CARDHOLDER',
              // },
              // assuranceData: {
              //   verificationData: [
              //     {
              //       verificationType: 'CARDHOLDER',
              //       verificationEntity: '01',
              //       verificationMethod: '02',
              //       verificationResults: '04',
              //       verificationTimestamp: '2025-12-05',
              //     }
              //   ]
              // }
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
          }

        })

        if (actionCode === 'ADD_CARD') {

        }
      })
      .catch((err) => {
        console.log(err);
      });;
  });

  // ---------------------------------------------------------------

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
      ucpCardBodyTitle.textContent = card['dcf']['name'];
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