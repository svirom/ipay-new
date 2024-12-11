document.addEventListener("DOMContentLoaded", function() {

  const ucsButton = document.getElementById('api-visa-button');

  // ---------------------------------------------------

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

      //Invoke getCards and other apis here onwards
        
      let consumerIdentity = {
        // identityProvider: "iPayDPA-iPaySRC",
        identityValue: "svia.rom@gmail.com",
        // identityValue: "svirom@yahoo.com",
        identityType: "EMAIL_ADDRESS"
      };
      
      let cards = await Vsb.getCards({ consumerIdentity });

      // console.log(cards);

      return cards;

    } catch (error) {
      console.error('Error initializing SDK:', error);
    }
  };

  ucsButton.addEventListener('click', function() {

    const getCardResult = async function() {
      const cards = await initFunc().catch((err) => {
        console.log(err);
      });
      const { actionCode } = cards;

      console.log(cards);

      switch (actionCode) {

        case 'SUCCESS':
          //handle getCards response in UI
          console.log('Handle getCards response in the UI ', cards);
          break;

        // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
        case 'PENDING_CONSUMER_IDV':
          // const validationDataInput = { consumerIdentity, validationData: "931734" }; // Replace with your actual validation data
          // cards = await Vsb.getCards(validationDataInput);
          console.log('PENDING_CONSUMER_IDV');
          break;

        case 'ERROR':
          console.log('Handle error cases:');
          break;

        default:
          console.log('No cards found >> ', cards.actionCode);
          break;
      }
    }
    getCardResult();

  });

  // -------------------------------------------------------------------


  // ---------------------------------------------------------------



});