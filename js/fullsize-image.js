import {createImageData} from './data.js';
import {isEscapeKey} from './util.js';

//Модальное окно полноэкранного изображения
const fullsizeModal = document.querySelector('.big-picture');

// Список комментариев к изображению
const commentsList = fullsizeModal.querySelector('.social__comments');

//Шаблон для комментария
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

//Callback функция для document при наступлении события 'keydown', нажатии клавиши Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullsizeImgModal();
  }
}

function openFullsizeImgModal (evt) {
  if (evt.target.matches('.picture__img')) {
    fullsizeModal.classList.remove('hidden');
    const fullsizeImage = document.querySelector('.big-picture__img');
    fullsizeImage.querySelector('img').src = evt.target.src;
    const pictureLink = evt.target.closest('.picture');
    fullsizeModal.querySelector('.likes-count').textContent = pictureLink.querySelector('.picture__likes').textContent;
    fullsizeModal.querySelector('.comments-count').textContent = pictureLink.querySelector('.picture__comments').textContent;
    const commentData = createImageData();
    commentData.comments.forEach((comment) => {
      const commentItem = commentTemplate.cloneNode(true);
      commentItem.querySelector('img').src = comment.avatar;
      commentItem.querySelector('img').alt = comment.name;
      commentItem.querySelector('.social__text').textContent = comment.message;
      commentsList.append(commentItem);
    });
    fullsizeModal.querySelector('.social__caption').textContent = commentData.description;
    fullsizeModal.querySelector('.social__comment-count').classList.add('hidden');
    fullsizeModal.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydownEsc);
  }
}



function closeFullsizeImgModal () {
  fullsizeModal.classList.add('hidden');
  commentsList.innerHTML = '';
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
}



export{openFullsizeImgModal, closeFullsizeImgModal};
