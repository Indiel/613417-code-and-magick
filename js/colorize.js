'use strict';

(function () {

  var COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var coatsColorsCopy = COATS_COLORS.slice();
  var eyesColorsCopy = EYES_COLORS.slice();

  // Изменение цвета мантии, глаз и фаерболов по нажатию.
  var setup = document.querySelector('.setup');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var inputCoat = setup.querySelector('input[name="coat-color"]');
  var inputEyes = setup.querySelector('input[name="eyes-color"]');
  var inputFireball = setup.querySelector('input[name="fireball-color"]');

  var changeColor = function (element, input, arr, str) {
    var color = arr.shift();
    arr.push(color);
    element.style[str] = arr[0];
    input.value = arr[0];
  };

  wizardCoat.addEventListener('click', function () {
    changeColor(wizardCoat, inputCoat, coatsColorsCopy, 'fill');
  });

  wizardEyes.addEventListener('click', function () {
    changeColor(wizardEyes, inputEyes, eyesColorsCopy, 'fill');
  });

  wizardFireball.addEventListener('click', function () {
    changeColor(wizardFireball, inputFireball, FIREBALL_COLORS, 'background');
  });

})();
