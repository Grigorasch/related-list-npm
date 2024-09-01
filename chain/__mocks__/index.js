module.exports = class Item {
    constructor() {}

    static [Symbol.hasInstance](obj) {return obj.class === 'Item'};
}