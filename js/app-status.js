import {setEnableForm, setDisableForm} from './ad-form.js';
import {setEnableFilter, setDisableFilter} from './filter.js';

const setAppEnabled = () => {
  setEnableForm();
  setEnableFilter();
};

const setAppDisabled = () => {
  setDisableForm();
  setDisableFilter();
};

export {setAppEnabled, setAppDisabled};

