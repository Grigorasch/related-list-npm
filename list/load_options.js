const RelatedList = require("./index.js");

/**
 * Объект параметров создания списка.
 * @typedef {Object} ListOptions
 * @property {boolean} [lengthCount=false] - Флаг, указывающий, следует ли считать длину списка. Значение длины доступно через свойство length.
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

  const { lengthCount = false } = options;

  lists.get(context).length = lengthCount
    ? require("./utils/length_counter").accept()
    : require("./utils/length_counter").reject();
  Object.assign(context, {
    lengthCount,
  });
  return context;
};

function isObject(obj) {
  return obj && typeof obj === "object" && obj.constructor === Object;
}

function isRelatedList(obj) {
  return obj instanceof RelatedList;
}
