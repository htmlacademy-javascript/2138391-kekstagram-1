import {isEscapeKey} from './util.js';

const imgLoadModal = document.querySelector('.img-upload__form');

const imgLoad = imgLoadModal.querySelector('#upload-file');

const imgEditor = imgLoadModal.querySelector('.img-upload__overlay');

const imgLoadModalCloseBtn = imgLoadModal.querySelector('#upload-cancel');

const hashtagsField = imgLoadModal.querySelector('.text__hashtags');

const commentField = imgLoadModal.querySelector('.text__description');

// Регулярное выражение для проверки состава хэштега

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

//Callback функция для document при наступлении события 'keydown', нажатии клавиши Esc
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgLoadModal();
  }
};

//Callback функция для поля загрузки изображения при наступлении события 'change'
function openImgLoadModal () {
  imgEditor.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

//Callback функция для кнопки закрытия модального окна загрузки изображения при наступлении события 'click'
function closeImgLoadModal () {
  imgEditor.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  imgLoad.value = '';
  hashtagsField.value = '';
  commentField.value = '';
}

imgLoad.addEventListener('change', () => {
  openImgLoadModal();
});

imgLoadModalCloseBtn.addEventListener('click', () => {
  closeImgLoadModal();
});

//Используя механизм всплытия не дает возможность отработать событию keydown на родительском элементе document

hashtagsField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

const pristine = new Pristine (imgLoadModal, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
}, false);

//Функция проверки для Pristine на соответствие хэштегов регулярному выражению
function validateHashtags (value) {
  if (value === '') {
    return true;
  } else {
    const trimmedValue = value.trim();
    const hashtagsArr = trimmedValue.split(' ');
    let result = '';
    for (let i = 0; i < hashtagsArr.length; i++) {
      result = hashtagRegExp.test(hashtagsArr[i]);
      if (result === false) {
        break;
      }
    }
    return result;
  }
}

//Функция проверки для Pristine уникальности хэштега
function validateHashtagsUnique (value) {
  const trimmedValue = value.trim();
  const hashtagsArr = trimmedValue.split(' ');
  let result = '';
  for (let i = 0; i < hashtagsArr.length - 1; i++) {
    for (let j = i + 1; j < hashtagsArr.length; j++) {
      if (hashtagsArr[i] === hashtagsArr[j]) {
        result = hashtagsArr[i] === hashtagsArr[j];
        break;
      }
    }
  }
  return !result;
}

//Функция проверки для Pristine количества хэштегов
function validateHashtagsQty (value) {
  const trimmedValue = value.trim();
  const hashtagsArr = trimmedValue.split(' ');
  return hashtagsArr.length <= 5;
}

//Функция проверки для Pristine длины комментария
function validateCommentLength (value) {
  const trimmedValue = value.trim();
  const commentSymbolsArr = trimmedValue.split('');
  return commentSymbolsArr.length <= 140;
}

//Добавление валидаций на поля при помощи Pristine
pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Хэштег до 20 символов, начинатеся с #, без спец символов'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsUnique,
  'Хэштег не может повторяться'
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsQty,
  'Не более 5 хэштегов'
);

pristine.addValidator(
  commentField,
  validateCommentLength,
  'Комментарий не больше 140 символов'
);

imgLoadModal.addEventListener('submit', () => {
  pristine.validate();
});
