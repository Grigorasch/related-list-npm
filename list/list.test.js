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

  describe("Метод add", () =>{
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
      let value = list.current()
      expect(value).toBeNull();
      value = list.next();
      expect(value).toBe("test_content");
      expect(list._current).toBe(list._head);
      expect(list._current.content).toBe("test_content");
      value = list.next();
      expect(value).toBe("next_content");
      expect(list._current).toBe(list._tail);
      value = list.next();
      expect(value).toBeNull();
      expect(list._current).toBeNull();
    });
    
  });
});