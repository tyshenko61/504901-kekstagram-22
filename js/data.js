import {getRandomInt, shuffle, getRandomArrayElement} from './util.js';

let currentId = 1;

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

const createComment = () => {
  return {
    id: currentId++,
    avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
}

const getComments = () => {
  const comments = [];
  const countComments = getRandomInt(0, 3);
  for (let i = 0; i < countComments; i++) {
    comments.push(createComment());
  }
  return comments;
}

const data = (id) => {
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: DESCRIPTION[id - 1],
    likes: getRandomInt(15, 200),
    comments: getComments(),
  };
}

const createPhotos = (count) => {
  const photos = [];
  const identifiers = shuffle(count);
  for (let i =0; i < count; i++) {
    photos.push(data(identifiers[i]));
  }
  return photos;
}

export {createPhotos};
