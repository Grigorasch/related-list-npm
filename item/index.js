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
  constructor(content, option={}) {
    const {next} = option;
    this.setContent(content).setNext(next);
  }

  /**
   * Устанавливает следующий элемент в списке.
   *
   * @param {Item|null} [next] - Следующий элемент в списке или null.
   * @returns {Item} Текущий экземпляр для цепочки вызовов.
   * @since 0.1.0
   */
  setNext(next) {
    this._next = next ?? null;
    return this;
  }

  /**
   * Получает следующий элемент в списке.
   *
   * @returns {Item|null} Следующий элемент в списке или null.
   * @since 0.1.0
   */
  getNext() {
    return this._next;
  }

  /**
   * Устанавливает содержимое элемента.
   *
   * @param {string|null} [content] - Содержимое элемента или null.
   * @returns {Item} Текущий экземпляр для цепочки вызовов.
   * @since 0.1.0
   */
  setContent(content) {
    this._content = content ?? null;
    return this;
  }

  /**
   * Получает содержимое элемента.
   *
   * @returns {string|null} Содержимое элемента или null.
   * @since 0.1.0
   */
  getContent() {
    return this._content;
  }
}

module.exports = Item;