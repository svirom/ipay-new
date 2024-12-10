document.addEventListener("DOMContentLoaded", function() {

  const ucsButton = document.getElementById('api-visa-button');

  // ---------------------------------------------------

  // init js library and recognize the user
  // ucsButton.addEventListener('click', function() {

  //   const Vsb = window.VSDK;
    
  //   Vsb
  //     .then(function(data) {
  //       Vsb.initialize();
  //       console.log(data);
  //       // return getCardsPromise;
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });

  // });

  // const initFunc = async function () {
  const initFunc = async function () {

    // Create a shorthand reference to the Visa Checkout SDK
    const Vsb = window.VSDK;

    // Define your DpaTransactionOptions
    const dpaTransactionOptions = {
        // Fill in your specific options here
        // dpaLocale: 'en_US'
    };

    // Initialize the Visa Checkout SDK with your DpaTransactionOptions
    try {
      await Vsb.initialize({
        dpaTransactionOptions: dpaTransactionOptions
      });
      // await Vsb.initialize({});

      // console.log(initialize);

      // return initialize;

      //Invoke getCards and other apis here onwards
        
      let consumerIdentity = {
        // identityProvider: "iPayDPA-iPaySRC",
        identityValue: "svia.rom@gmail.com",
        identityType: "EMAIL_ADDRESS"
      };
      
      let cards = await Vsb.getCards({ consumerIdentity });

      // console.log(cards);
      
      let { actionCode } = cards;
      
      // switch (actionCode) {
      //   case 'SUCCESS':
      //     //handle getCards response in UI
      //     console.log('Handle getCards response in the UI ', cards);
      //     break;
      //   // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
      //   case 'PENDING_CONSUMER_IDV':
      //     const validationDataInput = { consumerIdentity, validationData: "931734" }; // Replace with your actual validation data
      //     cards = await Vsb.getCards(validationDataInput);
      //     break;
      //   case 'ERROR':
      //     console.log('Handle error cases:');
      //     break;
      //   default:
      //     console.log('No cards found >> ', cards.actionCode);
      //     break;
      // }

      return cards;

    } catch (error) {
        console.error('Error initializing SDK:', error);
    }
  };

  ucsButton.addEventListener('click', function() {
    let initPromise = initFunc();

    const getFlow = async function() {
      const {statusCode} = cards;
      // let statusCode = await initPromise;
      console.log(statusCode);

      
    };
    getFlow();
  });
  // const initResult = initFunc();
  // initResult.then(function(result) {
  //   console.log('initialization result: ', result);
  // }) 
  // console.log('initialization promise: ', initResult);

  // -------------------------------------------------------------------


  // ---------------------------------------------------------------



});