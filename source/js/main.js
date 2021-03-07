import {renderThumbnails} from './thumbnail.js';
import {getData} from './api.js';
import {closeFormEditPicture, setUserFormSubmit} from './form-edit.js';
import {showAlert, debounce} from './util.js';
import {setFilter} from './filtr.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderThumbnails(photos);
  setFilter(photos, debounce(renderThumbnails, RERENDER_DELAY));
}, () => showAlert('Что-то пошло не так'),
);

setUserFormSubmit(closeFormEditPicture, closeFormEditPicture);
