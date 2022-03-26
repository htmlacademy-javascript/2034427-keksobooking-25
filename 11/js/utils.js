const imgFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

const debounce = (fn, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), wait);
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
  }, 3000);
};

const fileUploader = (targetElement, fileElement, previewElement) => {

  const fileUpload = (files, preview) => {
    const file = files[0];
    const ext = file.type.split('/')[1];

    if (imgFileExtensions.includes(ext)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    } else {
      fileElement.value = '';
      showAlertError('Только формат изображения: jpg, jpeg, png, gif');
    }
  };

  const onFileUpload = (selector, preview) =>
    (evt) => {
      evt.preventDefault();
      fileUpload(selector.files, preview);
    };

  const dragenter = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };

  const dragover = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
  };

  const drop = (preview) => (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const dt = evt.dataTransfer;
    const files = dt.files;
    fileUpload(files, preview);
  };

  targetElement.addEventListener('change', onFileUpload(fileElement, previewElement));
  targetElement.addEventListener('dragenter', dragenter);
  targetElement.addEventListener('dragover', dragover);
  targetElement.addEventListener('drop', drop(previewElement));
};

export {debounce, showAlertError, fileUploader};
