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

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const getRandomArray = (elements, count) => {
  if (elements.length <= count) {
    return elements;
  }
  const uniqueElements = new Set();
  while (uniqueElements.size < count) {
    uniqueElements.add(getRandomArrayElement(elements));
  }
  return Array.from(uniqueElements);
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
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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

const debounce = (func, timeout) => {
  let timerId;
  return (...args) => {
    const callFunc = () => func.apply(this, args);
    clearTimeout(timerId);
    timerId = setTimeout(callFunc, timeout);
  };
};

// const debounce = (cb, ms) => {
//   let timeout;

//   return (...args) => {
//     const callCb = () => cb.apply(this, args);

//     clearTimeout(timeout);

//     timeout = setTimeout(callCb, ms);
//   };
// };

export {checkMaxLength, isValidWord, isUnique, showAlert, isEscEvent, debounce, getRandomArray};

