import {listObjets} from './data.js';

const adsList = listObjets(1);

const adsListElement = document.querySelector('.map__canvas');
const adItemTemplate = document.querySelector('#card').content.querySelector('.popup');

const housing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

adsList.forEach(({author, offer}) => {
  const adItem = adItemTemplate.cloneNode(true);
  // eslint-disable-next-line
  offer.title
    ? adItem.querySelector('.popup__title').textContent = offer.title
    : adItem.querySelector('.popup__title').remove();
  adItem.querySelector('.popup__text--address').textContent = offer.address;
  adItem.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  adItem.querySelector('.popup__type').textContent = housing[offer.type];
  adItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adItem.querySelector('.popup__description').textContent = offer.description;
  adItem.querySelector('.popup__avatar').src = author.avatar;

  const featuresFragment = document.createDocumentFragment();
  const featureItem = adItem.querySelector('.popup__feature');
  featureItem.classList.remove(featureItem.classList.item(1));
  offer.features.forEach((feature) => {
    const featureClone = featureItem.cloneNode(true);
    featureClone.classList.add(`popup__feature--${feature}`);
    featuresFragment.appendChild(featureClone);
  });
  adItem.querySelector('.popup__features').innerHTML = '';
  adItem.querySelector('.popup__features').appendChild(featuresFragment);

  const photosFragment = document.createDocumentFragment();
  const photoItem = adItem.querySelector('.popup__photo');
  offer.photos.forEach((photo) => {
    const clone = photoItem.cloneNode(true);
    clone.src = photo;
    photosFragment.appendChild(clone);
  });
  adItem.querySelector('.popup__photos').innerHTML = '';
  adItem.querySelector('.popup__photos').appendChild(photosFragment);

  adsListElement.append(adItem);
});
