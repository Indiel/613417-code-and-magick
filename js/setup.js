'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

document.querySelector('.setup').classList.remove('hidden');

var getRandomValue = function (arr) {
  var randomValue = Math.floor(Math.random() * arr.length);
  var arrReturn = arr[randomValue];
  arr.splice(randomValue, 1);
  return arrReturn;
};

function Wizard(names, surnames, coatsColor, eyesColor) {
  this.name = getRandomValue(names) + ' ' + getRandomValue(surnames);
  this.coatColor = getRandomValue(coatsColor);
  this.eyesColor = getRandomValue(eyesColor);
}

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var fillElement = function (value) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = value.name;
  wizardElement.querySelector('.wizard-coat').style.fill = value.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = value.eyesColor;
  similarListElement.appendChild(wizardElement);
};

for (var i = 0; i < 4; i++) {
  wizards[i] = new Wizard(WIZARD_NAMES, WIZARD_SURNAMES, COATS_COLOR, EYES_COLORS);
  fillElement(wizards[i]);
}
