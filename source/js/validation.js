import {checkMaxLength, isValidWord, isUnique} from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const isValidHashtag = (string) => {
  let error = '';
  if (string.slice(0, 1) !== '#') {
    error = 'хэш-тег должен начинаться с символа #';
  } else if (!checkMaxLength(string, MAX_HASHTAG_LENGTH)) {
    error = 'максимальная длина одного хэш-тега ' + MAX_HASHTAG_LENGTH + ' символов';
  } else if (!isValidWord(string.slice(1))) {
    error = 'строка после решётки должна состоять из букв и чисел';
  }
  return error;
}

const checkHashTags = (string) => {
  let error = '';
  const errors = [];
  const hashTags = string.split(' ');
  if (hashTags.length > 5) {
    errors.push('нельзя указать больше пяти хэш-тегов');
  }
  if (!isUnique(hashTags)) {
    errors.push('один и тот же хэш-тег не может быть использован дважды');
  }
  hashTags.forEach((hashTag) => {
    error = isValidHashtag(hashTag);
    if (error) {
      errors.push(error);
    }
  });
  error = errors.join(' ');
  return error;
};

const checkComment = (string) => {
  return checkMaxLength(string, MAX_COMMENT_LENGTH)? '' : 'длина комментария не может составлять больше 140 символов';
};

export {checkHashTags, checkComment};
