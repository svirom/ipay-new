// document.addEventListener("DOMContentLoaded", function() {

  const ucpButton = document.getElementById('api-visa-button');
  const ucpPayButton = document.getElementById('ucp-pay-button');

  // ---------------------------------------------------

  window.addEventListener('load', function() {
    let fdf = async function () {

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
          // identityValue: "svia.rom@gmail.com",
          identityValue: "svirom@yahoo.com",
          identityType: "EMAIL_ADDRESS"
        };
        
        let cards = await Vsb.getCards({ consumerIdentity });
  
        console.log('Cards:', cards);
  
        return cards;
  
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };
    // fdf();

    const getCardResult = async function() {
      const cards = await fdf().catch((err) => {
        console.log(err);
      });
      const { actionCode } = cards;

      console.log('Result', cards);

      return cards;

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
          ucpPayButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('payed!');
            
          })
          break;
      }
    }
    // const result = fdf().then((res) => res);
    fdf()
      .then(function(res) {
        console.log('res:', res);
      });
  });
  // window.onload = async function () {

  //   // Create a shorthand reference to the Visa Checkout SDK
  //   const Vsb = window.VSDK;

  //   // Define your DpaTransactionOptions
  //   const dpaTransactionOptions = {
  //       // Fill in your specific options here
  //       // dpaLocale: 'en_US'
  //   };

  //   // Initialize the Visa Checkout SDK with your DpaTransactionOptions
  //   try {
  //     await Vsb.initialize({
  //       dpaTransactionOptions: dpaTransactionOptions
  //     });

  //     //Invoke getCards and other apis here onwards
        
  //     let consumerIdentity = {
  //       // identityProvider: "iPayDPA-iPaySRC",
  //       // identityValue: "svia.rom@gmail.com",
  //       identityValue: "svirom@yahoo.com",
  //       identityType: "EMAIL_ADDRESS"
  //     };
      
  //     let cards = await Vsb.getCards({ consumerIdentity });

  //     console.log('Cards', cards);

  //     return cards;

  //   } catch (error) {
  //     console.error('Error initializing SDK:', error);
  //   }
  // };

  // console.log(cardsRes);

  // initFunc();


  // ucpButton.addEventListener('click', function() {

  //   const getCardResult = async function() {
  //     const cards = await initFunc().catch((err) => {
  //       console.log(err);
  //     });
  //     const { actionCode } = cards;

  //     console.log(cards);

  //     switch (actionCode) {

  //       case 'SUCCESS':
  //         //handle getCards response in UI
  //         console.log('Handle getCards response in the UI ', cards);
  //         break;

  //       // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
  //       case 'PENDING_CONSUMER_IDV':
  //         // const validationDataInput = { consumerIdentity, validationData: "931734" }; // Replace with your actual validation data
  //         // cards = await Vsb.getCards(validationDataInput);
  //         console.log('PENDING_CONSUMER_IDV');
  //         break;

  //       case 'ERROR':
  //         console.log('Handle error cases:');
  //         break;

  //       default:
  //         console.log('No cards found >> ', cards.actionCode);
  //         break;
  //     }
  //   }
  //   getCardResult();

  // });

  // -------------------------------------------------------------------


  // ---------------------------------------------------------------



// });