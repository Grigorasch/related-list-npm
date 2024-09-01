const {validateType, validateObjectType, validateChainType} = require("./validate");
const itemConstructor = function () {
    this.class = "Item";
    return this;
}

jest.mock("../chain");
const Item = require("../chain");

describe("Общая функция валидации validateType", () => {
    const numberStrategy = (value) => typeof value === "number";
    const message = "The argument must be a number"
    test("Тест штатной работы", () => {
        expect(() => validateType(numberStrategy, 5, message)).not.toThrow();
        expect(() => validateType(numberStrategy, 5)).not.toThrow();
        expect(() => validateType(numberStrategy, NaN)).not.toThrow();
    });
    test("Тест ошибок", () => {
        expect(() => validateType(undefined, 5, message)).toThrow(new TypeError("Invalid strategy"));
        expect(() => validateType(numberStrategy, '5', message)).toThrow(new TypeError("The argument must be a number"));
        expect(() => validateType(numberStrategy, undefined)).toThrow(new TypeError("The argument type does not match the required type"));
    })
});

describe("Функция валидации объектов", () => {
    const initial = {
        a: 5, b: 6, c: 7, goTo() {
        }
    }
    test("Тест штатной работы", () => {
        expect(() => validateObjectType({})).not.toThrow();
        expect(() => validateObjectType(Object.create(initial))).not.toThrow();
        expect(() => validateObjectType(Object.assign({}, initial))).not.toThrow();
        expect(() => validateObjectType(initial)).not.toThrow();
    });
    test("Тест ошибок", () => {
        const error = new TypeError("The argument type must be Object");
        expect(() => validateObjectType(undefined)).toThrow(error);
        expect(() => validateObjectType(null)).toThrow(error);
        expect(() => validateObjectType(true)).toThrow(error);
        expect(() => validateObjectType(10)).toThrow(error);
        expect(() => validateObjectType('Object')).toThrow(error);
        expect(() => validateObjectType([1,2,3])).toThrow(error);
        expect(() => validateObjectType(() => {})).toThrow(error);
        expect(() => validateObjectType(new Date())).toThrow(error);
    });
})

describe("Функция валидации звеньев списка", () => {
    test("Тест штатной работы", () => {
        expect(() => validateChainType(undefined)).not.toThrow();
        expect(() => validateChainType(null)).not.toThrow();
        expect(() => validateChainType(new itemConstructor())).not.toThrow();
    });
    test("Тест ошибок", () => {
        const error = new TypeError("Next chain must be an instance of Chain or null");
        expect(() => validateChainType(false)).toThrow(error);
        expect(() => validateChainType(new Date())).toThrow(error);
        expect(() => validateChainType('Item')).toThrow(error);
    });
});