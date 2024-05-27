import {createImagesData} from './data.js';
import './midget.js';

const fullsizeModal = document.querySelector('.big-picture');
const previewImageParent = document.querySelector('.pictures');
const fullsizeModalCloseBtn = document.querySelector('.big-picture__cancel');

const dataForImages = createImagesData();

previewImageParent.addEventListener('click', (evt) => {
  if (evt.target.matches('.picture__img')) {
    fullsizeModal.classList.remove('hidden');
    const fullsizeImage = document.querySelector('.big-picture__img');
    fullsizeImage.querySelector('img').src = evt.target.src;
  }
});

fullsizeModalCloseBtn.addEventListener('click', () => {
  fullsizeModal.classList.add('hidden');
})
