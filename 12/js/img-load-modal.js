import {sendData} from './api.js';
import {isEscapeKey} from './util.js';

const imgLoadModal = document.querySelector('.img-upload__form');
const imgLoad = imgLoadModal.querySelector('#upload-file');
const loadedImg = imgLoadModal.querySelector('img');
const imgEditor = imgLoadModal.querySelector('.img-upload__overlay');
const imgLoadModalCloseBtn = imgLoadModal.querySelector('#upload-cancel');
const publishBtn = imgLoadModal.querySelector('#upload-submit');
const hashtagsField = imgLoadModal.querySelector('.text__hashtags');
const commentField = imgLoadModal.querySelector('.text__description');
const scaleMinusBtn = imgLoadModal.querySelector('.scale__control--smaller');
const scalePlusBtn = imgLoadModal.querySelector('.scale__control--bigger');
const scaleValueField = imgLoadModal.querySelector('.scale__control--value');
const imgUploadPreview = imgLoadModal.querySelector('.img-upload__preview');
const imgEffectLevelContainer = imgLoadModal.querySelector('.img-upload__effect-level');
const imgEffectsContainer = imgLoadModal.querySelector('.effects__list');
const imgBasicClass = imgUploadPreview.className;
const effectNofilter = imgLoadModal.querySelector('#effect-none');
const imgEffectSlider = imgLoadModal.querySelector('.effect-level__slider');
const effectInput = imgLoadModal.querySelector('.effect-level__value');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successMessageBtn = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorMessageBtn = errorMessage.querySelector('.error__button');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const EXTENSIONS = ['jpeg', 'jpg', 'png'];
const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgLoadModal();
  }
};
const outsideClickModal = (evt, state) => {
  if (state === 'success') {
    if (!successMessage.querySelector('.success__inner').contains(evt.target)) {
      removeSuccessModal();
    }
  } else if (!errorMessage.querySelector('.error__inner').contains(evt.target)) {
    removeErrorModal();
  }
};

const listenerClickSuccessBtn = function () {
  removeSuccessModal();
};

const listenerClickOutsideSuccess = function (evt) {
  outsideClickModal(evt, 'success');
};

const listenerEscSuccess = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessModal();
  }
};

const listenerClickErrorBtn = function () {
  removeErrorModal();
};

const listenerClickOutsideError = function (evt) {
  outsideClickModal(evt);
};

const listenerEscError = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorModal();
  }
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return EXTENSIONS.some((extension) => fileName.endsWith(extension));
};

function removeSuccessModal () {
  successMessage.remove();
  successMessageBtn.removeEventListener('click', listenerClickSuccessBtn);
  successMessage.removeEventListener('click', listenerClickOutsideSuccess);
  document.removeEventListener('keydown', listenerEscSuccess);
}

function removeErrorModal () {
  errorMessage.remove();
  errorMessageBtn.removeEventListener('click', listenerClickErrorBtn);
  errorMessage.removeEventListener('click', listenerClickOutsideError);
  document.removeEventListener('keydown', listenerEscError);
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function openImgLoadModal() {
  imgEditor.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  document.addEventListener('click', outsideClickModal);
  scaleValueField.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
  effectNofilter.checked = true;
  imgEffectLevelContainer.classList.add('visually-hidden');
}

function closeImgLoadModal() {
  imgEditor.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  document.removeEventListener('click', outsideClickModal);
  scaleValueField.readOnly = false;
  scaleValueField.value = '100%';
  imgLoad.value = '';
  hashtagsField.value = '';
  commentField.value = '';
  imgUploadPreview.className = imgBasicClass;
  imgUploadPreview.style.filter = '';
}

imgLoad.addEventListener('change', () => {
  const file = imgLoad.files[0];
  if (file && isValidType(file)) {
    const url = URL.createObjectURL(file);
    loadedImg.src = url;
    openImgLoadModal();
  }
});

imgLoadModalCloseBtn.addEventListener('click', () => {
  closeImgLoadModal();
});

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

const postDataCallBack = async (formData) => {
  publishBtn.disabled = true;
  try {
    await sendData(formData);
    document.querySelector('body').append(successMessage);
    successMessageBtn.addEventListener('click', listenerClickSuccessBtn);
    successMessage.addEventListener('click', listenerClickOutsideSuccess);
    document.addEventListener('keydown', listenerEscSuccess);
    closeImgLoadModal();
  } catch {
    document.querySelector('body').append(errorMessage);
    document.removeEventListener('keydown', onDocumentKeydownEsc);
    errorMessageBtn.addEventListener('click', listenerClickErrorBtn);
    errorMessage.addEventListener('click', listenerClickOutsideError);
    document.addEventListener('keydown', listenerEscError);
  } finally {
    publishBtn.disabled = false;
  }
};

imgLoadModal.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    postDataCallBack(formData);
  }
});

