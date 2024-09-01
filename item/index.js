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
   * @param {Item|null} next - Следующий элемент. Если передано значение undefined, то содержимое элемента будет удалено.
   * @throws {TypeError} Если next не является экземпляром Item.
   * @since 0.1.0
   * @version 0.4.0
   */
  set next(next) {
    if (next && !(next instanceof Item))
      throw new TypeError("Next item must be an instance of Item");
    this._next = next ?? null;
  }

  /**
   * Возвращает следующий элемент в списке.
   *
   * @returns {any|null} Следующий элемент или null.
   * @since 0.1.0
   */
  get next() {
    return this._next;
  }

  /**
   * Устанавливает предыдущий элемент в списке.
   *
   * @param {Item|null} previous - Предыдущий элемент. Если передано значение undefined, то содержимое элемента будет удалено.
   * @throws {TypeError} Если previous не является экземпляром Item.
   * @since 0.2.0
   * @version 0.4.0
   */
  set previous(previous) {
    if (previous && !(previous instanceof Item))
      throw new TypeError("Previous item must be an instance of Item");
    this._previous = previous ?? null;
  }

  /**
   * Возвращает предыдущий элемент в списке.
   *
   * @returns {any|null} Предыдущий элемент. Для первого элемента в списке или при отсутствии предыдущего элемента возвращаем null.
   * @since 0.2.0
   * @version 0.4.0
   */
  get previous() {
    return this._previous;
  }

  /**
   * Устанавливает содержимое элемента.
   *
   * @param {any} content - Новое содержимое элемента. Если передано значение undefined, то содержимое элемента будет удалено.
   * @since 0.1.0
   * @version 0.4.0
   */
  set content(content) {
    this._content = content ?? null;
  }

  /**
   * Возвращает содержимое элемента.
   *
   * @returns {any|null} Содержимое элемента. Пустой элемент возвращает null.
   * @since 0.1.0
   */
  get content() {
    return this._content;
  }
}

module.exports = Item;
