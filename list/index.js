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
   * Устанавливает список в начало. Последующий вызов метода next() возвращает первый элемент списка.
   * @since 0.2.0
   */
  start() {
    this._current = null;
  }

  /**
   * Переводит текущую позицию в начало списка и возвращает первый элемент.
   * @returns {*} Первый элемент списка или undefined, если список пуст.
   * @since 0.1.0
   * @version 0.2.0
   */
  head() {
    if (this._head === null) {
      return;
    }
    this._current = this._head;
    return this.current;
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
      return this.current;
    } else {
      return this.head();
    }
  }

  /**
   * Проверяет, достигнут ли конец списка.
   *
   * @returns {boolean} Возвращает true, если текущая позиция находится за пределами списка или текущий элемент является последним; иначе false.
   * @since 0.2.0
   */
  isEnd() {
    return !this._current ?? this._current.next === null;
  }

  /**
   * Проверяет, вернет ли вызов метода next() элемент списка
   *
   * @returns {boolean} Возвращает true, если next() вернет элемент списка; иначе false.
   * @since 0.2.0
   */
  isNext() {
    return !this._current ?? this._current.next !== null;
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
      item.previous = this._tail;
    } else {
      this._head = item;
    }
    this._tail = item;
  }

  /**
   * Удаляет текущий элемент из списка.
   *
   * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
   * @since 0.2.0
   */
  remove() {
    if (!this._current)
      throw new RangeError(
        "It is not possible to remove the current element. The current position is out of list bounds.",
      );

    if (this._current.next) {
      this._current.next.previous = this._current.previous;
    } else {
      this._tail = this._current.previous;
    }
    if (this._current.previous) {
      this._current.previous.next = this._current.next;
    } else {
      this._head = this._current.next;
    }
  }
}

module.exports = RelatedList;
