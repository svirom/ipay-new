document.addEventListener("DOMContentLoaded", function() {
  
  var params = {
    // dpaId: "6bc8ee6a-ebd5-417c-8117-377ece9bce77", // required DPA Identifier, generated during registration.
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

  // let checkoutInit = async function() {
  //   try {
  //    var result = await mcCheckoutService.init(params);    
  //    // handle result: an object containing a list of initialized card networks
  //    // upon successful resolution, other methods, e.g. getCards(), may be called
  //    console.log(result);
    

  //   } 
  //   //  catch (error) {
  //    catch ({name, message}) {
  //     // handle error
  //     // console.log(error);
  //     console.log(name);
  //     console.log(message);
  //    }
  // }

  // checkoutInit();

  const initPromise = mcCheckoutService.init(params) //  returns a promise

  // console.log('initPromise', initPromise);

  initPromise
    // .then(promiseResolvedHandler)  // No other library methods should be invoked until `init` resolves
    .then(function(initResult) {
      console.log('initResult', initResult);
      const getCardsPromise = mcCheckoutService.getCards();
      console.log('getCardsPromise', getCardsPromise);
      return getCardsPromise;
    })
    .then(function(cardsArray) {
      console.log(`Cards: ${cardsArray}`);

      if (!cardsArray.length) {
        const sampleiDLookupParams = 'svia.rom@gmail.com';
        // const idLookupPromise = mcCheckoutService.idLookup(sampleiDLookupParams);
        // return idLookupPromise;
        // console.log(idLookupPromise);
      }
    })
    .then(function(isIdLookup) {
      // console.log(isIdLookup); 
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

  async function idLookupHandler () { // this method will return a promise
    try {
      const sampleiDLookupParams = 'svia.rom@gmail.com';
      const promiseResolvedPayload = await mcCheckoutService.idLookup(sampleiDLookupParams);
      console.log('idLookup: ' + promiseResolvedPayload);
      // add success handler logic here
      // or
      // promiseResolvedHandler(promiseResolvedPayload)
    } catch (error) {
      // console.log(error);
     
      // add error handler logic here
      // or
      // promiseRejectedHandler(promiseRejectedPayload)
    }
  }

  idLookupHandler();

});