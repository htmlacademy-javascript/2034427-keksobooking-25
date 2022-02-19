const getRandomInt = (min, max) => {
  if (max <= min) {
    console.log('Максимальное значение должно быть больше минимального.');
    return false;
  }

  if (min < 0) {
    return false;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandom = (min, max, countSigns = 2) => {
  if (max <= min) {
    console.log('Максимальное значение должно быть больше минимального.');
    return false;
  }

  if (min < 0 || countSigns < 0) {
    return false;
  }

  let rand = Math.random() * (max - min + 1) + min;

  return +rand.toFixed(countSigns);
}

getRandomInt(2, 5);
getRandom(2, 5);
