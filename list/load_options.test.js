const lists = new WeakMap();
const contextConstructor = function () {
  this.class = "RelatedList";
  return this;
};

jest.mock("./index.js");
const RelatedList = require("./index.js");

const loadOptions = function (context, options) {
  return require("./load_options")(context, lists, options);
};

describe("Загрузчик настроек списка loadOptions", () => {
  let context;

  beforeEach(() => {
    context = contextConstructor();
    lists.set(context, {});
  });

  test("должен добавить свойство length со значением false, если options не передан", () => {
    const result = loadOptions(context);
    expect(result.lengthCount).toBe(false);
    const contextList = lists.get(context);
    expect(contextList).toHaveProperty("length");
    expect(typeof contextList.length).toBe("function");
    expect(contextList.length()).toBe(false);
  });

  test("должен добавить свойство length и включить счетчик, если lengthCount=true", () => {
    const result = loadOptions(context, { lengthCount: true });
    expect(result.lengthCount).toBe(true);
    const contextList = lists.get(context);
    expect(contextList).toHaveProperty("length");
    expect(typeof contextList.length).toBe("function");
    expect(contextList.length()).toBe(0);
    contextList.length.add();
    expect(contextList.length()).toBe(1);
    contextList.length.remove();
    expect(contextList.length()).toBe(0);
  });

  test('должен выбросить ошибку TypeError, если аргументы имеют неправильный тип', () => {
    expect(() => loadOptions({}, { lengthCount: true })).toThrow(TypeError);
    expect(() => loadOptions({}, { lengthCount: true })).toThrow('context must be an instance of RelatedList');

    expect(() => loadOptions(context, 42)).toThrow(TypeError);
    expect(() => loadOptions(context, 42)).toThrow('List options must be an object');
  });
});
