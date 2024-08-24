const { accept, reject } = require("./length_counter");

describe("length_counter", () => {
  test("should return a function", () => {
    expect(typeof accept()).toBe("function");
    expect(typeof reject()).toBe("function");
    expect(typeof accept().add).toBe("function");
    expect(typeof reject().add).toBe("function");
    expect(typeof accept().remove).toBe("function");
    expect(typeof reject().remove).toBe("function");
  });

  describe("проверка работоспособности счётчика", () => {
    test("настоящий счётчик", () => {
      const counter = accept();
      expect(counter()).toBe(0);
      counter.add();
      counter.add();
      expect(counter()).toBe(2);
      counter.remove();
      expect(counter()).toBe(1);
      counter.remove();
      expect(counter()).toBe(0);
      counter.remove();
      expect(counter()).toBe(0);
      counter.remove();
      counter.remove();
      counter.remove();
      expect(counter()).toBe(0);
      counter.add();
      expect(counter()).toBe(1);
    });
    test("фейковый счётчик", () => {
      const counter = reject();
      expect(counter()).toBe(false);
      counter.add();
      expect(counter()).toBe(false);
      counter.remove();
      expect(counter()).toBe(false);
    });
  });
});
