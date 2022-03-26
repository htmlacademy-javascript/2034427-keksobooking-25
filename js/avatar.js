import {fileUploader} from './utils.js';
import {DEFAULT_AVATAR} from './constant.js';

const fileInputSelector = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const dropboxZone = fileInputSelector.parentNode;

fileUploader(dropboxZone, fileInputSelector, previewAvatar);

const clearAvatar = () => {
  previewAvatar.src = DEFAULT_AVATAR;
};

export {clearAvatar};

