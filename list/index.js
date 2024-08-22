const Item = require("../item");

class RelatedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._current = null;
  }

  start() {
    this._current = this._head;
    return this.current();
  }

  next() {
    if (this._current) {
      this._current = this._current.next;
      return this.current();
    } else {
      return this.start();
    }
  }

  current() {
    if (!this._current) return null;
    return this._current.content;
  }

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
