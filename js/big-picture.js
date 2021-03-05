import { isEscEvent } from './util.js';

const STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const modalOpen = document.querySelector('body');
const listComments = bigPicture.querySelector('.big-picture__social').querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const createComment = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  const imgElement = commentElement.querySelector('.social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
}

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  listComments.textContent = '';
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const picture = {
  comments: [],
  nextComment: 0,
};

const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  picture.comments.slice(picture.nextComment, picture.nextComment + STEP).forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  listComments.appendChild(commentsFragment);
  picture.nextComment += STEP;

  if (picture.nextComment >= picture.comments.length) {
    commentsLoader.classList.add('hidden');
    picture.nextComment = 0;
  }
  if (picture.nextComment) {
    socialCommentCount.childNodes[0].nodeValue = `${picture.nextComment} из `;
  }
  else {
    socialCommentCount.childNodes[0].nodeValue = `${picture.comments.length} из `;
  }
};

const openBigPicture = (photoElement) => {
  bigPicture.classList.remove('hidden');
  modalOpen.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoElement.url;
  bigPicture.querySelector('.likes-count').textContent = photoElement.likes;
  bigPicture.querySelector('.social__caption').textContent = photoElement.description;
  bigPicture.querySelector('.comments-count').textContent = photoElement.comments.length.toString();
  if (commentsLoader.classList.contains('hidden')) {
    commentsLoader.classList.remove('hidden');
  }

  picture.comments = photoElement.comments;

  renderComments();

  document.addEventListener('keydown', onBigPictureEscKeydown);

  bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
    closeBigPicture();
  });
}

commentsLoader.addEventListener('click', () => {
  renderComments();
});

export {openBigPicture, closeBigPicture};
