const Item = require("../item");

/**
 * Класс представляющий связанный список.
 * @since 0.1.0
 */
class RelatedList {
  /**
   * Создает пустой связанный список.
   * @constructor
   * @since 0.1.0
   */
  constructor() {
    this._head = null;
    this._tail = null;
    this._current = null;
  }

  /**
   * Переводит текущую позицию в начало списка и возвращает первый элемент.
   * @returns {*} Первый элемент списка или undefined, если список пуст.
   * @since 0.1.0
   */
  start() {
    if (this._head === null) {
      return;
    }
    this._current = this._head;
    return this.current();
  }

  /**
   * Переводит текущую позицию к следующему элементу и возвращает его.
   * Если достигнут конец списка, возвращает undefined и переводит текущую позицию в начало списка.
   * @returns {*} Следующий элемент списка или undefined, если достигнут конец списка.
   * @since 0.1.0
   */
  next() {
    if (this._current) {
      this._current = this._current.next;
      return this.current();
    } else {
      return this.start();
    }
  }

  /**
   * Устанавливает значение текущего элемента.
   * @param {any} value - Значение для установки в текущий элемент.
   * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
   * @since 0.2.0
   */
  set current(value) {
    if (!this._current)
      throw new RangeError(
        "It is not possible to change the current element. The end of the list has been reached",
      );
    this._current.content = value;
  }

  /**
   * Возвращает значение текущего элемента.
   * @returns {any} Значение текущего элемента или undefined, текущая позиция за пределами списка.
   * @since 0.2.0
   */
  get current() {
    if (!this._current) return;
    return this._current.content;
  }

  /**
   * Добавляет новый элемент в конец списка.
   * @param {any} value - Значение для добавления в список.
   * @since 0.1.0
   */
  add(value) {
    const item = new Item(value);
    if (this._tail) {
      this._tail.next = item;
    } else {
      this._head = item;
    }
    this._tail = item;
  }
}

module.exports = RelatedList;
