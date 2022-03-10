const adItemTemplate = document.querySelector('#card').content.querySelector('.popup');

const housing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

const createFeaturesFragment = (element, features) => {
  const featuresFragment = document.createDocumentFragment();
  const featureItem = element.querySelector('.popup__feature');
  featureItem.classList.remove(featureItem.classList.item(1));
  features.forEach((feature) => {
    const featureClone = featureItem.cloneNode(true);
    featureClone.classList.add(`popup__feature--${feature}`);
    featuresFragment.appendChild(featureClone);
  });
  element.querySelector('.popup__features').innerHTML = '';

  return featuresFragment;
};

const createPhotosFragment = (element, photos) => {
  const photosFragment = document.createDocumentFragment();
  const photoItem = element.querySelector('.popup__photo');
  photos.forEach((photo) => {
    const photoClone = photoItem.cloneNode(true);
    photoClone.src = photo;
    photosFragment.appendChild(photoClone);
  });
  element.querySelector('.popup__photos').innerHTML = '';

  return photosFragment;
};

const createAdElement = ({author, offer}) => {
  const element = adItemTemplate.cloneNode(true);
  // eslint-disable-next-line
  offer.title
    ? element.querySelector('.popup__title').textContent = offer.title
    : element.querySelector('.popup__title').remove();
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  element.querySelector('.popup__type').textContent = housing[offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  element.querySelector('.popup__description').textContent = offer.description;
  element.querySelector('.popup__avatar').src = author.avatar;

  element.querySelector('.popup__features').appendChild(createFeaturesFragment(element, offer.features));
  element.querySelector('.popup__photos').appendChild(createPhotosFragment(element, offer.photos));

  return element;
};

export {createAdElement};
