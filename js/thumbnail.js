import {createPhotos} from './data.js';

const COUNT = 25;
const pictures = createPhotos(COUNT);

const listElement = document.querySelector('.pictures')
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosFragment = document.createDocumentFragment();

pictures.forEach(({url, likes, comments}) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photosFragment.appendChild(photoElement);
});

listElement.appendChild(photosFragment);
