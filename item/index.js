/**
 * Представляет элемент в связном списке.
 *
 * @class
 * @since 0.1.0
 */
class Item {
  /**
   * Создаёт экземпляр Item.
   *
   * @param {string} [content] - Содержимое элемента.
   * @param {object} [option] - Опции для элемента (не используется в текущей реализации).
   * @since 0.1.0
   */
  constructor(content, option = {}) {
    const { next } = option;
    this.content = content;
    this.next = next;
  }

  /**
   * Устанавливает следующий элемент в списке.
   *
   * @param {Item} next - Следующий элемент. Пустой вызов метода установит в качестве ссылки на следующий элемент значение null.
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
   * @returns {Item|null} Следующий элемент или null.
   * @since 0.1.0
   */
  get next() {
    return this._next;
  }

  /**
   * Устанавливает содержимое элемента.
   *
   * @param {*} content - Новое содержимое элемента. Пустой вызов метода установит содержимое null.
   * @since 0.1.0
   */
  set content(content = null) {
    this._content = content;
  }

  /**
   * Возвращает содержимое элемента.
   *
   * @returns {*} Содержимое элемента или null.
   * @since 0.1.0
   */
  get content() {
    return this._content;
  }
}

module.exports = Item;
