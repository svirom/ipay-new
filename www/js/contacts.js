document.addEventListener('DOMContentLoaded', function() {

  // input field type file (filesize limit, filetypes limit)
  const fileUpload = document.getElementById('contacts-file-upload');
  const ALLOWED_TYPES = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const MAX_SIZE = 5242880; // 5MB

  document.querySelector('#contacts-file-upload')?.addEventListener('change', function() {
    const fileName = document.querySelector('#contacts-file-name');
    const file = fileUpload.files[0];
    let html = '';

    if (!file) return;

    if (file.size > MAX_SIZE) {
      html = fileName?.getAttribute('data-error-size') ?? '';
      fileUpload.value = '';
      fileName.classList.add('error');
    } else if (!ALLOWED_TYPES.includes(file.type)) {
      html = fileName?.getAttribute('data-error-type') ?? '';
      fileUpload.value = '';
      fileName.classList.add('error');
    } else {
      html = file.name;
      fileName.classList.remove('error');
    }

    if (fileName) fileName.innerText = html;
  });

});
