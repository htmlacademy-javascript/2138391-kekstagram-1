// import {createImagesData} from './data.js';

// //Контейнер для миниатюр
// const midgetsContainer = document.querySelector('.pictures');

// //Находим в разметке шаблон и в шаблоне находим элемент с нужным классом
// const midgetTemplate = document.querySelector('#picture').content.querySelector('.picture');

// //Данные из которых будем заполнять шаблон
// const usersImagesData = createImagesData();

// //Фрагмент для хранения создаваемых элементов
// const midgetsFragment = document.createDocumentFragment();

// //Перебираем данные циклом и заполняем ими шаблон

// usersImagesData.forEach((userImageData) => {
//   const midget = midgetTemplate.cloneNode(true);
//   midget.querySelector('.picture__img').src = userImageData.url;
//   midget.querySelector('.picture__likes').textContent = userImageData.likes;
//   midget.querySelector('.picture__comments').textContent = userImageData.comments.length;
//   midgetsFragment.append(midget);
// });

// midgetsContainer.append(midgetsFragment);

// //Далее модуль для полноэкранного режима
// import {createImagesData, createImageData} from './data.js';
// import {isEscapeKey} from './util.js';
// import './midget.js';

// const fullsizeModal = document.querySelector('.big-picture');
// const previewImageParent = document.querySelector('.pictures');
// const fullsizeModalCloseBtn = document.querySelector('.big-picture__cancel');
// const commentsList = fullsizeModal.querySelector('.social__comments');
// const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
// const onDocumentKeydownEsc = (evt) => {
//   console.log(evt.target);
//   evt.preventDefault();
//   fullsizeModal.classList.add('hidden');
// }

// previewImageParent.addEventListener('click', (evt) => {
//   if (evt.target.matches('.picture__img')) {
//     fullsizeModal.classList.remove('hidden');
//     const fullsizeImage = document.querySelector('.big-picture__img');
//     fullsizeImage.querySelector('img').src = evt.target.src;
//     const pictureLink = evt.target.closest('.picture');
//     fullsizeModal.querySelector('.likes-count').textContent = pictureLink.querySelector('.picture__likes').textContent;
//     fullsizeModal.querySelector('.comments-count').textContent = pictureLink.querySelector('.picture__comments').textContent;
//     const commentData = createImageData();
//     commentData.comments.forEach((comment) => {
//       const commentItem = commentTemplate.cloneNode(true);
//       commentItem.querySelector('img').src = comment.avatar;
//       commentItem.querySelector('img').alt = comment.name;
//       commentItem.querySelector('.social__text').textContent = comment.message;
//       commentsList.append(commentItem);
//     });
//     fullsizeModal.querySelector('.social__caption').textContent = commentData.description;
//     fullsizeModal.querySelector('.social__comment-count').classList.add('hidden');
//     fullsizeModal.querySelector('.comments-loader').classList.add('hidden');
//     document.querySelector('body').classList.add('modal-open');
//   }
// });

// fullsizeModalCloseBtn.addEventListener('click', () => {
//   fullsizeModal.classList.add('hidden');
//   commentsList.innerHTML = '';
//   document.querySelector('body').classList.remove('modal-open');
// })
