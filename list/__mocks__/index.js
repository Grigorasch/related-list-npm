module.exports = class RelatedList {
  constructor() {}

  static [Symbol.hasInstance](obj) {return obj.class === 'RelatedList'};
}