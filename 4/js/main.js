const AVATAR_IMG = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TITLE = [
  'Квартира эконом класса',
  'Квартира бизнес класса',
  'Квартира люкс класса',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const CHECK = [
  '12:00',
  '13:00',
  '14:00,'
];

const DESCRIPTION = [
  '4 этаж, Тихий район,',
  '6 этаж, Развита инфраструктура',
  'Спокойный район, Хороший вид.'
];

const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
];

const getRandomInt = (min, max) => {
  if (max <= min) {
    throw Error('Максимальное значение должно быть больше минимального.');
  }

  if (min < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandom = (min, max, countSigns = 2) => {
  if (max <= min) {
    throw Error('Максимальное значение должно быть больше минимального.');
  }

  if (min < 0 || countSigns < 0) {
    return NaN;
  }

  const rand = Math.random() * (max - min + 1) + min;

  return parseFloat(rand.toFixed(countSigns));
};

const getRandomArrayElements = (array) => {
  const result = [];

  for (let i = 0; i < array.length; i ++) {
    const random = getRandomInt(0, 1);
    if (!random) {
      continue;
    }
    result.push(array[i]);
  }
  return result;
};

const getRandomElement = (elements) => elements[getRandomInt(0, elements.length -1)];

const creteObject = () => {
  const array = [];

  for (let i = 0; i < AVATAR_IMG.length; i ++) {

    const location = {
      lat: getRandom(35.65000, 35.70000, 5),
      lng: getRandom(139.70000, 139.80000, 5),
    };

    array[i] = {
      author: {
        avatar: AVATAR_IMG[i],
      },
      offer: {
        title: getRandomElement(TITLE),
        address: `${location.lat}, ${location.lng}`,
        price: getRandomInt(5000, 15000),
        type: getRandomElement(TYPE),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 3),
        checkin: getRandomElement(CHECK),
        checkout: getRandomElement(CHECK),
        features: getRandomArrayElements(FEATURES),
        description: getRandomElement(DESCRIPTION),
        photos: getRandomArrayElements(PHOTOS)
      },
      location
    };
  }

  return array;
};

creteObject();
