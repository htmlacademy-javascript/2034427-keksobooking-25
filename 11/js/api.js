import {API_URL} from './constant.js';

const getData = (onSuccess, onFailure) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onFailure();
    })
    .then(onSuccess)
    .catch(() => onFailure);
};

const setData = (onSuccess, onFailure, data) => {
  fetch(API_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onFailure();
    })
    .catch(onFailure);
};

export {getData, setData};
