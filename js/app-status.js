import {setEnableForm, setDisableForm} from './ad-form.js';
import {setDisableFilterForm} from './filter.js';
import {setDisabledSlider, setEnabledSlider} from './slider.js';

const setEnabledApp = () => {
  setEnableForm();
  setEnabledSlider();
};

const setDisabledApp = () => {
  setDisableForm();
  setDisabledSlider();
  setDisableFilterForm();
};

export {setEnabledApp, setDisabledApp};

