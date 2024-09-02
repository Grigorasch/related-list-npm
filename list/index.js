const Chain = require("../chain");
const {lengthStrategies, directionStrategies} = require("../utils/strategies");
const {mainChains, lengthStrategy, directionStrategy, head, tail, current} = require("../utils/symbols");
const {validateChainType} = require("../utils/validate");

/**
 * Объект параметров, передаваемый в конструктор списка. Позволяет включать дополнительную функциональность списка
 * @typedef {Object} ChainedList.ListOptions
 * @property {boolean} lengthCount=false - Флаг, указывающий, следует ли считать длину списка. Значение длины доступно через свойство length.
 * @property {boolean} reverseDirection=false - Флаг, изменяет порядок перебора элементов списка.
 * По умолчанию используется принцип FIFO: "Первым пришёл - первым ушёл" и в таком случае список перебирается с начала до конца.
 * Если установить флаг в состояние true, то будет использоваться принцип LIFO: Последним пришёл - первым ушёл" и тогда список будет перебираться с конца до начала. Значение по умолчанию - false (перебор объектов с первого до последнего), значение true - с последнего до первого.
 */

/**
 * //TODO  Посмотреть способы описания класса
 *
 * Класс представляющий связанный список.
 */
class ChainedList {
    /**
     * По умолчанию, конструктор создаёт пустой список с базовым функционалом.
     * В конструктор можно передать объект [options]{@link ChainedList.ListOptions}
     * чтобы добавить дополнительную функциональность списку. После создания списка, изменение
     * параметров [options]{@link ChainedList.ListOptions} невозможно.
     * TODO ADD добавить обработку ListOptions
     * **В данной версии дополнительная функциональность отключена**
     * @constructor
     *
     * @param {ChainedList.ListOptions} options - объект с флагами для включения дополнительных функций
     */
    constructor(options = {}) {
        this[head] = null;
        this[tail] = null;
        this[current] = null;

        // this.#readOptionsSet(options);
    }

    /**
     * Сообщает, вернет ли вызов метода next() элемент списка
     *
     * @returns {boolean} Возвращает true, если next() вернет элемент списка; иначе false.
     */
    isNext() {
        return !this.isEmpty() && !!this[current].next;
    }

    /**
     * Сообщает о наличие звеньев в списке
     * @returns {boolean} - true если список не содержит ни одного звена, false если в списке есть звенья
     */
    isEmpty() {
        return !this[head];
    }

    /**
     * Сообщает, достигнут ли конец списка.
     *
     * @returns {boolean} Возвращает true, если текущее звено является последним звеном списка
     * или текущее звено не выбрано, иначе false.
     */
    isEnd() {
        return (this[current] === this[tail]) || !this[current] || false;
    }

    /**
     * Значение текущего звена. При присвоении undefined значение, оно будет записано как null.
     * Если при чтении свойства, текущим не назначено ни одно звено, то будет возвращено undefined.
     * Если при присвоении значения текущим не назначено ни одно звено, то будет выброшено исключение с ошибкой *RangeError*
     * @type {any|null|undefined}
     */
    get current() {
        if (!this[current]) return;
        return this[current].content;
    }

    set current(value) {
        if (!this[current]) throw new RangeError("Current chain not selected");
        this[current].content = value;
    }

    // TODO FIX проверить и исправить методы
    // /**
    //  * Количество элементов в списке. Числовое значение доступно если в ListOptions указан флаг *lengthCount = true*.
    //  * В противном случае, доступ к полю length сохраняется, его значение всегда равно *false*
    //  * @type {number|false}
    //  * @readonly
    //  */
    // get length() {
    //     return this[lengthStrategy].length;
    // }
    //
    // set length(length) {
    //     console.warn("The Related List length of the list cannot be changed directly");
    // }

    // /**
    //  * Устанавливает список в начало. Последующий вызов метода next() возвращает первый элемент списка.
    //  */
    // start() {
    //     this[mainChains].current = null;
    // }

    // /**
    //  * Переводит текущую позицию на первый элемент и возвращает его значение.
    //  * @returns {any|undefined} Значение первого элемента или undefined, если список пуст.
    //  */
    // head() {
    //     if (this[mainChains].head === null) {
    //         return;
    //     }
    //     this[mainChains].current = this.#headChain();
    //     return this.current;
    // }


    /**
     * Переводит текущую позицию к следующему звену и возвращает его значение.
     * Если достигнут конец списка, возвращает undefined и переводит текущую позицию в начало списка.
     * Повторный вызов *next()* начнёт обход списка заново.
     * @returns {any|undefined} Следующий элемент списка или undefined, если достигнут конец списка.
     */
    next() {
        if (this[current]) {
            this[current] = this[current].next;
            return this.current;
        } else {
            return this.head();
        }
    }

