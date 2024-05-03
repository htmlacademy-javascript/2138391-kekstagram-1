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

export {generatePhotoId, generateUrl, generateCommentId, getRandomInteger, getRandomArrayElement};
