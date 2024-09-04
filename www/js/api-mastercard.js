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

  const initPromise = mcCheckoutService.init(params) //  returns a promise

  const button = document.getElementById('api-mastercard-getCards').querySelector('src-button');

  button.addEventListener('click', function() {
    
    initPromise
      .then(function() {
        // console.log('initResult', initResult);
        const getCardsPromise = mcCheckoutService.getCards();
        // console.log('getCardsPromise', getCardsPromise);
        return getCardsPromise;
      })
      .then(function(cardsArray) {
        console.log(`Cards: ${cardsArray}`);

        if (!cardsArray.length) {
        
          $('#modal-ucs').modal('show');
          // idLookupHandler();
          
        }
      })
      .catch(error);

  });

  const buttonEmailSubmit = document.getElementById('ucs-email-submit');

  buttonEmailSubmit.addEventListener('click', idLookupHandler);

  function idLookupHandler() {
    
    const buttonEmailInput = document.getElementById('ucs-email');
    const iDLookupParams = {"email": buttonEmailInput.value};

    console.log(iDLookupParams);
      
    const idLookupPromise = mcCheckoutService.idLookup(iDLookupParams);
    idLookupPromise
      .then(function(isIdLookup) {
        if (isIdLookup.consumerPresent) {
          console.log(isIdLookup);
        } else {
          console.log('false');
        }
      })
      .catch(error)
  }


});