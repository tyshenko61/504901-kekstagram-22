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

const openBigPicture = (photoElement) => {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  const modalOpen = document.querySelector('body');
  modalOpen.classList.add('modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoElement.url;
  bigPicture.querySelector('.likes-count').textContent = photoElement.likes;
  bigPicture.querySelector('.social__caption').textContent = photoElement.description;
  bigPicture.querySelector('.comments-count').textContent = photoElement.comments.length.toString();
  const listComments = bigPicture.querySelector('.big-picture__social').querySelector('.social__comments');
  const commentsFragment = document.createDocumentFragment();
  photoElement.comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });
  listComments.appendChild(commentsFragment);

  bigPicture.querySelector('#picture-cancel').addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    modalOpen.classList.remove('modal-open');
    listComments.textContent = '';
  });
}
export {openBigPicture};
