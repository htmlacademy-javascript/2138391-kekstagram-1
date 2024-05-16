import {createImagesData} from './data.js';

//Контейнер для миниатюр
const midgetsContainer = document.querySelector('.pictures');

//Находим в разметке шаблон и в шаблоне находим элемент с нужным классом
const midgetTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Данные из которых будем заполнять шаблон
const usersImagesData = createImagesData();

//Фрагмент для хранения создаваемых элементов
const midgetsFragment = document.createDocumentFragment();

//Перебираем данные циклом и заполняем ими шаблон

usersImagesData.forEach((userImageData) => {
  const midget = midgetTemplate.cloneNode(true);
  midget.querySelector('.picture__img').src = userImageData.url;
  midget.querySelector('.picture__likes').textContent = userImageData.likes;
  midget.querySelector('.picture__comments').textContent = userImageData.comments.length;
  midgetsFragment.append(midget);
});

midgetsContainer.append(midgetsFragment);
