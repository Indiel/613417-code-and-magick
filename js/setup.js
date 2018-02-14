'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

// Открытие/закрытие окна настройки персонажа
var onPopupEscPress = function (evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target.tagName !== 'INPUT') {
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', openPopup);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Валидация формы
var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов.');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов.');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле!');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов.');
  } else {
    target.setCustomValidity('');
  }
});

// Изменение цвета мантии, глаз и фаерболов по нажатию.
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var inputCoat = setup.querySelector('input[name="coat-color"]');
var inputEyes = setup.querySelector('input[name="eyes-color"]');
var inputFireball = setup.querySelector('input[name="fireball-color"]');

var coatsColorsCopy = COATS_COLORS.slice();
var eyesColorsCopy = EYES_COLORS.slice();

// var initialValueArray = 1;
// var changeColor = function (element, input, arr, str) {
//   if (initialValueArray >= arr.length) {
//     initialValueArray = 0;
//   }
//   element.style[str] = arr[initialValueArray];
//   input.value = arr[initialValueArray];
//   initialValueArray++;
// };

var changeColor = function (element, input, arr, str) {
  var color = arr.shift();
  arr.push(color);
  element.style[str] = arr[0];
  input.value = arr[0];
};

// var mainWizard = document.querySelector('.wizard');
// mainWizard.addEventListener('click', function (evt) {
//   changeColor(wizardCoat, inputCoat, coatsColorsCopy, 'fill');
// });

// var changeColor = function (element, input, arr, str) {
//   for (var j = 0; j < arr.length; j++) {
//     (function (index) {
//       // if (i >= arr.length) {
//       //   i = 0;
//       // }
//       element.style[str] = arr[index];
//       input.value = arr[index];
//     })(j);
//   }
// };

wizardCoat.addEventListener('click', function () {
  changeColor(wizardCoat, inputCoat, coatsColorsCopy, 'fill');
});

wizardEyes.addEventListener('click', function () {
  changeColor(wizardEyes, inputEyes, eyesColorsCopy, 'fill');
});

wizardFireball.addEventListener('click', function () {
  changeColor(wizardFireball, inputFireball, FIREBALL_COLORS, 'background');
});

// Отрисовка похожих волшебников
var getRandomValue = function (arr) {
  var randomValue = Math.floor(Math.random() * arr.length);
  return arr.splice(randomValue, 1).toString();
};

function Wizard(names, surnames, coatsColor, eyesColor) {
  this.name = getRandomValue(names) + ' ' + getRandomValue(surnames);
  this.coatColor = getRandomValue(coatsColor);
  this.eyesColor = getRandomValue(eyesColor);
}

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var fragment = document.createDocumentFragment();

var fillElement = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  fragment.appendChild(wizardElement);
};

for (var i = 0; i < 4; i++) {
  wizards[i] = new Wizard(WIZARD_NAMES, WIZARD_SURNAMES, COATS_COLORS, EYES_COLORS);
  fillElement(wizards[i]);
}

similarListElement.appendChild(fragment);