    /**
     * Перемещает текущую позицию к предыдущему звену и возвращает его значение.
     * Если достигнуто начало списка, возвращает undefined/
     * @returns {any|undefined} - Предыдущее звено в списке, или undefined, если достигнуто начало списка.
     */
    prev() {
        if (!this[mainChains].current) return;
        this[current] = this[current].prev;
        return this.current;
    }

    /**
     * Добавляет новые звенья в конец списка.
     * @param {...any} values - значения для новых звеньев.
     */
    add(...values) {
        values.forEach()
        // Для каждого элемента используется стратегия добавления в конец списка
        values.forEach(addElementByStrategy(addToEnd, this));
        Chain.createAfter(this[tail], Math.random())
    }

    /**
     * Добавляет новые элементы перед текущим элементом.
     * @param {...any} values - Элементы для добавления в список.
     * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
     * @returns {void}
     * @since 0.3.0
     */
    addBefore(...values) {
        // Проверка, что current элемент выбран
        this._checkCurrentItemExist();
        // Для каждого элемента используется стратегия добавления перед текущим элементом
        values.forEach(addElementByStrategy(addToBefore, this));
    }

    /**
     * Добавляет новые элементы после текущего элемента.
     * @param {...any} values - Элементы для добавления в список.
     * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
     * @returns {void}
     * @since 0.3.0
     */
    addAfter(...values) {
        // Проверка, что current элемент выбран
        this._checkCurrentItemExist();
        // Для каждого элемента используется стратегия добавления после текущего элемента
        values.forEach(addElementByStrategy(addToAfter, this));
    }

    /**
     * Удаляет текущий элемент из списка.
     *
     * @throws {RangeError} Выбрасывается, если текущая позиция за пределами списка.
     * @since 0.2.0
     */
    remove() {
        this._checkCurrentItemExist();

        this[scope].length.remove();
        if (this[scope].current.next) {
            this[scope].current.next.previous = this[scope].current.previous;
        } else {
            this[scope].tail = this[scope].current.previous;
        }
        if (this[scope].current.previous) {
            this[scope].current.previous.next = this[scope].current.next;
        } else {
            this[scope].head = this[scope].current.next;
        }
        this.next();
    }

    /**
     * Итератор для объектов класса ChainedList.
     * Позволяет перебирать элементы списка в порядке их добавления при помощи for ... of.
     * @returns {Iterator} Итератор для элементов списка.
     * @since 0.2.0
     */
    [Symbol.iterator] = function* () {
        let current = this[scope].initialElement(this[scope]);
        while (current) {
            yield current.content;
            current = this[scope].nextElement(current);
        }
    };

    /**
     * Применяет указанную функцию к каждому элементу списка и возвращает новый список с результатами вызова этой функции.
     * @param {function(any, number, ChainedList): any} callback - Функция, вызываемая для каждого элемента списка;
     *            принимает три аргумента: текущий элемент, его индекс и сам список.
     * @param {Object} [thisArg={}] - Значение, используемое в качестве `this` при вызове `callback`.
     * @throws {TypeError} Если `callback` не является функцией.
     * @returns {ChainedList} Новый список с результатами вызова `callback`.
     * @since 0.2.0
     */
    map(callback, thisArg = {}) {
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        const result = new ChainedList();
        const iterator = this[Symbol.iterator]();
        let index = 0;
        while (true) {
            const item = iterator.next();
            if (item.done) break;
            result.add(callback.call(thisArg, item.value, index, this));
            index++;
        }
        return result;
    }

    /**
     * Вызывает указанную функцию один раз для каждого элемента списка.
     * @param {function(any, number, ChainedList): void} callback - Функция, вызываемая для каждого элемента списка;
     *           принимает три аргумента: текущий элемент, его индекс и сам список.
     * @param {Object} [thisArg={}] - Значение, используемое в качестве `this` при вызове `callback`.
     * @throws {TypeError} Если `callback` не является функцией.
     * @returns {void}
     * @since 0.2.0
     */
    forEach(callback, thisArg = {}) {
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        const iterator = this[Symbol.iterator]();
        let index = 0;
        while (true) {
            const item = iterator.next();
            if (item.done) break;
            callback.call(thisArg, item.value, index, this);
            index++;
        }
    }

    /**
     * Преобразует связанный список в массив.
     *
     * @returns {Array<any>} Массив, содержащий элементы связанного списка.
     * @since 0.3.0
     */
    toArray() {
        const array = [];
        if (this.isEmpty()) return array;

        const iterator = this[Symbol.iterator]();
        while (true) {
            const item = iterator.next();
            if (item.done) break;
            array.push(item.value);
        }

        return array;
    }

