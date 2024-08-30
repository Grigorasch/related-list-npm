/**
 * Набор параметров Item.
 *
 * @interface ItemOptions
 * @property {Item} [next] - Ссылка на следующее звено списка.
 * @property {Item} [previous] - Ссылка на предыдущее звено списка.
 * @since 0.3.1
 */

/**
 * Звено связанного списка. Используется для хранения полезной нагрузки и ссылок на соседние элементы.
 *
 * @class
 * @since 0.1.0
 * @version 0.2.0
 */
class Item {
  /**
   *
   * @param {any} [content] - Полезная нагрузка, которая будет храниться в этом звене списка.
   * @param {ItemOptions} [option] - Дополнительные параметры для настройки звена списка.
   * @since 0.1.0
   * @version 0.2.0
   */
  constructor(content, option = {}) {
    const { next, previous } = option;
    this.content = content ?? null;
    this.next = next ?? null;
    this.previous = previous ?? null;
  }

  /**
   * Устанавливает ссылку на следующее звено списка.
   *
   * @param {Item|null} next - Ссылка на следующее звено
   * @throws {TypeError} Если next не является экземпляром Item или null.
   * @since 0.1.0
   * @version 0.3.1
   */
  set next(next) {
    this._assertIsItem(next);
    this._next = next;
  }

  /**
   * Возвращает ссылку на следующее звено в списке.
   *
   * @returns {Item|null} Ссылка на следующее звено. Для последнего звена функция вернет null.
   * @since 0.1.0
   */
  get next() {
    return this._next;
  }

  /**
   * Устанавливает ссылку на предыдущее звено в списке.
   *
   * @param {Item|null} previous - Ссылка на предыдущее звено
   * @throws {TypeError} Если previous не является ни экземпляром Item ни null.
   * @since 0.2.0
   */
  set previous(previous) {
    this._assertIsItem(previous);
    this._previous = previous;
  }

  /**
   * Возвращает ссылку на предыдущее звено в списке.
   *
   * @returns {Item|null} Ссылка на предыдущее звено. Для первого звена списка или при отсутствии предыдущего элемента функция вернет null.
   * @since 0.2.0
   * @version 0.3.1
   */
  get previous() {
    return this._previous;
  }

  /**
   * Устанавливает содержимое звена.
   *
   * @param {any} content - Новое содержимое звена. Undefined будет записано как null.
   * @since 0.1.0
   * @version 0.3.1
   */
  set content(content) {
    this._content = content ?? null;
  }

  /**
   * Возвращает содержимое звена.
   *
   * @returns {any} Содержимое звена. Пустое звено возвращает null.
   * @since 0.1.0
   */
  get content() {
    return this._content;
  }

  /**
   * Метод проверяет принадлежность аргумента к Item или null
   * @private
   * @param {any} obj - Проверяемый параметр
   * @throws {TypeError} Переданный аргумент не принадлежит к Item или null.
   * @since 0.3.1
   */
  _assertIsItem(obj) {
    if (obj !== null && !(obj instanceof Item)) throw new TypeError('Expected an item to be an Item or null');
  }
}

module.exports = Item;

