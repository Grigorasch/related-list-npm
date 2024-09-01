const {keyElements} = require("./symbols");

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


class AddChainStrategy {
    constructor(list) {
        this.list = list;
    }
    add(existChain) {
        throw new Error('Not implemented');
    }
}

class AddLastChainStrategy extends AddChainStrategy {
    add(value) {

    }
}

module.exports = {
    lengthStrategies: {RealLengthStrategy, FakeLengthStrategy},
    directionStrategies: {NormalStrategy, ReverseStrategy},
};

