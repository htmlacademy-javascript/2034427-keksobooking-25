const adItemTemplate = document.querySelector('#card').content.querySelector('.popup');

const offers = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const createAdElement = ({author, offer}) => {
  const adElement = adItemTemplate.cloneNode(true);
  // eslint-disable-next-line
  offer.title
    ? adElement.querySelector('.popup__title').textContent = offer.title
    : adElement.querySelector('.popup__title').remove();
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  adElement.querySelector('.popup__type').textContent = offers[offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adElement.querySelector('.popup__description').textContent = offer.description;
  adElement.querySelector('.popup__avatar').src = author.avatar;

  adElement.querySelector('.popup__features').innerHTML =
    offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('');

  adElement.querySelector('.popup__photos').innerHTML =
    offer.photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('');

  return adElement;
};

export {createAdElement};