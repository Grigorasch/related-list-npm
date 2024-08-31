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
   * Ссылка на следующее звено в списке. Возвращает *null* если значение не задано.
   * При попытке установить значение отличное от *Item* или *null* приведет к ошибке *TypeError*
   * @type {Item|null}
   */
  set next(next) {
    this._assertIsItem(next);
    this._next = next;
  }

  get next() {
    return this._next;
  }

  /**
   * Ссылка на предыдущее звено в списке. Возвращает *null* если значение не задано.
   * При попытке установить значение отличное от *Item* или *null* приведет к ошибке *TypeError*
   * @type {Item|null}
   */
  set previous(previous) {
    this._assertIsItem(previous);
    this._previous = previous;
  }

  get previous() {
    return this._previous;
  }

  /**
   * Элемент хранящийся в звене списка. Возвращает *null* если значение не задано.
   * @type {any}
   */
  set content(content) {
    this._content = content ?? null;
  }

  get content() {
    return this._content;
  }

  /**
   *  @private
   * Метод проверяет принадлежность аргумента к Item или null
   * @param {any} obj - Проверяемый параметр
   * @throws {TypeError} Переданный аргумент не принадлежит к Item или null.
   * @since 0.3.1
   */
  _assertIsItem(obj) {
    if (obj !== null && !(obj instanceof Item)) throw new TypeError('Expected an item to be an Item or null');
  }
}

module.exports = Item;

