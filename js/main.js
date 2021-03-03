import {renderThumbnails} from './thumbnail.js';
import {getData} from './api.js';
import {closeFormEditPicture, setUserFormSubmit} from './form-edit.js';
import { showAlert } from './util.js';

getData((photos) => {
  renderThumbnails(photos);
}, () => showAlert('Что-то пошло не так'),
);

setUserFormSubmit(closeFormEditPicture, closeFormEditPicture);
