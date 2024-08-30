const RelatedList = require("./");

describe("Тесты класса RelatedList", () => {
  describe("Конструктор", () => {
    test("должен создать экземпляр", () => {
      const list = new RelatedList();

      expect(list.isEmpty()).toBe(true);
      expect(list.isNext()).toBe(false);
      expect(list.isEnd()).toBe(true);
      expect(list.length).toBe(false);
      expect(list.current).toBeUndefined();
    });
  });

  describe("Метод add", () => {
    test("должен добавить один элемент в список", () => {
      const list = new RelatedList();
      list.add("test_content");
      expect(list.isEmpty()).toBe(false);
      expect(list.isNext()).toBe(true);
      expect(list.isEnd()).toBe(true);
      expect(list.head()).toBe("test_content");
      expect(list.isNext()).toBe(false);
      expect(list.isEnd()).toBe(true);
      expect(list.next()).toBeUndefined();
    });
    test("должен добавить несколько элементов в список", () => {
      const list = new RelatedList({ lengthCount: true });
      expect(list.lengthCount).toBe(true);
      expect(list.length).toBe(0);
      const items = [
        "test_content_1",
        "test_content_2",
        "test_content_3",
        "test_content_4",
        "test_content_5",
      ];
      list.add(...items);
      expect(list.length).toBe(5);
      expect(list.head()).toBe(items[0]);
      list.start();
      items.forEach((item) => {
        expect(list.next()).toBe(item);
      });
      list.remove();
      list.head();
      list.remove();
      expect(list.length).toBe(3);
      list.head();
      expect(list.prev()).toBeUndefined();
      expect(list.prev()).toBeUndefined();
      expect(list.prev()).toBeUndefined();
    });
    test("должен добавить элемент перед текущим и после текущего", () => {
      const list = new RelatedList({ lengthCount: true });
      const items = [
        "test_content_1",
        "test_content_2",
        "test_content_3",
        "test_content_4",
        "test_content_5",
      ];
      list.add(...items);
      list.head();
      list.next();
      list.addBefore("before");
      list.next();
      list.addAfter("after");
      expect(list.length).toBe(7);
      let result = [];
      list.forEach((item) => result.push(item));
      expect(result).toEqual([
        "test_content_1",
        "before",
        "test_content_2",
        "test_content_3",
        "after",
        "test_content_4",
        "test_content_5",
      ]);
    });
    test("должен соблюдать порядок добавления элементов", () => {
      const list = new RelatedList({ lengthCount: true });
      list.add("1", "2", "3");
      list.head();
      list.next();
      list.addBefore("1.1", "1.2", "1.3");
      list.addAfter("2.1", "2.2", "2.3");
      list.next();
      list.addBefore("2.9");
      expect(list.length).toBe(10);
      let result = [];
      list.forEach((item) => result.push(item));
      expect(result).toEqual([
        "1",
        "1.1",
        "1.2",
        "1.3",
        "2",
        "2.1",
        "2.2",
        "2.3",
        "2.9",
        "3",
      ]);
      expect(list.prev()).toBe("2.9");
      expect(list.prev()).toBe("2.3");
      expect(list.prev()).toBe("2.2");
      list.head();
      expect(list.prev()).toBeUndefined();
      expect(list.prev()).toBeUndefined();
    });
  });
  describe("Значение текущего элемента current", () => {
    test("должен получить его значение и присвоить новое", () => {
      const data = ["item1", "item2", "item3"];
      const newdata = ["new_item1", "new_item2", "new_item3"];
      const options = { lengthCount: true };
      const list = new RelatedList(options);
      list.add(...data);
      newdata.forEach((item, index) => {
        list.next();
        expect(list.current).toBe(data[index]);
        list.current = item;
      });
      list.next();
      newdata.forEach((item) => {
        list.next();
        expect(list.current).toBe(item);
      });
      expect(list.length).toBe(3);
    });
  });

  describe("Метод remove", () => {
    test("должен удалить элемент из списка", () => {
      const data = ["item1", "item2", "item3"];
      const options = { lengthCount: true };
      const list = new RelatedList(options);
      list.add(...data);
      expect(list.length).toBe(3);
      list.next();
      list.next();
      list.remove();
      expect(list.length).toBe(2);
      expect(list.current).toBe("item3");
      list.start();
      data.splice(1, 1);
      data.forEach((item) => {
        list.next();
        expect(list.current).toBe(item);
      });
    });
    test("должен выбросить RangeError при удалении элемента за пределами списка", () => {
      const list = new RelatedList();
      expect(() => list.remove()).toThrow(RangeError);
    });
  });

  describe("Проверка методов начала и конца списка", () => {
    test("isEnd в разных положениях", () => {
      const list = new RelatedList();
      list.add("item1");
      list.add("item2");
      list.add("item3");
      list.add("item4");
      expect(list.isEnd()).toBe(true);
      list.next();
      expect(list.isEnd()).toBe(false);
      list.next();
      expect(list.isEnd()).toBe(false);
      list.next();
      expect(list.isEnd()).toBe(false);
      list.next();
      expect(list.isEnd()).toBe(true);
      list.next();
      expect(list.isEnd()).toBe(true);
    });
    test("isNext в разных положениях", () => {
      const list = new RelatedList();
      list.add("item1");
      list.add("item2");
      list.add("item3");
      list.add("item4");
      expect(list.isNext()).toBe(true);
      list.next();
      expect(list.isNext()).toBe(true);
      list.next();
      expect(list.isNext()).toBe(true);
      list.next();
      expect(list.isNext()).toBe(true);
      list.next();
      expect(list.isNext()).toBe(false);
      list.next();
      expect(list.isNext()).toBe(true);
    });
    test("start и head в разных положениях", () => {
      const list = new RelatedList();
      list.add("item1");
      list.add("item2");
      list.add("item3");
      list.add("item4");
      expect(list.head()).toBe("item1");
      expect(list.next()).toBe("item2");
      list.next();
      list.next();
      expect(list.head()).toBe("item1");
      expect(list.next()).toBe("item2");
      list.next();
      list.start();
      expect(list.next()).toBe("item1");
      expect(list.next()).toBe("item2");
      list.start();
      list.start();
      expect(list.next()).toBe("item1");
      expect(list.head()).toBe("item1");
      expect(list.head()).toBe("item1");
      expect(list.next()).toBe("item2");
    });
  });

  describe("Проверка итератора", () => {
    test("должен вернуть все элементы списка", () => {
      const data = ["item1", "item2", "item3", "item4", "item5"];
      const list = new RelatedList();
      list.add(...data);
      for (const item of list) {
        expect(item).toBe(data.shift());
      }
    });
    test("метод map должен вернуть преобразованными все элементы списка", () => {
      const data = [1, 5, 8, 2, 8, 3];
      const list = new RelatedList();
      list.add(...data);
      const newList = list.map((item) => item * 2);
      newList.forEach((item, index) => {
        expect(item).toBe(data[index] * 2);
      });
    });
  });
});
