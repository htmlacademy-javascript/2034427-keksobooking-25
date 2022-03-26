import {fileUploader} from './utils.js';

const upload = document.querySelector('.ad-form__photo');
const fileSelector = document.querySelector('.ad-form__upload input');
const previewPhoto = document.createElement('img');
const dropboxZone = fileSelector.parentNode;

previewPhoto.style.display = 'flex';
previewPhoto.style.maxWidth = '100%';
previewPhoto.style.height = 'auto';

upload.append(previewPhoto);

fileUploader(dropboxZone, fileSelector, previewPhoto);

const clearPhoto = () => {
  previewPhoto.src = '';
};

export {clearPhoto};

