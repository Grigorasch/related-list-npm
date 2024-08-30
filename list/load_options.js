const RelatedList = require("./index.js");

/**
 * Объект параметров создания списка.
 * @typedef {Object} ListOptions
 * @property {boolean} [lengthCount=false] - Флаг, указывающий, следует ли считать длину списка. Значение длины доступно через свойство length.
 * @property {boolean} [reverseDirection=false] - Флаг, задаёт порядок перебора элементов списка. Значение по умолчанию - false (перебор объектов с первого до последнего), значение true - с последнего до первого.
 */

/**
 * Загружает параметры в указанный контекст.
 * @function
 * @param {RelatedList} context - Контекст, в который загружаются параметры.
 * @param {ListOptions} options - Объект параметров.
 * @returns {RelatedList} Обновленный контекст с загруженными параметрами.
 * @since 0.2.0
 */
module.exports = function loadOptions(context, lists, options = {}) {
  if (!isRelatedList(context))
    throw new TypeError("context must be an instance of RelatedList");
  if (!isObject(options)) throw new TypeError("List options must be an object");

  const { lengthCount = false, reverseDirection = false } = options;

  const listedScope = lists.get(context);

  listedScope.length = lengthCount
    ? require("./utils/length_counter").accept()
    : require("./utils/length_counter").reject();

  // выбор стратегии листания элементов
  if (reverseDirection) {
    listedScope.initialElement = cur => cur.tail;
    listedScope.nextElement = cur => cur.previous;
    listedScope.prevElement = cur => cur.next;
  } else {
    listedScope.initialElement = cur => cur.head;
    listedScope.nextElement = cur => cur.next;
    listedScope.prevElement = cur => cur.previous;
  }

  Object.assign(context, {
    lengthCount,
    reverseDirection,
  });
  return context;
};

function isObject(obj) {
  return obj && typeof obj === "object" && obj.constructor === Object;
}

function isRelatedList(obj) {
  return obj instanceof RelatedList;
}
