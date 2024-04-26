//Функция для получения неповторяющегося значения от 1 до бесконечности (при каждом вызове значение увеличивается на единицу)//
function createSimpleIdGenerator () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//Получение значения для ключа id объекта "Данные изображения"
const generatePhotoId = createSimpleIdGenerator();
//Получение значения для ключа url объекта "Данные изображения"
const generateUrl = createSimpleIdGenerator();
//Получение значения для ключа id объекта "Комментарий"
const generateCommentId = createSimpleIdGenerator();


//Функция для получения случайного целого числа
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//Функция для получения случайного элемента массива
function getRandomArrayElement (array) {
  return array[getRandomInteger(0, array.length - 1)];
}

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
  avatar: `img/avatar-${getRandomInteger(1, 6)}.sv`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createImageData = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments:[createComment(), createComment()]
});

const similarImageData = Array.from({length: SIMILAR_IMAGE_DATA_COUNT}, createImageData);
similarImageData.reverse(); //Написал только для того, чтобы линтер не ругался что переменная никогда не использовалась

