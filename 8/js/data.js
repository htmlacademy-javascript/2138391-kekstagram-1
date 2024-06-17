import {generatePhotoId, generateUrl, generateCommentId, getRandomInteger, getRandomArrayElement} from './util.js';

//Массив значений для ключа description объекта "Данные изображения"
const DESCRIPTION = [
  'Я художник я так вижу',
  'Наслаждайся каждым моментом',
  'Красота кроется в мелочах'
];

//Массив значений для ключа message объекта "Комментарий"
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Массив значений для ключа name объекта "Комментарий"
const NAMES = [
  'Арсений',
  'Анна',
  'Владимир',
  'Владлена',
  'Константин',
  'Кристина'
];

//Значение длины массива из объектов "Данные изображения"
const SIMILAR_IMAGE_DATA_COUNT = 25;

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createImageData = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: 14}, createComment)
});

const createImagesData = () => Array.from({length: SIMILAR_IMAGE_DATA_COUNT}, createImageData);

export {createImagesData, createImageData};

