const Item = require("../item");
const lists = new WeakMap();
const loadOptions = (context, options) =>
  require("./load_options")(context, lists, options);

const space = Symbol('space');
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
  constructor(options = {}) {
    const props = {
      head: null,
      tail: null,
      current: null,
    };
    lists.set(this, props);

    loadOptions(this, options);

    Object.defineProperty(this, space, {
      value: lists.get(this),
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }

  get length() {
    return this[space].length()  // lists.get(this).length();
  }

  /**
   * Устанавливает список в начало. Последующий вызов метода next() возвращает первый элемент списка.
   * @since 0.2.0
   */
  start() {
    this[space].current = null;
  }

  /**
   * Переводит текущую позицию в начало списка и возвращает первый элемент.
   * @returns {*} Первый элемент списка или undefined, если список пуст.
   * @since 0.1.0
   * @version 0.2.0
   */
  head() {
    if (this[space].head === null) {
      return;
    }
    this[space].current = this[space].head;
    return this.current;
  }

  /**
   * Переводит текущую позицию к следующему элементу и возвращает его.
   * Если достигнут конец списка, возвращает undefined и переводит текущую позицию в начало списка.
   * @returns {*} Следующий элемент списка или undefined, если достигнут конец списка.
   * @since 0.1.0
   */
  next() {
    if (this[space].current) {
      this[space].current = this[space].current.next;
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
    return !this[space].current || this[space].current.next === null;
  }

  /**
   * Проверяет, вернет ли вызов метода next() элемент списка
   *
   * @returns {boolean} Возвращает true, если next() вернет элемент списка; иначе false.
   * @since 0.2.0
   */
  isNext() {
    return !!this[space].head && (!this[space].current || this[space].current.next !== null);
  }

  isEmpty() {
    return lists.get(this).head === null;
  }

  /**
   * Устанавливает значение текущего элемента.
   * @param {any} value - Значение для установки в текущий элемент.
   * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
   * @since 0.2.0
   */
  set current(value) {
    if (!this[space].current)
      throw new RangeError(
        "It is not possible to change the current element. The end of the list has been reached",
      );
    this[space].current.content = value;
  }

  /**
   * Возвращает значение текущего элемента.
   * @returns {any} Значение текущего элемента или undefined, текущая позиция за пределами списка.
   * @since 0.2.0
   */
  get current() {
    if (!this[space].current) return;
    return this[space].current.content;
  }

  /**
   * Добавляет новый элемент в конец списка.
   * @param {any} value - Значение для добавления в список.
   * @since 0.1.0
   */
  add(value) {
    const item = new Item(value);
    if (this[space].tail) {
      this[space].tail.next = item;
      item.previous = this[space].tail;
    } else {
      this[space].head = item;
    }
    this[space].tail = item;
    this[space].length.add()
  }

  /**
   * Удаляет текущий элемент из списка.
   *
   * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
   * @since 0.2.0
   */
  remove() {
    if (!this[space].current)
      throw new RangeError(
        "It is not possible to remove the current element. The current position is out of list bounds.",
      );
this[space].length.remove();
    if (this[space].current.next) {
      this[space].current.next.previous = this[space].current.previous;
    } else {
      this[space].tail = this[space].current.previous;
    }
    if (this[space].current.previous) {
      this[space].current.previous.next = this[space].current.next;
    } else {
      this[space].head = this[space].current.next;
    }
  }
}

module.exports = RelatedList;
