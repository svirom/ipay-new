const checkboxForeign = document.getElementById('checkbox-foreign');
const checkboxTaxi = document.getElementById('checkbox-taxi');
const checkboxPerk = document.getElementById('checkbox-perk');
const buttonPerk = document.getElementById('dropdownMenuPerk');
const sityRegistration = document.getElementById('parametersSityRegistration');
const labelPerk = document.getElementById('label-perk');

if (checkboxForeign || checkboxTaxi) {
    checkboxForeign.addEventListener("change", function() {
        if (checkboxForeign.checked || checkboxTaxi.checked) {
            checkboxPerk.disabled = true;
            buttonPerk.disabled = true;
            checkboxPerk.checked = false;
        } else {
            checkboxPerk.disabled = false;
            buttonPerk.disabled = false;
        }
        checkboxForeign.checked ? sityRegistration.disabled = true : sityRegistration.disabled = false;
    });

    checkboxTaxi.addEventListener("change", function() {
        if (checkboxTaxi.checked || checkboxForeign.checked) {
            checkboxPerk.disabled = true;
            buttonPerk.disabled = true;
            checkboxPerk.checked = false;
        } else {
            checkboxPerk.disabled = false;
            buttonPerk.disabled = false;
        }
    });
};

const buttonNumber = document.getElementById('button-number');
const buttonParameters = document.getElementById('button-parameters');
const checkboxControlForeign = document.querySelector('.checkbox-control-foreign');

if (buttonNumber || buttonParameters) {
    buttonNumber.addEventListener('click', function() {
        checkboxControlForeign.style.display = 'none';
    });
    
    buttonParameters.addEventListener('click', function() {
        checkboxControlForeign.style.display = 'inline-block';
    });
}

const perkItems = document.querySelectorAll('.dropdown-item-perk');

perkItems.forEach(function(item) {
    item.addEventListener('click', function() {
        const perkItem = item.textContent;
        labelPerk.textContent = perkItem;
        checkboxPerk.checked = true;
    })
});

const collapseButtons = document.querySelectorAll('.btn-red--osago');
const collapseElements = document.querySelectorAll('.osago__collapse');

collapseButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        collapseButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        const dataTarget = button.getAttribute('data-target');
        targetId = dataTarget.replace("#", "");

        collapseElements.forEach(function(elem) {
            elem.id !== targetId ? elem.classList.remove('show') : "";
        })
    });
});

const filterItem = document.querySelectorAll('.dropdown-item-filter');
const filterButton = document.getElementById('dropdownMenuButton');

filterItem.forEach(function(item) {
    item.addEventListener('click', function() {
        const itemAmount = item.textContent;
        filterButton.textContent = itemAmount;
    })
});