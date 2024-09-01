const Item = require("./");

describe("Тесты класса Chain", () => {
    describe("Конструктор", () => {
        test("должен создать экземпляр с правильными аргументами", () => {
            const item = new Item();
            expect(item._content).toBeNull();
            expect(item._next).toBeNull();
            expect(item._previous).toBeNull();
        });
        test("должен создать экземпляр с одним аргументом", () => {
            const item = new Item("test_content");
            expect(item.content).toBe("test_content");
            expect(item.next).toBeNull();
            expect(item._previous).toBeNull();
        });
        test("должен создать экземпляр с двумя аргументами", () => {
            const nextItem = new Item("next_content");
            const prevItem = new Item("prev_content");
            const item = new Item("test_content", {next: nextItem, previous: prevItem});
            expect(item.content).toBe("test_content");
            expect(item.next).toBe(nextItem);
            expect(item._previous).toBe(prevItem);
        });
        test("должен создать экземпляр только с опцией", () => {
            const nextItem = new Item("next_content");
            const item = new Item(undefined, {next: nextItem});
            expect(item.content).toBeNull();
            expect(item.next).toBe(nextItem);
            expect(item._previous).toBeNull();
        });
    });

    describe("Методы set и get", () => {
        test("меняем значение content", () => {
            const item = new Item();
            item.content = "new_content";
            expect(item.content).toBe("new_content");
            expect(item._content).toBe("new_content");
            expect(item._next).toBeNull();
            item.content = null;
            expect(item.content).toBeNull();
        });
        test("меняем значение next и previous", () => {
            const item = new Item();
            const nextItem = new Item("next_content");
            item.next = nextItem;
            expect(item.next).toBe(nextItem);
            expect(item._content).toBeNull();
            expect(item._previous).toBeNull();
            expect(item._next).toBe(nextItem);
            const newNextItem = new Item();
            item.next = newNextItem;
            expect(item.next).toBe(newNextItem);
            expect(item._next).toBe(newNextItem);
            const prevItem = new Item("prev_content");
            item.previous = prevItem;
            expect(item.previous).toBe(prevItem);
            expect(item._previous).toBe(prevItem);
        });
    });

    describe("Вспомогательные функции", () => {
      test("должен пропускать null и Chain объекты, на остальное выбрасывает TypeError", ()=>{
        const item = new Item();
        expect(() => item._assertIsItem(null)).not.toThrow();
        expect(() => item._assertIsItem(new Item())).not.toThrow();
        expect(() => item._assertIsItem(0)).toThrow();
        expect(() => item._assertIsItem('Hellow')).toThrow();
        expect(() => item._assertIsItem(false)).toThrow();
        expect(() => item._assertIsItem(Symbol('test'))).toThrow();
        expect(() => item._assertIsItem(undefined)).toThrow();
        expect(() => item._assertIsItem(()=>{})).toThrow();
        expect(() => item._assertIsItem({})).toThrow();
        expect(() => item._assertIsItem([])).toThrow();
      });
    });
});
