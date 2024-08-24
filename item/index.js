/**
 * Представляет элемент в связном списке.
 *
 * @class
 * @since 0.1.0
 * @version 0.2.0
 */
class Item {
  /**
   * Создаёт экземпляр Item.
   *
   * @param {string} [content] - Содержимое элемента.
   * @param {object} [option] - Опции для элемента (не используется в текущей реализации).
   * @since 0.1.0
   * @version 0.2.0
   */
  constructor(content, option = {}) {
    const { next, previous } = option;
    this.content = content;
    this.next = next;
    this.previous = previous;
  }

  /**
   * Устанавливает следующий элемент в списке.
   *
   * @param {Item|null} next - Следующий элемент. Если передано значение undefinded, то содержимое элемента будет удалено.
   * @throws {TypeError} Если next не является экземпляром Item.
   * @since 0.1.0
   */
  set next(next = null) {
    if (next && !(next instanceof Item))
      throw new TypeError("Next item must be an instance of Item");
    this._next = next;
  }

  /**
   * Возвращает следующий элемент в списке.
   *
   * @returns {*} Следующий элемент или null.
   * @since 0.1.0
   */
  get next() {
    return this._next;
  }

  /**
   * Устанавливает предыдущий элемент в списке.
   *
   * @param {Item|null} previous - Предыдущий элемент. Если передано значение undefinded, то содержимое элемента будет удалено.
   * @throws {TypeError} Если previous не является экземпляром Item.
   * @since 0.2.0
   */
  set previous(previous = null) {
    if (previous && !(previous instanceof Item))
      throw new TypeError("Previous item must be an instance of Item");
    this._previous = previous;
  }

  /**
   * Возвращает предыдущий элемент в списке.
   *
   * @returns {*} Предыдущий элемент. Для первого элемента в списке или при отсутсвии предыдущего элемента возвращае null.
   * @since 0.2.0
   */
  get previous() {
    return this._previous;
  }

  /**
   * Устанавливает содержимое элемента.
   *
   * @param {*} content - Новое содержимое элемента. Если передано значение undefinded, то содержимое элемента будет удалено.
   * @since 0.1.0
   */
  set content(content = null) {
    this._content = content;
  }

  /**
   * Возвращает содержимое элемента.
   *
   * @returns {*} Содержимое элемента. Пустой элемент возвращает null.
   * @since 0.1.0
   */
  get content() {
    return this._content;
  }
}

module.exports = Item;
