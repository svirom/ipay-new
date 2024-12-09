document.addEventListener("DOMContentLoaded", function() {

  const ucsButton = document.getElementById('api-visa-button').querySelector('src-button');

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
        let initialize = await Vsb.initialize({
            dpaTransactionOptions: dpaTransactionOptions
        });
        // await Vsb.initialize({});

        // console.log(initialize);

        return initialize;

        //Invoke getCards and other apis here onwards

    } catch (error) {
        console.error('Error initializing SDK:', error);
    }
  };

  const initResult = initFunc();
  initResult.then(function(result) {
    console.log('initialization result: ', result);
  }) 
  console.log('initialization promise: ', initResult);

  // -------------------------------------------------------------------


  // ---------------------------------------------------------------



});