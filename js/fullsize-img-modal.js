import {createImageData} from './data.js';
import {isEscapeKey} from './util.js';

//Модальное окно полноэкранного изображения
const fullsizeImgModal = document.querySelector('.big-picture');

//Список комментариев к изображению
const commentsList = fullsizeImgModal.querySelector('.social__comments');

//Шаблон для комментария
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

//Фрагмент для хранения создаваемых комментариев
const commentsFragment = document.createDocumentFragment();

//Callback функция для document при наступлении события 'keydown', нажатии клавиши Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullsizeImgModal();
  }
};

//Функция создания комментария
const createComment = (imageData) => {
  imageData.comments.forEach((comment) => {
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentItem);
  });
};

function openFullsizeImgModal (evt) {
  if (evt.target.matches('.picture__img')) {
    fullsizeImgModal.classList.remove('hidden');
    const fullsizeImage = fullsizeImgModal.querySelector('.big-picture__img');
    fullsizeImage.querySelector('img').src = evt.target.src;
    const imageLink = evt.target.closest('.picture');
    fullsizeImgModal.querySelector('.likes-count').textContent = imageLink.querySelector('.picture__likes').textContent;
    fullsizeImgModal.querySelector('.comments-count').textContent = imageLink.querySelector('.picture__comments').textContent;
    const imageData = createImageData();
    createComment(imageData);
    commentsList.append(commentsFragment);
    fullsizeImgModal.querySelector('.social__caption').textContent = imageData.description;
    fullsizeImgModal.querySelector('.social__comment-count').classList.add('hidden');
    fullsizeImgModal.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydownEsc);
  }
}

function closeFullsizeImgModal () {
  fullsizeImgModal.classList.add('hidden');
  commentsList.innerHTML = '';
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
}

export{openFullsizeImgModal, closeFullsizeImgModal};
