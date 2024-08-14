import {isEscapeKey} from './util.js';

// Модальное окно полноэкранного изображения
const fullsizeImgModal = document.querySelector('.big-picture');

// Список комментариев к изображению
const commentsList = fullsizeImgModal.querySelector('.social__comments');

// Конент модального окна

const modalContent = fullsizeImgModal.querySelector('.big-picture__preview');

// Шаблон для комментария
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

// Фрагмент для хранения создаваемых комментариев
const commentsFragment = document.createDocumentFragment();

const loadCommentsBtn = fullsizeImgModal.querySelector('.social__comments-loader');

const fullsizeImgModalCloseBtn = document.querySelector('.big-picture__cancel');

let comments = [];

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullsizeImgModal();
  }
};

// Функция создания комментария
const createComment = (loadedComments) => {
  loadedComments.forEach((comment) => {
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('img').src = comment.avatar;
    commentItem.querySelector('img').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentItem);
  });
};

function openFullsizeImgModal(userImageData) {
  fullsizeImgModal.classList.remove('hidden');
  const fullsizeImage = fullsizeImgModal.querySelector('.big-picture__img img');
  fullsizeImage.src = userImageData.url;
  fullsizeImgModal.querySelector('.likes-count').textContent = userImageData.likes;
  fullsizeImgModal.querySelector('.comments-count').textContent = userImageData.comments.length;
  const loadedCommentsQty = fullsizeImgModal.querySelector('.comments-loaded');
  loadedCommentsQty.textContent = 0;
  comments = [...userImageData.comments];

  const onLoadCommentsBtnClick = () => {
    if (comments.length > 5) {
      for (let i = 0; i < 5; i++) {
        const commentItem = commentTemplate.cloneNode(true);
        commentItem.querySelector('img').src = comments[i].avatar;
        commentItem.querySelector('img').alt = comments[i].name;
        commentItem.querySelector('.social__text').textContent = comments[i].message;
        loadedCommentsQty.textContent++;
        commentsFragment.append(commentItem);
      }
      comments.splice(0, 5);
    } else {
      createComment(comments);
      loadedCommentsQty.textContent = Number(loadedCommentsQty.textContent) + comments.length;
      comments.splice(0, comments.length);
    }
    commentsList.append(commentsFragment);
    if (comments.length === 0) {
      loadCommentsBtn.classList.add('hidden');
      loadCommentsBtn.removeEventListener('click', onLoadCommentsBtnClick);
    }
  };

  onLoadCommentsBtnClick();

  commentsList.append(commentsFragment);
  loadCommentsBtn.addEventListener('click', onLoadCommentsBtnClick);
  fullsizeImgModal.querySelector('.social__caption').textContent = userImageData.description;
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  setTimeout(() => document.addEventListener('click', outsideClickModal), 0);
  fullsizeImgModalCloseBtn.addEventListener('click', closeFullsizeImgModal);
}

function closeFullsizeImgModal() {
  fullsizeImgModal.classList.add('hidden');
  commentsList.innerHTML = '';
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  document.removeEventListener('click', outsideClickModal);
  loadCommentsBtn.classList.remove('hidden');
}

function outsideClickModal(evt) {
  evt.preventDefault();
  if (!modalContent.contains(evt.target)) {
    closeFullsizeImgModal();
  }
}

export {openFullsizeImgModal, closeFullsizeImgModal};
