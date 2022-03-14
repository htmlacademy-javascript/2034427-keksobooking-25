import {getRandomInt} from './randomizer.js';

let indexAvatar = 0;
const createAvatar = () => {
  indexAvatar ++;
  return indexAvatar >= 10 ? `img/avatars/user${indexAvatar}.png` : `img/avatars/user0${indexAvatar}.png`;
};

const getRandomArrayElements = (array) => array.filter(() => getRandomInt(0, 1));

const getRandomElement = (elements) => elements[getRandomInt(0, elements.length -1)];

export {createAvatar, getRandomArrayElements, getRandomElement};
