import {checkHashTags, checkComment} from './validation.js';

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

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;

sliderElement.style.cssText = 'display: none';
window.noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});



uploadFile.addEventListener('change', () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
});

const closeFormEditPicture = () => {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
}

imgUpload.querySelector('#upload-cancel').addEventListener('click', () => {
  closeFormEditPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA' &&  evt.key === ('Escape' || 'Esc')) {
    evt.preventDefault();
    closeFormEditPicture();
  }
});

const getScaleControlValue = () => {
  return parseInt(scaleControlValue.value.slice(0,-1));
}

const setScaleControlValue = (value) => {
  scaleControlValue.value = value + '%';
  scalePreview.style.cssText = 'transform: scale(' + value / 100 + ')';
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

const getEffect = () => {
  return imagePreview.className;
}

const applyEffect = (element) => {
  const effectItem= element.querySelector('.effects__preview').className.replace('effects__preview', '').trim();
  const oldEffect = getEffect();
  if (oldEffect) {
    imagePreview.classList.remove(getEffect());
  }
  if (effectItem !== 'effects__preview--none') {
    sliderElement.style.cssText = 'display: block';
    imagePreview.classList.add(effectItem);
  }

  switch (effectItem) {
    case 'effects__preview--chrome':
    case 'effects__preview--sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(1);
      break;

    case 'effects__preview--marvin':
      effectValue.value = 100;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderElement.noUiSlider.set(100);
      break;

    case 'effects__preview--phobos':
      effectValue.value = 3;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(3);
      break;
    case 'effects__preview--heat':
      effectValue.value = 3;
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(3);
      break;

    default:
      sliderElement.style.cssText = 'display: none';
  }

}

const effectsList = imgUpload.querySelectorAll('.effects__item');
effectsList.forEach((element) => {
  element.addEventListener('click', () => {
    applyEffect(element);
  });
});

const changeEffect = (value) => {
  switch (imagePreview.className) {
    case 'effects__preview--chrome':
      imagePreview.style.cssText = 'filter: grayscale('+value+')';
      break;

    case 'effects__preview--sepia':
      imagePreview.style.cssText = 'filter: sepia('+value+')';
      break;

    case 'effects__preview--marvin':
      imagePreview.style.cssText = 'filter: invert('+value+'%)';
      break;

    case 'effects__preview--phobos':
      imagePreview.style.cssText = 'filter: blur('+value+'px)';
      break;

    case 'effects__preview--heat':
      imagePreview.style.cssText = 'filter: brightness('+value+')';
      break;

    default:
      imagePreview.style.cssText = 'filter: none)';
  }
}

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectValue.value = unencoded[handle];
  changeEffect(effectValue.value);
});

textHashtags.addEventListener('blur', () => {
  textHashtags.setCustomValidity(checkHashTags(textHashtags.value));
});

textComment.addEventListener('blur', () => {
  textComment.setCustomValidity(checkComment(textComment.value));
});
