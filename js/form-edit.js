import {checkHashTags, checkComment} from './validation.js';
import { isEscEvent, showAlert } from './util.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scalePreview = imgUpload.querySelector('.img-upload__preview');
const imagePreview = scalePreview.querySelector('img');
const sliderElement = imgUpload.querySelector('.effect-level__slider');
const effectValue = imgUpload.querySelector('.effect-level__value');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textComment = imgUpload.querySelector('.text__description');
const effectLevel = imgUpload.querySelector('.effect-level');
const effectList = imgUpload.querySelector('.effects__list');
const imgUploadForm = document.querySelector('#upload-select-image');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const SCALE_DEFAULT_VALUE = 100;

const FILTER_EFFECTS = [
  {
    id: 'effect-none',
    getStyle: () => '',
    hasSlider: false,
  },
  {
    id: 'effect-chrome',
    getStyle: (value) => `grayscale(${value})`,
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    hasSlider: true,
  },
  {
    id: 'effect-sepia',
    getStyle: (value) => `sepia(${value})`,
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    hasSlider: true,
  },
  {
    id: 'effect-marvin',
    getStyle: (value) => `invert(${value}%)`,
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    hasSlider: true,
  },
  {
    id: 'effect-phobos',
    getStyle: (value) => `blur(${value}px)`,
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    hasSlider: true,
  },
  {
    id: 'effect-heat',
    getStyle: (value) => `brightness(${value})`,
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    hasSlider: true,
  },
];

const onFormEditEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormEditPicture();
  }
};

uploadFile.addEventListener('change', (evt) => {
  const reader = new FileReader();
  const file = evt.target.files[0];

  reader.addEventListener('load',  () => {
    imagePreview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    scaleControlValue.value = SCALE_DEFAULT_VALUE + '%';
    imgUpload.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onFormEditEscKeydown);
  }
});

const closeFormEditPicture = () => {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  effectLevel.classList.add('hidden');
  scalePreview.style.transform = `scale(${SCALE_DEFAULT_VALUE / 100})`;
  resetEffect();

  document.removeEventListener('keydown', onFormEditEscKeydown);
}

imgUpload.querySelector('#upload-cancel').addEventListener('click', () => {
  closeFormEditPicture();
});

const getScaleControlValue = () => {
  return parseInt(scaleControlValue.value.slice(0,-1));
}

const setScaleControlValue = (value) => {
  scaleControlValue.value = value + '%';
  scalePreview.style.transform = `scale(${value / 100})`;
}

imgUpload.querySelector('.scale__control--smaller').addEventListener('click', () => {
  let value = getScaleControlValue();
  if (value > MIN_SCALE_VALUE) {
    value -= STEP_SCALE_VALUE;
    setScaleControlValue(value);
  }
});

imgUpload.querySelector('.scale__control--bigger').addEventListener('click', () => {
  let value = getScaleControlValue();
  if (value < MAX_SCALE_VALUE) {
    value += STEP_SCALE_VALUE;
    setScaleControlValue(value);
  }
});

const resetEffect = () => {
  imagePreview.style.filter = '';
  effectValue.value = '';
};

effectLevel.classList.add('hidden');

FILTER_EFFECTS.forEach(({ id, hasSlider, getStyle, options }) => {
  const effect = effectList.querySelector(`input[id=${id}]`);

  if (effect) {
    if (!hasSlider) {
      return effect.addEventListener('click', () => {
        resetEffect();
        effectLevel.classList.add('hidden');
      });
    }
    effect.addEventListener('change', () => {
      if (!sliderElement.noUiSlider) {
        window.noUiSlider.create(sliderElement, options);
      }
      resetEffect();
      effectLevel.classList.remove('hidden');
      sliderElement.noUiSlider.off();
      sliderElement.noUiSlider.updateOptions(options);

      sliderElement.noUiSlider.on('update', (values, handle) => {
        imagePreview.style.filter = getStyle(values[handle]);
        imagePreview.value = values[handle];
      });
    });
  }
});

textHashtags.addEventListener('input', () => {
  textHashtags.setCustomValidity(checkHashTags(textHashtags.value));
});

textComment.addEventListener('input', () => {
  textComment.setCustomValidity(checkComment(textComment.value));
});

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

textComment.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

const setUserFormSubmit = (onSuccess, onFail) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showAlert('Ваше изображение загружено');
        onSuccess();
      },
      () => {
        showAlert('Что пошло не так');
        onFail();
      },
      new FormData(evt.target),
    );
  });
};

export {closeFormEditPicture, setUserFormSubmit};
