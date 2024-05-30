import {createImagesData, createImageData} from './data.js';
import './midget.js';

const fullsizeModal = document.querySelector('.big-picture');
const previewImageParent = document.querySelector('.pictures');
const fullsizeModalCloseBtn = document.querySelector('.big-picture__cancel');

const imagesData = createImagesData();

previewImageParent.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    fullsizeModal.classList.remove('hidden');
    const fullsizeImage = document.querySelector('.big-picture__img');
    fullsizeImage.querySelector('img').src = evt.target.src;
    const pictureLink = evt.target.closest('.picture');
    fullsizeModal.querySelector('.likes-count').textContent = pictureLink.querySelector('.picture__likes').textContent;
    fullsizeModal.querySelector('.comments-count').textContent = pictureLink.querySelector('.picture__comments').textContent;
    const commentsList = fullsizeModal.querySelector('.social__comments');
    const commentData = createImageData();
    commentData.comments.forEach((comment) => {
      const commentItem = fullsizeModal.querySelector('.social__comment').cloneNode(true);
      commentItem.querySelector('img').src = comment.avatar;
      commentItem.querySelector('img').alt = comment.name;
      commentItem.querySelector('.social__text').textContent = comment.message;
      commentsList.append(commentItem);
    });
  }
});

fullsizeModalCloseBtn.addEventListener('click', () => {
  fullsizeModal.classList.add('hidden');
})
