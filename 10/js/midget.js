import {openFullsizeImgModal} from './fullsize-img-modal.js';

//Контейнер для миниатюр
const midgetsContainer = document.querySelector('.pictures');

//Находим в разметке шаблон и в шаблоне находим элемент с нужным классом
const midgetTemplate = document.querySelector('#picture').content.querySelector('.picture');

//Перебираем данные циклом и заполняем ими шаблон

const renderMidgets = (usersImagesData) => {
  const midgetsFragment = document.createDocumentFragment();
  usersImagesData.forEach((userImageData) => {
    const midget = midgetTemplate.cloneNode(true);
    midget.querySelector('.picture__img').src = userImageData.url;
    midget.querySelector('.picture__likes').textContent = userImageData.likes;
    midget.querySelector('.picture__comments').textContent = userImageData.comments.length;
    midgetsFragment.append(midget);
    midget.addEventListener('click', () => openFullsizeImgModal(userImageData));
  });
  midgetsContainer.append(midgetsFragment);
};

export {renderMidgets};
