// import {closeFormEditPicture} from './form-edit.js';
// import {closeBigPicture} from './big-picture.js';

// const imgUpload = document.querySelector('.img-upload__overlay');

// const closeOpen = document.addEventListener('keydown', (evt) => {
//   if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' &&  evt.key === ('Escape' || 'Esc')) {
//     evt.preventDefault();
//     if (document.querySelector('body').classList.contains('modal-open')) {
//       if (imgUpload.classList.contains('hidden')) {
//         closeBigPicture();
//       }
//       else {
//         closeFormEditPicture();
//       }
//     }
//   }
// });

import {isEscEvent, isEnterEvent} from './util.js';

const userModalElement = document.querySelector('.setup');
const userModalOpenElement = document.querySelector('.setup-open');
const userModalCloseElement = userModalElement.querySelector('.setup-close');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    openUserModal();
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeUserModal();
  }
});

export {openUserModal, closeUserModal};
