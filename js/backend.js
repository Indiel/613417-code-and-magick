'use strict';

window.backend = (function () {

  var listenerEvent = function (xhrElem, onLoad, onError) {
    xhrElem.addEventListener('load', function () {
      if (xhrElem.status === 200) {
        onLoad(xhrElem.response);
      } else {
        onError('Статус ответа: ' + xhrElem.status + ' ' + xhrElem.statusText);
      }
    });

    xhrElem.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhrElem.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrElem.timeout + 'мс');
    });

    xhrElem.timeout = 10000;
  };

  return {
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      listenerEvent(xhr, onLoad, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      listenerEvent(xhr, onLoad, onError);

      xhr.open('GET', URL);
      xhr.send();
    }
  };

})();
