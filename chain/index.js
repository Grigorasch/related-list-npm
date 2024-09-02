const {validateChainType} = require("../utils/validate");
const {prev, next, content} = require("../utils/symbols");
const {insertBeforeStrategy, insertAfterStrategy} = require("../utils/strategies").createByChain;

/**
 * Объект параметров, передаваемый в конструктор звена списка. Позволяет сразу в конструкторе указывать свойства звена.
 * @typedef {Object} Chain.ChainOptions
 * @property {Chain|null} previousChain=null - ссылка на предшествующее звено списка
 * @property {Chain|null} nextChain=null - ссылка на следующее звено списка
 * @property {any|null} chainContent=null - содержимое звена
 */

/**
 * Звено связанного списка. Используется для хранения полезной нагрузки и ссылок на соседние звенья.
 *
 * @class
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

    /**
     *
     *  TODO FIX исправить обращение к prev звену
     * Свойство содержит ссылку на следующее звено списка или null если ссылка отсутствует.
     * Попытка установить значение отличное от *Chain* или *null* приведет к ошибке *TypeError*
     * @type {Chain|null}
     */
    get next() {
        return this._previous;
    }

    set next(nextChain) {
        validateChainType(nextChain);
        this[next] = nextChain ?? null;
    }


    /**
     * Содержимое текущего звена. При отсутствии значения будет возвращено null.
     * Равняется null если содержимое не задано или задано *undefined*.
     * @type {any|null}
     */
    get content() {
        return this[content];
    }

    set content(content) {
        this[content] = content ?? null;
    }

    // /** TODO FIX раскомментировать и доработать функции
    //  * Создаёт новое звено перед указанным. Метод изменяет переданные объекты звеньев встраивая новое звено.
    //  * @param {Chain} targetChain - целевое звено перед которым размещается новое.
    //  * @param {any|null} value - содержимое элемента нового звена
    //  * @throws {TypeError} - argument *targetChain* не является объектом *Chain*
    //  * @returns {Chain} - новое встроенное звено
    //  */
    // static createBefore(targetChain, value) {
    //     const newChain =
    //         new Chain({
    //             previousChain: targetChain.prev,
    //             nextChain: targetChain,
    //             chainContent: value ?? null
    //         });
    //     newChain[prev].next = newChain;
    //     newChain[next].prev = newChain;
    //     return newChain;
    // }
    //
    // /**
    //  * Создаёт новое звено размещаемое в начале списка
    //  * @param {Chain|null} headChain - текущее начальное звено, null если список пуст
    //  * @param {any|null} value - содержимое элемента нового звена
    //  * @throws {TypeError} - argument *headChain* не является объектом *Chain*
    //  * @returns {Chain} - новое начальное звено. Полученное звено необходимо установить в поле head
    //  */
    // static createBeforeHead(headChain, value) {
    //     const newChain =
    //         new Chain({
    //             previousChain: null,
    //             nextChain: headChain,
    //             chainContent: value ?? null,
    //         });
    //     newChain[next].prev = newChain;
    //     return newChain;
    // }
    //
    // /**
    //  * Создаёт новое звено после указанным. Метод изменяет переданные объекты звеньев встраивая новое звено.
    //  * @param {Chain} targetChain - целевое звено после которым размещается новое.
    //  * @param {any|null} value - содержимое элемента нового звена
    //  * @throws {TypeError} - argument *targetChain* не является объектом *Chain*
    //  * @returns {Chain} - новое встроенное звено
    //  */
    // static createAfter(targetChain, value) {
    //     const newChain =
    //         new Chain({
    //             previousChain: targetChain,
    //             nextChain: targetChain.next,
    //             chainContent: value ?? null,
    //         })
    //     newChain[prev].next = newChain;
    //     newChain[next].prev = newChain;
    //     return newChain;
    // }
    //
    // static createAfterTail(tailChain, value) {
    //     const newChain = new Chain({
    //         previousChain:tailChain,
    //         nextChain: null,
    //         chainContent: value ?? null,
    //     });
    //     newChain[prev].next = newChain;
    //     return newChain;
    // }

    /**
     * Функция применяет стратегию добавления звена (до или после целевого звена) и возвращает функцию,
     * которая принимает целевой объект, значение нового звена и добавляет новые звено в соответствии со стратегией
     * @param {function(Chain): Chain.ChainOptions} strategy - стратегия добавления нового звена перед или после целевого звена
     * @returns {function(Chain, any|null): Chain} - функция, принимающая целевое звено и значение нового звена
     * и реализующая выбранную стратегию добавления нового звена
     */
    static #createByChain(strategy) {
        return function (referenceChain, value) {
            validateChainType(referenceChain);
            const newChain = new Chain({...strategy(referenceChain), chainContent: value ?? null});

        }
    }

    /**
     * Будет добавлено новое звено перед целевым звеном. Новое звено будет содержать значение
     * *value*. После выполнения, функция возвращает новое звено
     * @param {Chain} referenceChain - целевое звено, перед которым будет добавлено новое звено
     * @param {any|null} value - значение элемента нового звена
     * @returns {Chain} - новое звено
     */
    static createBefore(referenceChain, value) {
        return this.#createByChain(insertBeforeStrategy)(referenceChain, value);
    }

    /**
     * Будет добавлено новое звено после целевого звена. Новое звено будет содержать значение
     * *value*. После выполнения, функция возвращает новое звено
     * @param {Chain} referenceChain - целевое звено, после которого будет добавлено новое звено
     * @param {any|null} value - значение элемента нового звена
     * @returns {Chain} - новое звено
     */
    static createAfter(referenceChain, value) {
        return this.#createByChain(insertAfterStrategy)(referenceChain, value);
    }
}

module.exports = Chain;

