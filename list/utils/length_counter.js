/**
 * Интерфейс счётчика предоставляющий доступ к значению счётчика, методам увеличения и уменьшения. Если в текущем списке выключен параметр lengthCount, то вычисление длины производится не будет и счетчик всегда будет возвращать false.
 * @typedef {Object} Counter
 * @property {function(): number|boolean} counter - Возвращает текущее значение.
 * @property {function(): void} add - Метод для увеличения счетчика.
 * @property {function(): void} remove - Метод для уменьшения счетчика.
 */

/**
 * Функция, которая возвращает настоящий счётчик длины.
 * @returns {Counter} Настоящий счётчик
 * @since 0.2.0
 */
module.exports.accept = function accept() {
  let counter = 0;
  const length = function () {
    return counter;
  };
  length.add = function () {
    counter++;
  };
  length.remove = function () {
    if (!counter) return;
    counter--;
  };
  return length;
};

/**
 * Функция, которая возвращает фейковый счётчик длины. Фейковый счётчик всегда возвращает false.
 * @returns {Counter} Фейковый счётчик
 * @since 0.2.0
 */
module.exports.reject = function reject() {
  const fakeLength = function () {
    return false;
  };
  fakeLength.add = function () {};
  fakeLength.remove = function () {};
  return fakeLength;
};
