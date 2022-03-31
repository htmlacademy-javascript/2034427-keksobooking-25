const successElement = document.querySelector('#success')
  .content.querySelector('.success').cloneNode(true);

const errorElement = document.querySelector('#error')
  .content.querySelector('.error').cloneNode(true);

const closeButtonElement = errorElement.querySelector('.error__button');

let currentModal;

function onClick(evt) {
  evt.preventDefault();
  closeModal(currentModal);
}

function onKeydown(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeModal(currentModal);
  }
}

function onClickCloseButton(evt) {
  evt.preventDefault();
  closeModal(currentModal);
}

function closeModal(modal) {
  if (modal === currentModal) {
    document.removeEventListener('keydown', onKeydown);
    modal.remove();
  }
}

function showModal(modal) {
  currentModal = modal;
  document.body.append(modal);
  document.addEventListener('keydown', onKeydown);
  modal.addEventListener('click', onClick);
}

function showSuccess() {
  showModal(successElement);
}

function showError() {
  showModal(errorElement);
  closeButtonElement.addEventListener('click', onClickCloseButton);
}

export {showSuccess, showError};

