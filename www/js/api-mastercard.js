document.addEventListener("DOMContentLoaded", function() {
  
  var params = {
    srcDpaId: "6bc8ee6a-Ebd5-417c-8117-377ece9bce77_dpa0", // required DPA Identifier, generated during registration.
    dpaData: {
     dpaName: "Testdpa0"       //required
    },
    dpaTransactionOptions: {
     dpaLocale: "en_US",      // required
    },
    cardBrands: ["mastercard"]  // required. Array of card brands supported.
  }
  var mcCheckoutService = new MastercardCheckoutServices()

  const initUcsScript = mcCheckoutService.init(params) //  returns a promise

  const ucsButton = document.getElementById('api-mastercard-getCards').querySelector('src-button');

  // ---------------------------------------------------

  // init js library and recognize the user
  ucsButton.addEventListener('click', function() {
    
    initUcsScript
      .then(function() {
        // console.log('initResult', initResult);
        const getCardsPromise = mcCheckoutService.getCards();
        // console.log('getCardsPromise', getCardsPromise);
        return getCardsPromise;
      })
      .then(function(cardsArray) {
        console.log(`Cards: ${cardsArray}`);

        if (!cardsArray.length) {
          $('#modal-ucs-email').modal({
            backdrop : 'static',
            show : true
          });
        }
      })
      .catch(function(error) {
        console.log(error.name, error.message);
      });

  });

  // -------------------------------------------------------------------

  const buttonEmailSubmit = document.getElementById('ucs-email-submit');

  buttonEmailSubmit.addEventListener('click', idLookupHandler);

  // check if the consumer is recognized in any of the SRC networks
  function idLookupHandler() {
    const buttonEmailInput = document.getElementById('ucs-email');
    const iDLookupParams = {"email": buttonEmailInput.value};
    const idLookupPromise = mcCheckoutService.idLookup(iDLookupParams);

    console.log(iDLookupParams);

    idLookupPromise
      .then(function(isIdLookup) {
        if (isIdLookup.consumerPresent) {
          console.log(isIdLookup, true);
        } else {
          console.log(isIdLookup, false);

          $('#modal-ucs-email').modal('hide');

          $('#modal-ucs-email').on('hidden.bs.modal', function() {
            if (buttonEmailInput.value.length) {
              $('#modal-ucs-card').modal({
                backdrop : 'static',
                show : true
              });
              buttonEmailInput.value = null;
            }
          });
        }
      })
      .catch(function(error) {
        console.log(error.name, error.message);
      })
  }

  // ---------------------------------------------------------------

  // encrypt consumer's card
  const buttonCardSubmit = document.getElementById('ucs-card-submit');

  buttonCardSubmit.addEventListener('click', encryptCardHandler);

  function encryptCardHandler() {
    // const buttonCardNumberInput = document.getElementById('ucs-card-number');
    const buttonCardNumberInput = '5186001700008785';
    const buttonCardExpInput = document.getElementById('ucs-card-exp');
    // const buttonCardMonthInput = buttonCardExpInput.value.replace(/\D/g,'').slice(0, 2);
    const buttonCardMonthInput = '05';
    // const buttonCardYearInput = '20' + buttonCardExpInput.value.replace(/\D/g,'').slice(-2);
    const buttonCardYearInput = '25';
    // const buttonCardCvvInput = document.getElementById('ucs-card-cvv');
    const buttonCardCvvInput = '321';

    const encryptCardParams = {
      // primaryAccountNumber: buttonCardNumberInput.value,
      primaryAccountNumber: buttonCardNumberInput,
      panExpirationMonth: buttonCardMonthInput,
      panExpirationYear: buttonCardYearInput,
      // cardSecurityCode: buttonCardCvvInput.value
      cardSecurityCode: buttonCardCvvInput
    }

    const encryptCardPromise = mcCheckoutService.encryptCard(encryptCardParams);

    encryptCardPromise
      .then(function(cardData) {
        console.log('cardData: ', cardData);
        var card = document.createElement('src-card');
        // card.setAttribute('dark', true);
        card.setAttribute('descriptor-name', 'Citi');
        card.setAttribute('account-number-suffix', '1234');
        document.getElementById('ucs-payment-card').appendChild(card);

        const checkoutButton = document.createElement('button');
        checkoutButton.setAttribute('type', 'button');
        checkoutButton.id = 'ucs-new-card-checkout'
        checkoutButton.classList.add('btn', 'btn-green');
        checkoutButton.textContent = 'Оплатити методом';

        document.getElementById('ucs-payment-card').appendChild(card);
        document.getElementById('ucs-payment-card').appendChild(checkoutButton);

        $('#modal-ucs-card').modal('hide');

        console.log('cardData.encryptedCard: ', cardData.encryptedCard);
        console.log('cardData.cardBrand: ', cardData.cardBrand);

        const checkoutWithNewCardparams = {
          windowRef: {
            'width': 800,
            'height': 400
          }, // required.
          encryptedCard: cardData.encryptedCard, // required
          cardBrand: cardData.cardBrand, // required
          consumer: {
            emailAddress: 'svia.rom@gmail.com'
          }, // optional
          // dpaTransactionOptions: DpaTransactionOptions, // optional.
          // DPA-specific preferences and transaction configuration parameters.
        }

        const checkoutWithNewCardPromise = mcCheckoutService.checkoutWithNewCard(checkoutWithNewCardparams); //  returns a promise
        checkoutWithNewCardPromise
          .then(function(data) {
            console.log('CheckoutWithNewCard: ', data);
          })
          .catch(function(error) {
            console.log('Name: ', error.name);
            console.log('Reason: ', error.reason);
            console.log('Details: ', error.details);
            console.log('Message: ', error.message);
          })
      })
      .catch(function(error) {
        console.log('Name: ', error.name);
        console.log('Reason: ', error.reason);
        console.log('Details: ', error.details);
        console.log('Message: ', error.message);
      })
  }

  // -----------------------------------------------------------


});