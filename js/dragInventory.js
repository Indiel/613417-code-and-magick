'use strict';

(function () {

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
