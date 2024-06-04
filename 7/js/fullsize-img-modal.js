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
    const loadedCommentsQty = fullsizeImgModal.querySelector('.comments-loaded');
    loadedCommentsQty.textContent = 0;
    // Загрузка первых пяти комментариев или менее, если в массиве меньше 5 элементов
    if (imageData.comments.length > 5) {
      for (let i = 0; i < 5; i++) {
        const commentItem = commentTemplate.cloneNode(true);
        commentItem.querySelector('img').src = imageData.comments[i].avatar;
        commentItem.querySelector('img').alt = imageData.comments[i].name;
        commentItem.querySelector('.social__text').textContent = imageData.comments[i].message;
        loadedCommentsQty.textContent++;
        commentsFragment.append(commentItem);
      }
      imageData.comments.splice(0, 5);
    } else {
      createComment(imageData);
      loadedCommentsQty.textContent = imageData.comments.length;
      imageData.comments.splice(0, imageData.comments.length);
    }
    commentsList.append(commentsFragment);
    //Кнопка "Загрузить еще"
    const loadCommentsBtn = fullsizeImgModal.querySelector('.social__comments-loader');
    //Callback функция для события click кнопки "Загрузить еще"
    const onLoadCommentsBtnClick = () => {
      if (imageData.comments.length > 5) {
        for (let i = 0; i < 5; i++) {
          const commentItem = commentTemplate.cloneNode(true);
          commentItem.querySelector('img').src = imageData.comments[i].avatar;
          commentItem.querySelector('img').alt = imageData.comments[i].name;
          commentItem.querySelector('.social__text').textContent = imageData.comments[i].message;
          loadedCommentsQty.textContent++;
          commentsFragment.append(commentItem);
        }
        imageData.comments.splice(0, 5);
      } else {
        createComment(imageData);
        loadedCommentsQty.textContent = Number(loadedCommentsQty.textContent) + imageData.comments.length;
        imageData.comments.splice(0, imageData.comments.length);
      }
      commentsList.append(commentsFragment);
      //Удаляет обработчик событий с кнопки "Загрузить еще" когда все комменты загружены
      if (imageData.comments.length === 0) {
        loadCommentsBtn.removeEventListener('click', onLoadCommentsBtnClick);
      }
    };
    loadCommentsBtn.addEventListener('click', onLoadCommentsBtnClick);
    fullsizeImgModal.querySelector('.social__caption').textContent = imageData.description;
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
