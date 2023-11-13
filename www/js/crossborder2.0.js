// JavaScript

// Changing the sender data in the user card

const userNameInput = document.getElementById("user_name");
const userCountryInput = document.getElementById("user_country");
const userAddressInput = document.getElementById("user_address");
const usernameCards = document.querySelectorAll(".username-card:not(.username-card--active)");

usernameCards.forEach((card) => {
    card.addEventListener("click", updateCard);
});

function updateCard() {
    // get data from the selected card
    const name = this.querySelector(".username-card__title").textContent;
    const country = this.querySelector(".username-card__country").textContent;
    const address = this.querySelector(".username-card__address").textContent;

    // get data from the active card
    const activeUsernameCard = document.querySelector(".username-card--active");
    if (activeUsernameCard) {
        const activeCardName = activeUsernameCard.querySelector(".username-card__title").textContent;
        const activeCountry = activeUsernameCard.querySelector(".username-card__country").textContent;
        const activeAddress = activeUsernameCard.querySelector(".username-card__address").textContent;

        // replace data on the selected card with data from the active card
        this.querySelector(".username-card__title").textContent = activeCardName;
        this.querySelector(".username-card__country").textContent = activeCountry;
        this.querySelector(".username-card__address").textContent = activeAddress;

        // replace data on the active card with data from the selected card
        activeUsernameCard.querySelector(".username-card__title").textContent = name;
        activeUsernameCard.querySelector(".username-card__country").textContent = country;
        activeUsernameCard.querySelector(".username-card__address").textContent = address;
    }

    // update the inputs
    userNameInput.value = name;
    userCountryInput.value = country;
    userAddressInput.value = address;
}

// Changing the country in dropdown

const senderInput = document.getElementById("sender_country");
const senderInputMobile = document.getElementById("sender_country_mobile");
const countries = document.querySelectorAll(".crossborder__dropdown-item");
const currentCountry = document.getElementById("dropdownCountryButton");
const currentCountryMobile = document.getElementById("dropdownCountryButtonMobile");

countries.forEach((country) => {
    country.addEventListener("click", updateCountry);
});

function updateCountry() {
    // const selectedCountryId = this.id.toLocaleLowerCase();
    const selectedCountry = this.getAttribute("aria-country").toLocaleLowerCase();
    console.log(selectedCountry);

    // console.log(this.getAttribute('aria-country').toLocaleLowerCase())

    currentCountry.classList.remove(`crossborder__dropdown-${senderInput.value.toLocaleLowerCase()}`);
    currentCountryMobile.classList.remove(`crossborder__dropdown-${senderInput.value.toLocaleLowerCase()}`);

    senderInput.value = selectedCountry;
    senderInputMobile.value = selectedCountry;
    currentCountry.innerHTML = this.textContent;
    currentCountryMobile.innerHTML = this.textContent;
    currentCountry.classList.add(`crossborder__dropdown-${selectedCountry}`);
    currentCountryMobile.classList.add(`crossborder__dropdown-${selectedCountry}`);
}

// Sorting dropdown with countries

const countriesDropdownMenu = document.querySelector(".crossborder__dropdown-menu");
const countriesList = Array.from(countriesDropdownMenu.querySelectorAll(".crossborder__dropdown-item"));

countriesList.sort((a, b) => {
    const textA = a.textContent.trim().toUpperCase();
    const textB = b.textContent.trim().toUpperCase();
    return textA.localeCompare(textB);
});

countriesDropdownMenu.innerHTML = "";
countriesList.forEach((item) => {
    countriesDropdownMenu.appendChild(item);
});

// jQuery

// $(document).ready(function() {
//     $('.username-card:not(.username-card--active)').on('click', function() {
//         updateCard($(this));
//     });
//
//     function updateCard(selectedCard) {
//         const activeCard = $('.username-card--active');
//
//         // get data from the selected card
//         const selectedName = selectedCard.find('.username-card__title').text();
//         const selectedCountry = selectedCard.find('.username-card__country').text();
//         const selectedAddress = selectedCard.find('.username-card__address').text();
//
//         // get data from the active card
//         const activeName = activeCard.find('.username-card__title').text();
//         const activeCountry = activeCard.find('.username-card__country').text();
//         const activeAddress = activeCard.find('.username-card__address').text();
//
//         // replace data on the selected card with data from the active card
//         selectedCard.find('.username-card__title').text(activeName);
//         selectedCard.find('.username-card__country').text(activeCountry);
//         selectedCard.find('.username-card__address').text(activeAddress);
//
//         // replace data on the active card with data from the selected card
//         activeCard.find('.username-card__title').text(selectedName);
//         activeCard.find('.username-card__country').text(selectedCountry);
//         activeCard.find('.username-card__address').text(selectedAddress);
//
//         // update the inputs
//         $('#user_name').val(selectedName);
//         $('#user_country').val(selectedCountry);
//         $('#user_address').val(selectedAddress);
//     }
// });
