const Item = require("../item");
const lists = new WeakMap();
const loadOptions = (context, options) =>
  require("./load_options")(context, lists, options);

const scope = Symbol('RelatedListScope');
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

    Object.defineProperty(this, scope, {
      value: lists.get(this),
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }

  get length() {
    return this[scope].length()  // lists.get(this).length();
  }

  /**
   * Устанавливает список в начало. Последующий вызов метода next() возвращает первый элемент списка.
   * @since 0.2.0
   */
  start() {
    this[scope].current = null;
  }

  /**
   * Переводит текущую позицию в начало списка и возвращает первый элемент.
   * @returns {*} Первый элемент списка или undefined, если список пуст.
   * @since 0.1.0
   * @version 0.2.0
   */
  head() {
    if (this[scope].head === null) {
      return;
    }
    this[scope].current = this[scope].head;
    return this.current;
  }

  /**
   * Переводит текущую позицию к следующему элементу и возвращает его.
   * Если достигнут конец списка, возвращает undefined и переводит текущую позицию в начало списка.
   * @returns {*} Следующий элемент списка или undefined, если достигнут конец списка.
   * @since 0.1.0
   */
  next() {
    if (this[scope].current) {
      this[scope].current = this[scope].current.next;
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
    return !this[scope].current || this[scope].current.next === null;
  }

  /**
   * Проверяет, вернет ли вызов метода next() элемент списка
   *
   * @returns {boolean} Возвращает true, если next() вернет элемент списка; иначе false.
   * @since 0.2.0
   */
  isNext() {
    return !!this[scope].head && (!this[scope].current || this[scope].current.next !== null);
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
    if (!this[scope].current)
      throw new RangeError(
        "It is not possible to change the current element. The end of the list has been reached",
      );
    this[scope].current.content = value;
  }

  /**
   * Возвращает значение текущего элемента.
   * @returns {any} Значение текущего элемента или undefined, текущая позиция за пределами списка.
   * @since 0.2.0
   */
  get current() {
    if (!this[scope].current) return;
    return this[scope].current.content;
  }

  /**
   * Добавляет новые элементы в конец списка.
   * @param {...any} values - Значения для добавления в список.
   * @returns {void}
   * @since 0.1.0
   * @version 0.2.0
   */
  add(...values) {
    values.forEach(value => {
      const item = new Item(value);
      if (this[scope].tail) {
        this[scope].tail.next = item;
        item.previous = this[scope].tail;
      } else {
        this[scope].head = item;
      }
      this[scope].tail = item;
      this[scope].length.add()
    });
  }

  /**
   * Удаляет текущий элемент из списка.
   *
   * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
   * @since 0.2.0
   */
  remove() {
    if (!this[scope].current)
      throw new RangeError(
        "It is not possible to remove the current element. The current position is out of list bounds.",
      );
this[scope].length.remove();
    if (this[scope].current.next) {
      this[scope].current.next.previous = this[scope].current.previous;
    } else {
      this[scope].tail = this[scope].current.previous;
    }
    if (this[scope].current.previous) {
      this[scope].current.previous.next = this[scope].current.next;
    } else {
      this[scope].head = this[scope].current.next;
    }
  }

  [Symbol.iterator] = function* () {
    let current = this[scope].head;
    while (current) {
      yield current.content;
      current = current.next;
    }
  }
}

module.exports = RelatedList;
