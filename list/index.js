const Item = require("../item");
const {lengthStrategies, directionStrategies} = require("./strategies");
const {mainChains, lengthStrategy, directionStrategy} = require("./symbols");

/**
 * Объект параметров, передаваемый в конструктор списка. Позволяет включать дополнительную функциональность списка
 * @typedef {Object} RelatedList.ListOptions
 * @property {boolean} lengthCount=false - Флаг, указывающий, следует ли считать длину списка. Значение длины доступно через свойство length.
 * @property {boolean} reverseDirection=false - Флаг, изменяет порядок перебора элементов списка.
 * По умолчанию используется принцип FIFO: "Первым пришёл - первым ушёл" и в таком случае список перебирается с начала до конца.
 * Если установить флаг в состояние true, то будет использоваться принцип LIFO: Последним пришёл - первым ушёл" и тогда список будет перебираться с конца до начала. Значение по умолчанию - false (перебор объектов с первого до последнего), значение true - с последнего до первого.
 */

/**
 * //TODO  Посмотреть способы описания класса
 *
 * Класс представляющий связанный список.
 * @since 0.1.0
 * @version 0.4.0
 */
class RelatedList {
    #nextChain;
    #prevChain;
    #headChain;

    /**
     * По умолчанию, конструктор создаёт пустой объект с базовым функционалом.
     * Чтобы добавить дополнительную функциональность списку, необходимо её включить
     * добавив соответствующие флаги в объект [options]{@link ListOptions}
     * @constructor
     *
     * @param {ListOptions} options - объект с флагами для включения дополнительных функций
     * @since 0.1.0
     * @version 0.2.0
     */
    constructor(options = {}) {
        this[mainChains] = {head: null, tail: null, current: null};

        this.#readOptionsSet(options);
    }

    /**
     * Количество элементов в списке. Числовое значение доступно если в ListOptions указан флаг *lengthCount = true*.
     * В противном случае, доступ к полю length сохраняется, его значение всегда равно *false*
     * @type {number|false}
     * @readonly
     * @since 0.2.0
     */
    get length() {
        return this[lengthStrategy].length;
    }

    /**
     * Устанавливает список в начало. Последующий вызов метода next() возвращает первый элемент списка.
     * @since 0.2.0
     */
    start() {
        this[mainChains].current = null;
    }

    /**
     * Переводит текущую позицию в начало списка и возвращает первый элемент.
     * @returns {any|undefined} Первый элемент списка или undefined, если список пуст.
     * @since 0.1.0
     * @version 0.4.0
     */
    head() {
        if (this[mainChains].head === null) {
            return;
        }
        this[mainChains].current = this.#headChain();
        return this.current;
    }

    /**
     * Переводит текущую позицию к следующему элементу и возвращает его значение.
     * Если достигнут конец списка, возвращает undefined и переводит текущую позицию в начало списка.
     * @returns {any|undefined} Следующий элемент списка или undefined, если достигнут конец списка.
     * @since 0.1.0
     * @version 0.4.0
     */
    next() {
        if (this[mainChains].current) {
            this[mainChains].current = this.#nextChain();
            return this.current;
        } else {
            return this.head();
        }
    }

    /**
     * Перемещает текущую позицию к предыдущему элементу и возвращает его значение.
     * Если достигнуто начало списка, возвращает undefined/
     * @returns {any|undefined} - Предыдущий элемент в списке, или undefined, если достигнуто начало списка.
     * @since 0.3.0
     * @version 0.4.0
     */
    prev() {
        if (!this[mainChains].current) return;
        this[mainChains].current = this.#prevChain();
        return this.current;
    }

    /**
     * Проверяет, достигнут ли конец списка.
     *
     * @returns {boolean} Возвращает true, если текущая позиция достигла конца списка или текущий элемент является последним; иначе false.
     * @since 0.2.0
     * @version 0.4.0
     */
    isEnd() {
        return !this[mainChains].current || this.#nextChain() === null;
    }

    /**
     * Проверяет, вернет ли вызов метода next() элемент списка
     *
     * @returns {boolean} Возвращает true, если next() вернет элемент списка; иначе false.
     * @since 0.2.0
     * @version 0.4.0
     */
    isNext() {
        return (
            !!this[mainChains].head &&
            (!this[mainChains].current || this.#nextChain() !== null)
        );
    }

    /**
     * Проверяет наличие звеньев в списке
     * @returns {boolean} - true если список не содержит ни одного звена, false если в списке есть звенья
     * @since 0.2.0
     * @version 0.4.0
     */
    isEmpty() {
        return !this[mainChains].head;
    }

    /**
     * Значение текущего звена. При присвоении undefined значение, оно будет записано как null.
     * При чтении значения в начале или конце списка - будет возвращено undefined.
     * При присвоении значения в начале или конце списка будет выброшено исключение с ошибкой *RangeError*
     * @type {any|undefined}
     */
    get current() {
        if (!this[mainChains].current) return;
        return this[mainChains].current.content;
    }

    set current(value) {
        if (!this[mainChains].current) throw new RangeError("The start or end of the list has been reached");
        this[mainChains].current.content = value;
    }


    /**
     * Добавляет новые элементы в конец списка.
     * @param {...any} values - Элементы для добавления в список.
     * @since 0.1.0
     * @version 0.2.0
     */
    add(...values) {
        // Для каждого элемента используется стратегия добавления в конец списка
        values.forEach(addElementByStrategy(addToEnd, this));
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
     * Итератор для объектов класса RelatedList.
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
     * @param {function(any, number, RelatedList): any} callback - Функция, вызываемая для каждого элемента списка;
     *            принимает три аргумента: текущий элемент, его индекс и сам список.
     * @param {Object} [thisArg={}] - Значение, используемое в качестве `this` при вызове `callback`.
     * @throws {TypeError} Если `callback` не является функцией.
     * @returns {RelatedList} Новый список с результатами вызова `callback`.
     * @since 0.2.0
     */
    map(callback, thisArg = {}) {
        if (typeof callback !== "function")
            throw new TypeError("callback is not a function");
        const result = new RelatedList();
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
     * @param {function(any, number, RelatedList): void} callback - Функция, вызываемая для каждого элемента списка;
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
     * @returns {RelatedList} - Копия связанного списка.
     * @since 0.3.0
     */
    clone() {
        const options = getOptions(this);
        const list = new RelatedList(options);

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

    #addChain(strategy) {
        return function (value) {
            const item = new Item(value);
        }
    }
}

module.exports = RelatedList;

//TODO Пересмотреть стратегии
/**
 * Создает функцию, которая добавляет элемент в список по заданной стратегии.
 * Полученная функция используется для перебора элементов массива.
 *
 * @param {function(Item)} strategy - Функция, определяющая стратегию добавления элемента.
 * @param {RelatedList} context - Экземпляр списка к которому применяется стратегия
 * @returns {function(any)} - Функция, которая добавляет элемент в список.
 * @since 0.3.0
 */
function addElementByStrategy(strategy, context) {
    return (value) => {
        const item = new Item(value);
        // strategy(item);
        strategy.call(context, item);
        context[mainChains].add();
    };
}

/**
 * Стратегия действий для добавления элемента в конец списка
 *
 * @param {Item} item - Элемент, который нужно добавить в конец списка.
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
 * @param {Item} item - Элемент, который нужно добавить в список перед текущим элементом.
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
 * @param {Item} item - Элемент, который нужно добавить в список после текущего элемента.
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
 * @param {RelatedList} list - Исходный список, из которого извлекаются опции.
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
