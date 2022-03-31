import {onFileImageUpload} from './utils.js';

const imgContainerElement = document.querySelector('.ad-form__photo');
const fileElement = document.querySelector('.ad-form__upload input');
const previewElement = document.createElement('img');

previewElement.style.display = 'flex';
previewElement.style.maxWidth = '100%';
previewElement.style.height = 'auto';
imgContainerElement.append(previewElement);

fileElement.addEventListener('change', onFileImageUpload(fileElement, previewElement));

const clearPhoto = () => {
  previewElement.remove();
};

export {clearPhoto};

