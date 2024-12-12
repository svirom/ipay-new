// document.addEventListener("DOMContentLoaded", function() {

  const ucpButton = document.getElementById('api-visa-button');
  const ucpPayButton = document.getElementById('ucp-pay-button');
  // const identityEmail = 'svia.rom@gmail.com';
  const identityEmail = 'svirom@yahoo.com';
  const ucpCheckbox = document.getElementById('checkbox-ucp');

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
        // merchantOrderId: '8e15ce5c-58a3-4748-acab-71c67432dfa7',
      };
  
      // Initialize the Visa Checkout SDK with your DpaTransactionOptions
      try {
        await Vsb.initialize({
          dpaTransactionOptions: dpaTransactionOptions
        });
  
        //Invoke getCards and other apis here onwards
          
        const consumerIdentity = {
          // identityProvider: "iPayDPA-iPaySRC",
          // identityValue: identityEmail,
          identityValue: identityEmail,
          identityType: "EMAIL_ADDRESS"
        };
        
        const cards = await Vsb.getCards({ consumerIdentity });
  
        // console.log('Init cards:', cards);
  
        return {Vsb, cards};
  
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };

    // const getCardResult = async function() {
    //   const cards = await initUcp().catch((err) => {
    //     console.log(err);
    //   });
    //   const { actionCode } = cards;

    //   console.log('Result', cards);

    //   return cards;

    //   switch (actionCode) {

    //     case 'SUCCESS':
    //       //handle getCards response in UI
    //       console.log('Handle getCards response in the UI ', cards);
    //       break;

    //     // If cards status is "PENDING_CONSUMER_IDV", call getCards again with validationData
    //     case 'PENDING_CONSUMER_IDV':
    //       // const validationDataInput = { consumerIdentity, validationData: "931734" }; // Replace with your actual validation data
    //       // cards = await Vsb.getCards(validationDataInput);
    //       console.log('PENDING_CONSUMER_IDV');
    //       break;

    //     case 'ERROR':
    //       console.log('Handle error cases:');
    //       break;

    //     default:
    //       console.log('No cards found >> ', cards.actionCode);
    //       ucpPayButton.addEventListener('click', function(event) {
    //         event.preventDefault();
    //         console.log('payed!');
            
    //       })
    //       break;
    //   }
    // }
    
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

        ucpPayButton.addEventListener('click', function(event) {
          event.preventDefault();

          const checkoutParameters = {
            // srcDigitalCardId: 'nE5xhI3jQcSis6Vf7IAH-A000000000000US',
            // "srcDigitalCardId": "",
            encryptedCard: {
              primaryAccountNumber: '5555555555555555',
              panExpirationMonth: '05',
              panExpirationYear: '2025',
              cardSecurityCode: '000',
              cardholderFullName: 'Sviatoslav Romaniuk'
            }
          };
        
          // Call checkout
          const checkoutResponse = Vsb.checkout(checkoutParameters);
          
          // Log the checkout response
          console.log(checkoutResponse);

          checkoutResponse
            .then(function(res) {
              console.log(res);
            })
            .catch(function(err) {
              console.log(err);
            })
        })

        if (actionCode === 'ADD_CARD') {

        }
      })
      .catch((err) => {
        console.log(err);
      });;
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