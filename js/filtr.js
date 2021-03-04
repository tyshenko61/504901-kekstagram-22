import {getRandomArray} from './util.js';
const COUNT_PICTURES = 10;

const FILTER_FUNCTIONS = [
  {
    id: 'filter-default',
    filterFunction: (photos) => photos,
  },
  {
    id: 'filter-random',
    filterFunction: (photos) => getRandomArray(photos, COUNT_PICTURES),
  },
  {
    id: 'filter-discussed',
    filterFunction: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
  },
];

const sectionFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const setFilter = (photos, renderThumbnailsDebounced) => {
  sectionFilters.classList.remove('img-filters--inactive');
  filterButtons.forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('img-filters__button--active')) {
        const activeButton = sectionFilters.querySelector('.img-filters__button--active');
        if (activeButton) {
          activeButton.classList.remove('img-filters__button--active');
          item.classList.add('img-filters__button--active');
        }
      }
      FILTER_FUNCTIONS.filter((element) => element.id === item.id)
        .map((item) => {
          const newPhotos = item.filterFunction(photos);
          renderThumbnailsDebounced(newPhotos);
        });
    });
  });
};

export {setFilter};
