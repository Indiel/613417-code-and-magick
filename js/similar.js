'use strict';

(function () {

  // Работа с сервером
  document.querySelector('.setup-similar').classList.remove('hidden');

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.colorizeWizard.colorCoat) {
      rank += 2;
    }
    if (wizard.colorEyes === window.colorizeWizard.colorEyes) {
      rank += 1;
    }
    if (wizard.colorFireball === window.colorizeWizard.colorFireball) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var wizards = [];

  var successHandler = function (data) {
    wizards = data;
    window.updateWizards();
  };

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

})();
