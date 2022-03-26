import {setEnableForm, setDisableForm} from './ad-form.js';
import {setDisableFilter} from './filter.js';
import {setDisabledSlider, setEnabledSlider} from './slider.js';

const setAppEnabled = () => {
  setEnableForm();
  setEnabledSlider();
};

const setAppDisabled = () => {
  setDisableForm();
  setDisabledSlider();
  setDisableFilter();
};

export {setAppEnabled, setAppDisabled};

