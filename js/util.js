/**
 * Returns a random positive integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */

const getRandomInt = (min, max) => {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(0, 10);

const getRandomArray = (elements, count) => {
  const newArray = [];
  const indexes = [];
  if (elements.length <= count) {
    return elements;
  }
  while (indexes.length < count) {
    const index = getRandomInt(0, elements.length - 1);
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
  }
  indexes.forEach((item) => {newArray.push(elements[item]);});
  return newArray;
}

/**
 * checking the maximum string length
 */
const checkMaxLength = (string, maxLength) => {
  return string.length <= maxLength;
};

const isValidWord = (string) => {
  return /^\w+$/.test(string) && !(~string.indexOf('_'));
}

const isUnique = (hashTags) => {
  const uniqueHashTags =[];
  let unique = true;
  hashTags.forEach((hashtag) => {
    const hashtagLower = hashtag.toLowerCase();
    if (uniqueHashTags.indexOf(hashtagLower) !== -1) {
      unique = false;
    }
    else {
      uniqueHashTags.push(hashtagLower);
    }
  });
  return unique;
}

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const debounce = (func, timeout) => {
  let timerId;
  return function () {
    const callFunc = () => func.apply(this, arguments);
    clearTimeout(timerId);
    timerId = setTimeout(callFunc, timeout);
  };
};

export {checkMaxLength, isValidWord, isUnique, showAlert, isEscEvent, isEnterEvent, debounce, getRandomArray};

