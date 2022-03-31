import {FILE_TYPES} from './constant.js';

const debounce = (cb, wait) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), wait);
  };
};

const showAlertError = (message) => {
  const alert = document.createElement('div');
  alert.style.padding = '10px 15px';
  alert.style.position = 'fixed';
  alert.style.top = '15px';
  alert.style.left = '50%';
  alert.style.zIndex = '999';
  alert.style.transform = 'translateX(-50%)';
  alert.style.background = 'red';
  alert.style.borderRadius = '5px';
  alert.style.fontSize = '20px';
  alert.style.fontWeight = 'bold';
  alert.style.color = '#ffffff';

  document.body.append(alert);

  alert.textContent = message;

  setTimeout(() => {
    alert.remove();
  }, 2000);
};

const onFileImageUpload = (filesElement, preview) => (evt) => {
  evt.preventDefault();
  const file = filesElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  } else {
    filesElement.value = '';
    showAlertError('Только формат изображения: jpg, jpeg, png, gif');
  }
};

export {debounce, showAlertError, onFileImageUpload};
