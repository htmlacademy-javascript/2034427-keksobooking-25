import {createAvatar, getRandomArrayElements, getRandomElement} from './utils.js';
import {getRandomInt, getRandom} from './randomizer.js';

const TITLE = ['Квартира эконом класса', 'Квартира бизнес класса', 'Квартира люкс класса'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const DESCRIPTION = [
  '4 этаж, Тихий район,',
  '6 этаж, Развита инфраструктура',
  'Спокойный район, Хороший вид.'
];

const createObject = () => {
  const location = {
    lat: getRandom(35.65000, 35.70000, 5),
    lng: getRandom(139.70000, 139.80000, 5),
  };

  return {
    author: {
      avatar: createAvatar(),
    },
    offer: {
      title:        getRandomElement(TITLE),
      address:     `${location.lat}, ${location.lng}`,
      price:        getRandomInt(50000, 150000),
      type:         getRandomElement(TYPE),
      rooms:        getRandomInt(1, 5),
      guests:       getRandomInt(1, 3),
      checkin:      getRandomElement(CHECK),
      checkout:     getRandomElement(CHECK),
      features:     getRandomArrayElements(FEATURES),
      description:  getRandomElement(DESCRIPTION),
      photos:       getRandomArrayElements(PHOTOS)
    },
    location
  };
};

const listObjets = (count = 10) => Array.from({length: count}, createObject);

export {listObjets};
