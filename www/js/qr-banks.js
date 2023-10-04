document.addEventListener('DOMContentLoaded', function() {
  
  document.querySelector('#qr-bank-search').addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase();
    const banks = document.querySelectorAll('.qr-bank');

    banks.forEach(function(bank) {
      const bankValue = bank.getAttribute('data-bank');

      bank.parentElement.classList.remove('inactive');

      if (!bankValue.toLowerCase().includes(searchValue)) {
        bank.parentElement.classList.add('inactive');
      }
    })
  })
  
})