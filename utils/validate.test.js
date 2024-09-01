const {validateType, validateObjectType} = require("./validate");

describe("Общая функция валидации validateType", () => {
    const numberStrategy = (value) => typeof value === "number";
    let value = 5;
    const message = "The argument must be a number"
    let validate = validateType(numberStrategy, value, message);
    test("Тест штатной работы", ()=>{
        expect(validate).toBeUndefined();
        validate = validateType(numberStrategy, value);
        expect(validate).toBeUndefined();
    });
    test("Тест ошибок", () => {
        expect(() => validateType(undefined, value, message)).toThrow(new TypeError("Invalid strategy"));
        value = '5';
        expect(() => validateType(numberStrategy, value, message)).toThrow(new TypeError("The argument must be a number"));
        expect(() => validateType(numberStrategy, value)).toThrow(new TypeError("The argument type does not match the required type"));
    })
});

describe("Функция валидации объектов", () => {
    let obj = {}
    expect(validateObjectType)
})