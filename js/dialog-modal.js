const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeButton = errorModal.querySelector('.error__button');

successModal.classList.add('hidden');
errorModal.classList.add('hidden');

document.body.append(successModal);
document.body.append(errorModal);

const showModal = (modal) => {
  modal.classList.remove('hidden');
  modal.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);

  function onClick (evt) {
    const target = evt.target;
    if (target === successModal || target === errorModal || target === closeButton) {

      if (target === closeButton) {
        target.parentNode.classList.add('hidden');
      } else {
        target.classList.add('hidden');
      }
      clearListeners(modal);
    }
  }

  function onKeydown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      modal.classList.add('hidden');
      modal.removeEventListener('click', onClick);
    }
    clearListeners(modal);
  }

  function clearListeners(modalSelector) {
    modalSelector.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeydown);
  }
};

const showSuccess = () => {showModal(successModal);};
const showError = () => {showModal(errorModal);};

export {showSuccess, showError};

