const RelatedList = require("./");

describe("Тесты класса RelatedList", () => {
  describe("Конструктор", () => {
    test("должен создать экземпляр", () => {
      const list = new RelatedList();
      expect(list._head).toBeNull();
      expect(list._tail).toBeNull();
      expect(list._current).toBeNull();
    });
  });

  describe("Метод add", () => {
    test("должен добавить элемент в список", () => {
      const list = new RelatedList();
      list.add("test_content");
      expect(list._head).not.toBeNull();
      expect(list._tail).not.toBeNull();
      expect(list._head.content).toBe("test_content");
      expect(list._tail.content).toBe("test_content");
      list.add("next_content");
      expect(list._head.content).toBe("test_content");
      expect(list._tail.content).toBe("next_content");
      let value = list.current;
      expect(value).toBeUndefined();
      value = list.next();
      expect(value).toBe("test_content");
      expect(list._current).toBe(list._head);
      expect(list._current.content).toBe("test_content");
      value = list.next();
      expect(value).toBe("next_content");
      expect(list._current).toBe(list._tail);
      value = list.next();
      expect(value).toBeUndefined();
      expect(list._current).toBeNull();
    });
    test("должен изменить значения всех элементов в списке", () => {
      const data = ["item1", "item2", "item3"];
      const newdata = ["new_item1", "new_item2", "new_item3"];
      const list = new RelatedList();
      data.forEach(list.add.bind(list));
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
    });
  });
  describe("Метод remove", () =>{
    test("должен удалить элемент из списка", () =>{
      const data = ["item1", "item2", "item3"];
      const list = new RelatedList();
      data.forEach(list.add.bind(list));
      list.next();
      list.next();
      list.remove();
    });
  });
});