    /**
     * Создает копию связанного списка.
     *
     * @returns {ChainedList} - Копия связанного списка.
     * @since 0.3.0
     */
    clone() {
        const options = getOptions(this);
        const list = new ChainedList(options);

        const iterator = this[Symbol.iterator]();
        while (true) {
            const item = iterator.next();
            if (item.done) break;
            list.add(item.value);
        }
        return list;
    }

    /**
     * Функция проверяет, выбран ли текущий элемент.
     * @private
     *
     * @throws {RangeError} Выбрасывается, если текущий элемент не выбран.
     * @since 0.3.0
     */
    _checkCurrentItemExist() {
        if (!this[scope].current)
            throw new RangeError(
                "It is not possible to remove the current element. The current position is out of list bounds.",
            );
    }

    #readOptionsSet({lengthCount, reverseDirection}) {
        const {RealLengthStrategy, FakeLengthStrategy} = lengthStrategies;
        if (lengthCount) {
            this[lengthStrategy] = new RealLengthStrategy();
        } else {
            this[lengthStrategy] = new FakeLengthStrategy();
        }

        const {NormalStrategy, ReverseStrategy} = directionStrategies;
        if (reverseDirection) {
            this[directionStrategy] = new ReverseStrategy();
        } else {
            this[directionStrategy] = new NormalStrategy();
        }
        this.#nextChain = this[directionStrategy].next;
        this.#prevChain = this[directionStrategy].prev;
        this.#headChain = this[directionStrategy].head;

    }

    #addNewChain(strategy) {
        return (referenceChain, value) => {
            validateChainType(referenceChain);
            const item = new Chain(strategy(referenceChain)(value));
            // TODO ADD сюда добавить счётчик добавленных элементов
        }
    }

    #addFirstChain(value) {
        const chain = new Chain({chainContent: value});
        this[head] = chain;
        this[tail] = chain;
    }

    add(...values) {
        values.forEach(value => {
        })
    }


}

module.exports = ChainedList;

const isEmptyChain = new Chain({
    chainContent: function () {
        // if (this.isEmpty())
    }
})

//TODO Пересмотреть стратегии
/**
 * Создает функцию, которая добавляет элемент в список по заданной стратегии.
 * Полученная функция используется для перебора элементов массива.
 *
 * @param {function(Chain)} strategy - Функция, определяющая стратегию добавления элемента.
 * @param {ChainedList} context - Экземпляр списка к которому применяется стратегия
 * @returns {function(any)} - Функция, которая добавляет элемент в список.
 * @since 0.3.0
 */
function addElementByStrategy(strategy, context) {
    return (value) => {
        const item = new Chain(value);
        // strategy(chain);
        strategy.call(context, item);
        context[mainChains].add();
    };
}

/**
 * Стратегия действий для добавления элемента в конец списка
 *
 * @param {Chain} item - Элемент, который нужно добавить в конец списка.
 * @since 0.3.0
 */
function addToEnd(item) {
    if (this[mainChains].tail) {
        this[mainChains].tail.next = item;
        item.previous = this[mainChains].tail;
    } else {
        this[mainChains].head = item;
    }
    this[mainChains].tail = item;
}

/**
 * Стратегия действий для добавления элемента перед текущим
 *
 * @param {Chain} item - Элемент, который нужно добавить в список перед текущим элементом.
 * @since 0.3.0
 */
function addToBefore(item) {
    item.next = this[scope].current;
    if (this[scope].current.previous) {
        this[scope].current.previous.next = item;
        item.previous = this[scope].current.previous;
    } else {
        this[scope].head = item;
    }
    this[scope].current.previous = item;
}

/**
 * Стратегия действий для добавления элемента после текущего
 *
 * @param {Chain} item - Элемент, который нужно добавить в список после текущего элемента.
 * @since 0.3.0
 */
function addToAfter(item) {
    item.previous = this[scope].current;
    if (this[scope].current.next) {
        this[scope].current.next.previous = item;
        item.next = this[scope].current.next;
    } else {
        this[scope].tail = item;
    }
    this[scope].current.next = item;
    this.next();
}

/**
 * Возвращает объект опций для заданного списка
 *
 * @param {ChainedList} list - Исходный список, из которого извлекаются опции.
 * @returns {Object} - Объект опций списка
 * @since 0.3.0
 */
function getOptions(list) {
    const options = {};
    for (const option in list) {
        options[option] = list[option];
    }
    return options;
}


