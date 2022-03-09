import {listObjets} from './data.js';

const adsList = listObjets(1);

const adsListElement = document.querySelector('.map__canvas');
const adItemTemplate = document.querySelector('#card').content.querySelector('.popup');

const housingType = (type) => {
  const housing = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  };
  return housing[type];
};

adsList.forEach(({author, offer}) => {
  const adItem = adItemTemplate.cloneNode(true);
  // eslint-disable-next-line
  offer.title
    ? adItem.querySelector('.popup__title').textContent = offer.title
    : adItem.querySelector('.popup__title').remove();
  adItem.querySelector('.popup__text--address').textContent = offer.address;
  adItem.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  adItem.querySelector('.popup__type').textContent = housingType(offer.type);
  adItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adItem.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adItem.querySelector('.popup__description').textContent = offer.description;
  adItem.querySelector('.popup__avatar').src = author.avatar;

  const featureList = adItem.querySelectorAll('.popup__feature');
  featureList.forEach((featureListItem) => {
    const isPresent = offer.features.some((feature) => featureListItem.classList.contains(`popup__feature--${feature}`));
    if (!isPresent) {
      featureListItem.remove();
    }
  });

  const fragment = document.createDocumentFragment();
  const photoElement = adItem.querySelector('.popup__photo');
  adItem.querySelector('.popup__photo').remove();
  offer.photos.forEach((photo) => {
    const clone = photoElement.cloneNode(true);
    clone.src = photo;
    fragment.appendChild(clone);
  });
  adItem.querySelector('.popup__photos').appendChild(fragment);

  adsListElement.append(adItem);
});
