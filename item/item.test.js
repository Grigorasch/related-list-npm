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
      expect(item.getContent()).toBe("test_content");
      expect(item.getNext()).toBeNull();
    });
    test("должен создать экземпляр с двумя аргументами", () => {
      const nextItem = new Item("next_content");
      const item = new Item("test_content", { next: nextItem });
      expect(item.getContent()).toBe("test_content");
      expect(item.getNext()).toBe(nextItem);
    });
    test("должен создать экземпляр только с опцией", () => {
      const nextItem = new Item("next_content");
      const item = new Item(undefined, { next: nextItem });
      expect(item.getContent()).toBeNull();
      expect(item.getNext()).toBe(nextItem);
    });
  });

  describe('Методы set и get', () => {
    test('setContent должен устанавливать правильное содержимое', () => {
      const item = new Item();
      item.setContent('new_content');
      expect(item.getContent()).toBe('new_content');
      expect(item._content).toBe('new_content');
      expect(item._next).toBeNull();
    });
    test('setNext должен устанавливать правильный следующий элемент', () => {
      const item = new Item();
      const nextItem = new Item('next_content');
      item.setNext(nextItem);
      expect(item.getNext()).toBe(nextItem);
      expect(item._content).toBeNull();
      expect(item._next).toBe(nextItem);
    });
  });
});
