//Проверяет палиндром
const checkPalindrome = (word) => {
  word = word.toLowerCase();
  if (word === word.slice(-1) + word.slice(1)) {
    return true;
  }
  return false;
};

checkPalindrome('ДовОд');

//Извлекает цифры из строки и приводит к положительному числу
const stringToNumber = (string) => {
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (string.at(i) >= '0' && string.at(i) <= '9') {
      number += string.at(i);
    }
  }
  return parseInt(number, 10);
};

stringToNumber('ECMAScript 2022');

//Добавляет символы в начало строки
const modifyString = (originalString, minLength, additionalString) => {
  let modifiedString = originalString;
  while (modifiedString.length < minLength) {
    const totalModifiedLength = modifiedString.length + additionalString.length;
    const symbolsToAdd = totalModifiedLength <= minLength ? additionalString : additionalString.slice(0, minLength - totalModifiedLength);
    modifiedString = symbolsToAdd + modifiedString;
  }
  return modifiedString;
};

modifyString('q', 4, 'we');

// Проверяет длину строки
const checkLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

checkLength('проверяемая строка', 18);
