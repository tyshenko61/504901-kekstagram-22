import {getRandomInt, shuffle, getRandomArrayElement, DESCRIPTION, MESSAGES, NAMES} from './util.js';

let currentId = 1;
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
