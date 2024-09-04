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

  initPromise
    .then(function(initResult) {
      console.log('initResult', initResult);
      const getCardsPromise = mcCheckoutService.getCards();
      console.log('getCardsPromise', getCardsPromise);
      return getCardsPromise;
    })
    .then(function(cardsArray) {
      console.log(`Cards: ${cardsArray}`);

      if (!cardsArray.length) {
       
        // idLookupHandler();
        const sampleiDLookupParams = {"email": 'svia.rom@gmail.com'};
     
        const promiseResolvedPayload = mcCheckoutService.idLookup(sampleiDLookupParams);
        console.log('hello', promiseResolvedPayload);
        return promiseResolvedPayload;
      }
    })
    .then(function(isIdLookup) {
      console.log(isIdLookup);
      if (isIdLookup.consumerPresent) {
        console.log(isIdLookup);
      } else {
        console.log('false');
      }
    })
    .catch(promiseRejectedHandler)
  

  function promiseResolvedHandler (cards) {
    // add success handler logic here
    // console.log('61: ' + cards);
    // console.log(typeof cards);

    console.log('initPromise: ', initPromise);
    const getCardsPromise = mcCheckoutService.getCards();
    console.log('getCardsPromise: ', getCardsPromise);

    return getCardsPromise;
  }
  function promiseRejectedHandler ({name, message}) {
    // add error handler logic here
    console.log(`${name}: ${message}`);
  }

  // const button = document.getElementById('api-mastercard-getCards').querySelector('src-button');

  // button.addEventListener('click', function() {
    
  //   const getCardsPromise = window.mcCheckoutService.getCards(); //returns a promise
  //   getCardsPromise
  //     .then(promiseResolvedHandler)
  //     .catch(promiseRejectedHandler);
  //   console.log(getCardsPromise);
  //   // getCardsHandler();

  // })


});