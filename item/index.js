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
   * TODO Заменить условие if на функцию валидации
   * Ссылка на следующее звено в списке. Возвращает *null* если значение не задано.
   * При попытке установить значение отличное от *Item* или *null* приведет к ошибке *TypeError*
   * @type {Item|null}
   */
  set next(next) {
    if (next && !(next instanceof Item))
      throw new TypeError("Next item must be an instance of Item");
    this._next = next ?? null;
  }

  get next() {
    return this._next;
  }

  /**
   * TODO Заменить условие if на функцию валидации
   * Ссылка на предыдущее звено в списке. Возвращает *null* если значение не задано.
   * При попытке установить значение отличное от *Item* или *null* приведет к ошибке *TypeError*
   * @type {Item|null}
   */
  set previous(previous) {
    if (previous && !(previous instanceof Item))
      throw new TypeError("Previous item must be an instance of Item");
    this._previous = previous ?? null;
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

