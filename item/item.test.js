const Item = require("./");

describe("Тесты класса Item", () => {
  describe("Конструктор", () => {
    test("должен создать экземпляр с правильными аргументами", () => {
      const item = new Item();
      expect(item._content).toBeNull();
      expect(item._next).toBeNull();
    });
    test("должен создать экземпляр с одним аргументом", () => {
      const item = new Item("test_content");
      expect(item.content).toBe("test_content");
      expect(item.next).toBeNull();
    });
    test("должен создать экземпляр с двумя аргументами", () => {
      const nextItem = new Item("next_content");
      const item = new Item("test_content", { next: nextItem });
      expect(item.content).toBe("test_content");
      expect(item.next).toBe(nextItem);
    });
    test("должен создать экземпляр только с опцией", () => {
      const nextItem = new Item("next_content");
      const item = new Item(undefined, { next: nextItem });
      expect(item.content).toBeNull();
      expect(item.next).toBe(nextItem);
    });
  });

  describe("Методы set и get", () => {
    test("setContent должен устанавливать правильное содержимое", () => {
      const item = new Item();
      item.content = "new_content";
      expect(item.content).toBe("new_content");
      expect(item._content).toBe("new_content");
      expect(item._next).toBeNull();
      item.content = null;
      expect(item.content).toBeNull();
    });
    test("setNext должен устанавливать правильный следующий элемент", () => {
      const item = new Item();
      const nextItem = new Item("next_content");
      item.next = nextItem;
      expect(item.next).toBe(nextItem);
      expect(item._content).toBeNull();
      expect(item._next).toBe(nextItem);
      const newNextItem = new Item();
      item.next = newNextItem;
      expect(item.next).toBe(newNextItem);
      expect(item._next).toBe(newNextItem);
    });
  });
});
