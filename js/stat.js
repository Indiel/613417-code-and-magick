'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var FONT_SIZE = 16;

var messageTexts = ['Ура вы победили!', 'Список результатов:'];

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

var getMaxElement = function (arr) {
  var maxElement = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';

  for (var i = 0; i < messageTexts.length; i++) {
    ctx.fillText(messageTexts[i], CLOUD_X + CLOUD_WIDTH / 2 - messageTexts[i].length * FONT_SIZE / 4, CLOUD_Y + GAP * 2 + FONT_SIZE * i);
  }

  var maxTime = getMaxElement(times);

  var maxBarHeight = 150;
  var barWidth = CLOUD_WIDTH / (names.length * 2 + 1);

  for (i = 0; i < names.length; i++) {
    var barHeight = maxBarHeight * times[i] / maxTime;

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD_X + barWidth * (i * 2 + 1), CLOUD_HEIGHT - GAP * 2);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + barWidth * (i * 2 + 1), CLOUD_HEIGHT - GAP * 3 - FONT_SIZE - barHeight);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() + 0.05) + ')';
    }
    ctx.fillRect(CLOUD_X + barWidth * (i * 2 + 1), CLOUD_HEIGHT - GAP * 3, barWidth, -barHeight);
  }
};
