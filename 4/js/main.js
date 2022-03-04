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

  return +rand.toFixed(countSigns);
};

getRandomInt(2, 5);
getRandom(2, 5);
