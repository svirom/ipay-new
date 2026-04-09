document.addEventListener('DOMContentLoaded', function() {
  
  document.querySelector('#qr-bank-search')?.addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase();
    const banks = document.querySelectorAll('.qr-bank');

    banks.forEach(function(bank) {
      const nameAttr = bank.getAttribute('data-bank-name');
      const bankValue = nameAttr ? nameAttr.toLowerCase() : '';

      bank.parentElement.classList.remove('inactive');

      if (!bankValue.includes(searchValue)) {
        bank.parentElement.classList.add('inactive');
      }
    })
  })
  
})