//Callback функция для кнопки "-" изменения масштаба изображения при наступлении события 'click'
function scaleDown () {
  let scaleValueTransformed = parseFloat(scaleValueField.value);
  if (scaleValueTransformed > 25) {
    scaleValueTransformed = scaleValueTransformed - 25;
    scaleValueField.value = `${scaleValueTransformed}%`;
    imgUploadPreview.style.transform = `scale(${scaleValueField.value})`;
  }
}

//Callback функция для кнопки "+" изменения масштаба изображения при наступлении события 'click'
function scaleUp () {
  let scaleValueTransformed = parseFloat(scaleValueField.value);
  if (scaleValueTransformed < 100) {
    scaleValueTransformed = scaleValueTransformed + 25;
    scaleValueField.value = `${scaleValueTransformed}%`;
    imgUploadPreview.style.transform = `scale(${scaleValueField.value})`;
  }
}

scaleMinusBtn.addEventListener('click', scaleDown);

scalePlusBtn.addEventListener('click', scaleUp);

//Визуальные фильтры изображения

//Функция применения визуального эффекта на изображение
function appliesEffect (evt) {
  if (evt.target.matches('#effect-chrome')) {
    imgUploadPreview.classList.add('effects__preview--chrome');
    imgEffectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imgEffectSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `grayscale(${imgEffectSlider.noUiSlider.get()})`;
    });
  } else {
    imgUploadPreview.classList.remove('effects__preview--chrome');
  }
  if (evt.target.matches('#effect-sepia')) {
    imgUploadPreview.classList.add('effects__preview--sepia');
    imgEffectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
    imgEffectSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `sepia(${imgEffectSlider.noUiSlider.get()})`;
    });
  } else {
    imgUploadPreview.classList.remove('effects__preview--sepia');
  }
  if (evt.target.matches('#effect-marvin')) {
    imgUploadPreview.classList.add('effects__preview--marvin');
    imgEffectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
    imgEffectSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `invert(${imgEffectSlider.noUiSlider.get()}%)`;
    });
  } else {
    imgUploadPreview.classList.remove('effects__preview--marvin');
  }
  if (evt.target.matches('#effect-phobos')) {
    imgUploadPreview.classList.add('effects__preview--phobos');
    imgEffectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
    imgEffectSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `blur(${imgEffectSlider.noUiSlider.get()}px)`;
    });
  } else {
    imgUploadPreview.classList.remove('effects__preview--phobos');
  }
  if (evt.target.matches('#effect-heat')) {
    imgUploadPreview.classList.add('effects__preview--heat');
    imgEffectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
    imgEffectSlider.noUiSlider.on('update', () => {
      imgUploadPreview.style.filter = `brightness(${imgEffectSlider.noUiSlider.get()})`;
    });
  } else {
    imgUploadPreview.classList.remove('effects__preview--heat');
  }
  if (evt.target.matches('#effect-none')) {
    imgEffectLevelContainer.classList.add('visually-hidden');
    imgUploadPreview.style.filter = '';
    effectInput.value = '';
  } else {
    imgEffectLevelContainer.classList.remove('visually-hidden');
  }
}

//Родительский элемент визуальных эффектов, который ловит событие change дочерних элементов и обрабатывает их при помощи обработчика
imgEffectsContainer.addEventListener('change', (evt) => {
  appliesEffect(evt);
});

//Создает слайдер на элементе при помощи noUiSlider
noUiSlider.create(imgEffectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      } else {
        return value.toFixed(1);
      }
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

//добавляет условное событие update при помощи noUISlider на элемент на котором был создан слайдер
imgEffectSlider.noUiSlider.on('update', () => {
  effectInput.value = imgEffectSlider.noUiSlider.get();
});

export {removeSuccessModal, closeImgLoadModal};
