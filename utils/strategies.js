const {keyElements, mainChains, lengthStrategy} = require("./symbols");
const Item = require("../chain");

class LengthStrategy {
    add() {
        throw new Error('Not implemented');
    }

    remove() {
        throw new Error('Not implemented');
    }

    get length() {
        throw new Error('Not implemented');
    }
}

class RealLengthStrategy extends LengthStrategy {
    #length = 0;

    add() {
        ++this.#length;
    }

    remove() {
        --this.#length;
    }

    get length() {
        return this.#length;
    }
}

class FakeLengthStrategy extends LengthStrategy {
    add() {
    }

    remove() {
    }

    get length() {
        return false;
    }
}

module.exports.lengthStrategies = {RealLengthStrategy, FakeLengthStrategy};


class DirectionStrategy {
    next() {
        throw new Error('Not implemented');
    }

    prev() {
        throw new Error('Not implemented');
    }

    head() {
        throw new Error('Not implemented');
    }
}

class NormalStrategy extends DirectionStrategy {
    next() {
        return this[keyElements].current.next;
    }

    prev() {
        return this[keyElements].current.previous;
    }

    head() {
        return this[keyElements].head;
    }
}

class ReverseStrategy extends DirectionStrategy {
    next() {
        return this[keyElements].current.previous;
    }

    prev() {
        return this[keyElements].current.next;
    }

    head() {
        return this[keyElements].tail;
    }
}

module.exports.directionStrategies = {NormalStrategy, ReverseStrategy};

/**
 * Стратегия возвращает объект параметров для звена вставленного перед целевым звеном
 * @param {Chain} referenceChain - целевое звено
 * @returns {Chain.ChainOptions} - объект параметров со ссылками на предшествующее и следующее звенья,
 * при добавлении перед целевым звеном
 */
function insertBeforeStrategy(referenceChain) {
    return {
        previousChain: referenceChain.prev,
        nextChain: referenceChain,
    }
}

/**
 * Стратегия возвращает объект параметров для звена вставленного после целевого звена
 * @param {Chain} referenceChain - целевое звено
 * @returns {Chain.ChainOptions} - объект параметров со ссылками на предшествующее и следующее звенья,
 * при добавлении после целевого звена
 */
function insertAfterStrategy(referenceChain) {
    return {
        previousChain: referenceChain,
        nextChain: referenceChain.next,
    }
}

module.exports.createByChain = {insertBeforeStrategy, insertAfterStrategy}
