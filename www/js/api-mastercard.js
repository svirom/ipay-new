document.addEventListener("DOMContentLoaded", function() {
  
  var params = {
    dpaId: "6bc8ee6a-ebd5-417c-8117-377ece9bce77", // required DPA Identifier, generated during registration.
    // dpaId: "6bc8ee6a-Ebd5-417c-8117-377ece9bce77_dpa0", // required DPA Identifier, generated during registration.
    dpaData: {
     dpaName: "Testdpa0"       //required
    },
    dpaTransactionOptions: {
     dpaLocale: "en_US",      // required
    },
    cardBrands: ["mastercard"]  // required. Array of card brands supported.
  }
  var mcCheckoutService = new MastercardCheckoutServices()

  async function initializeMastercardCheckoutServices() {
    try {
     var result = await mcCheckoutService.init(params)     
     // handle result: an object containing a list of initialized card networks
     // upon successful resolution, other methods, e.g. getCards(), may be called
     console.log(result);
    } 
    //  catch (error) {
     catch ({name, message}) {
      // handle error
      // console.log(error);
      console.log(name);
      console.log(message);
     }
  }

  initializeMastercardCheckoutServices();

});