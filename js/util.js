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

/**
 * checking the maximum string length
 */
const checkMaxLength = (string, maxLength) => {
  return string.length <= maxLength;
};

checkMaxLength('ПРОВЕРКА длины строки', 10);

const NAMES = [
  'Елена',
  'Иван',
  'Николай',
  'Галина',
  'Алексей',
  'Нина',
  'Виктория',
  'Константин',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Пляж',
  'Указатель',
  'Море',
  'На отдыхе',
  'Веселые человечки',
  'Хочу такую же',
  'Два кусочека клубнички',
  'Аперитив',
  'Береговая охрана',
  'Обувница',
  'Дорога к морю',
  'В поселке',
  'Салат',
  'Не ешь меня, я тебе еще пригожусь',
  'Я отдыхаю',
  'Путь домой',
  'Хор местных жителей',
  'Продается',
  'Караул!!! Грабят!!!',
  'Пальмы, пальмы, пальмы...',
  'Обед',
  'Закат',
  'Краб',
  'Флэшмоб',
  'Переправа',
];

const shuffle = (count) => {
  const identifiers = Array.from({length: count}, (v, k) => k+1);
  for (let i = count - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [identifiers[i], identifiers[j]] = [identifiers[j], identifiers[i]];
  }
  return identifiers;
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

export {getRandomInt, shuffle, getRandomArrayElement, DESCRIPTION, MESSAGES, NAMES};
