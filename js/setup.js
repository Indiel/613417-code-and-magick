'use strict';

(function () {

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Работа с сервером
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'width: 460px; border-radius: 8px; z-index: 10; padding: 10px; margin: auto 50%; text-align: center; background-color: #DA641A; border: 2px solid #EE0000';
    node.style.position = 'absolute';
    node.style.left = '-230px';
    node.style.fontSize = '26px';
    node.style.textShadow = '0 0 10px #EE0000';
    node.style.boxShadow = '5px 5px 10px 3px rgba(0, 0, 0, 0.5)';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Получаем похожих волшебников с сервера
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      var index = Math.floor(Math.random() * wizards.length);
      var wizard = wizards.splice(index, 1);
      fragment.appendChild(renderWizard(wizard[0]));
    }
    similarListElement.appendChild(fragment);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.backend.load(successHandler, errorHandler);

  // Отправка формы на сервер
  var setup = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  // Перетаскивание предметов
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedElement;
  var copyDraggedElement;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedElement = evt.target;
      copyDraggedElement = draggedElement.cloneNode();
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      copyDraggedElement = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    if (evt.target.childNodes.length === 1) {
      evt.target.style.backgroundColor = 'red';
    } else if (evt.target.tagName === 'IMG') {
      evt.target.parentNode.style.backgroundColor = 'red';
    } else {
      evt.preventDefault();
      evt.target.style.backgroundColor = 'yellow';
    }
    artifactsElement.style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.appendChild(copyDraggedElement);
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  shopElement.addEventListener('dragend', function (evt) {
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragend', function (evt) {
    artifactsElement.style.outline = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.parentNode.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
