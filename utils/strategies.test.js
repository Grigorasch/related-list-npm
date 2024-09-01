const {keyElements} = require("./symbols");
const {lengthStrategies, directionStrategies} = require("./strategies");

describe("Тестирование стратегий для вычисления длины списка", () => {
    const {RealLengthStrategy, FakeLengthStrategy} = lengthStrategies;

    test("Настоящая стратегия", () => {
        const realStrategy = new RealLengthStrategy();
        expect(realStrategy.length).toBe(0);
        realStrategy.add();
        realStrategy.add();
        realStrategy.add();
        expect(realStrategy.length).toBe(3);
        realStrategy.remove();
        realStrategy.remove();
        expect(realStrategy.length).toBe(1);
    });
    test("Фейковая стратегия", () => {
        const fakeStrategy = new FakeLengthStrategy();
        expect(fakeStrategy.length).toBe(false);
        fakeStrategy.add();
        fakeStrategy.add();
        fakeStrategy.add();
        expect(fakeStrategy.length).toBe(false);
        fakeStrategy.remove();
        fakeStrategy.remove();
        expect(fakeStrategy.length).toBe(false);
    });
});

describe("Тестирование стратегий для выбранного прямого наблюдения", () => {
    const {NormalStrategy, ReverseStrategy} = directionStrategies;
    test("Прямая стратегия", () => {
        const current  = {}
        current[keyElements] = {head, tail, current}

    });
    test("Обратная стратегия", () => {
    });
});