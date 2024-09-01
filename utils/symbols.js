/**
 * Модуль посвящен символьным ключам объекта. Ключи используются для повышения приватности как
 * самой информации, так и внутреннего состояния объекта. Символы не предполагают глобальный доступ к своимзначениям
 * @module SymbolKeys
 * @type {symbol}
 */

/**
 * Символ используется для доступа к ссылкам на главные звенья связанного списка (первый, последний и текущий):
 * @private
 * @type {symbol}
 */
const mainChains = Symbol("MainChains");

/**
 * Символ используется для доступа к полям и методам используемым при расчёте длины списка.
 * @private
 * @type {symbol}
 */
const lengthStrategy = Symbol("LengthStrategy");

/**
 * Символ используется для доступа к методам используемым при определении направления перебора элементов.
 * @private
 * @type {symbol}
 */
const directionStrategy = Symbol("DirectionStrategy");

const prev = Symbol("PrevChain");
const next = Symbol("NextChain");
const content = Symbol("ChainContent");

const head = Symbol("HeadChainOfList");
const tail = Symbol("TailChainOfList");
const current = Symbol("CurrentChainOfList");

module.exports = {
    prev,
    next,
    content,

    head,
    tail,
    current,

    mainChains,
    lengthStrategy,
    directionStrategy
}