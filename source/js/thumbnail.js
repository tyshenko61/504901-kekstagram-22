import {openBigPicture} from './big-picture.js';

const listElement = document.querySelector('.pictures')
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
}

const renderThumbnails = (pictures) => {
  clearPictures();
  const photosFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length.toString();
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.addEventListener('click', () => {
      openBigPicture(picture);
    });
    photosFragment.appendChild(photoElement);
  });
  listElement.appendChild(photosFragment);
};

export {renderThumbnails};
