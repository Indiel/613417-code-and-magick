'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FONT_SIZE = 16;
var MAX_BAR_HEIGHT = 150;

var messageTexts = ['Ура вы победили!', 'Список результатов:'];

// функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + GAP);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH - GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT - GAP);
  ctx.lineTo(x, y + CLOUD_HEIGHT);
  ctx.lineTo(x + GAP, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

// нахождение максимального элемента массива
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// задаем диапазон рандомному числу
var getRangeRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

// выбор цвета
var getColorBar = function (name) {

  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    return 'rgba(0, 0, 255, ' + getRangeRandom(0.05, 1) + ')';
  }
};

// функция отрисовки столбца
var drawBar = function (ctx, name, value, x, y, height, width) {
  ctx.fillStyle = 'black';
  ctx.fillText(name, x, y + GAP);
  ctx.fillText(Math.floor(value), x, y - FONT_SIZE - height);

  ctx.fillStyle = getColorBar(name);
  ctx.fillRect(x, y, width, -height);
};

window.renderStatistics = function (ctx, names, times) {
  // рисуем облако
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // выводим текст поздравления
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';

  for (var i = 0; i < messageTexts.length; i++) {
    ctx.fillText(messageTexts[i], CLOUD_X + CLOUD_WIDTH / 2 - messageTexts[i].length * FONT_SIZE / 4, CLOUD_Y + GAP * 2 + FONT_SIZE * i);
  }

  // вычисляем максимальное значение времени
  var maxTime = getMaxElement(times);

  // вычисляем ширину столбиков
  var barWidth = CLOUD_WIDTH / (names.length * 2 + 1);

  // рисуем все столбцы
  for (i = 0; i < names.length; i++) {
    var barHeight = MAX_BAR_HEIGHT * times[i] / maxTime;
    drawBar(ctx, names[i], times[i], CLOUD_X + barWidth * (i * 2 + 1), CLOUD_HEIGHT - GAP * 3, barHeight, barWidth);
  }
};
