/**
 * Модуль в котором собраны различные функции валидации данных
 * @module Validate
 */

/**
 * Общая функция валидации. Выполняет валидацию значения *value* по заданной стратегии *strategy*.
 * Если стратегия возвращает true, то валидация считается пройденной. В противном случае выбрасывается
 * исключение с ошибкой *TypeError* и сообщением *message*
 * @param {function(value): boolean} strategy - функция которая принимает аргумент *value* и возвращает
 * *true* если *value* соответствует типу или *false* если не соответствует
 * @param {any} value - значение для которого выполняется валидация
 * @param {string} [message] - текст сообщения об ошибке
 * @throws {TypeError} - значение *strategy* не задано или имеет неверный формат
 * @throws {TypeError} - значение *value* не соответствует заданной стратегии
 */
function validateType(strategy, value, message) {
    if (!strategy || typeof strategy !== 'function') throw new TypeError("Invalid strategy");
    if (!strategy(value)) throw new TypeError( message ?? "The argument type does not match the required type");
}

/**
 * Стратегия валидации классических JavaScript объектов.
 * @param {any} obj - значение для которого выполняется валидация
 * @returns {boolean} - результат валидации значения *obj*
 */
function objectStrategy(obj) {
    return obj && typeof obj === "object" && obj.constructor === Object;
}

/**
 * Функция валидации значения *obj* на соответствие классическому JavaScript объекту
 * @param {any} obj - значение для которого выполняется валидация
 * @param {string} [message] - текст сообщения об ошибке
 * @throws {TypeError} - значение *obj* не является объектом Object
 */
function validateObjectType(obj, message="The argument type must be Object") {
    return validateType(objectStrategy, obj, message)
}

module.exports = {validateType, validateObjectType}