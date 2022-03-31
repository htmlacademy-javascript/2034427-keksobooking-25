import {onFileImageUpload} from './utils.js';
import {DEFAULT_AVATAR} from './constant.js';

const fileElement = document.querySelector('.ad-form-header__input');
const previewElement = document.querySelector('.ad-form-header__preview img');

fileElement.addEventListener('change', onFileImageUpload(fileElement, previewElement));

const clearAvatar = () => {
  previewElement.src = DEFAULT_AVATAR;
};

export {clearAvatar};

