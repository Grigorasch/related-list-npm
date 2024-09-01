/**
 * Звено связанного списка. Используется для хранения полезной нагрузки и ссылок на соседние элементы.
 *
 * @class
 * @since 0.1.0
 * @version 0.2.0
 */
class Chain {
    /**
     * @param {Chain.ChainOptions} chainOptions - объект [ChainOptions]{@link Chain.ChainOptions}
     * содержащий предустановленные свойства звена
     */
    constructor({previousChain = null, nextChain = null, chainContent = null}) {
        this[prev] = previousChain;
        this[next] = nextChain;
        this[content] = chainContent;
    }

    /**
     * Свойство содержит ссылку на предыдущее звено списка или null если ссылка отсутствует.
     * Попытка установить значение отличное от *Chain* или *null* приведет к ошибке *TypeError*
     * @type {Chain|null}
     */
    get prev() {
        return this[prev];
    }

    set prev(previousChain) {
        validateChainType(previousChain);
        this[prev] = previousChain ?? null;
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

