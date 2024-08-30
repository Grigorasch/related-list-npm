# Related List

Модуль предоставляет реализацию такой структуры данных как связанный список. Связанный список - это коллекция элементов, каждый из которых хранит ссылку на следующий элемент в списке, что позволяет эффективно добавлять и удалять элементы.

## Установка

```bash
npm install related-list
```

Модуль написан с использованием CommonJS модулей. Может быть использован в CommonJS и ES6.

## Использование

Перед использованием структуры, необходимо создать экземпляр, после чего в него можно добавлять содержимое.

```js
const RelatedList = require("related-list");
// Создаём пустую структуру
const itemList = new RelatedList();
// Добавляем один элемент в конец списка
itemList.add(onceItem)
// Добавляем несколько элементов в конец списка
itemList.add(onceItem, onceItem, onceItem)
// Добавляем массив элементов в конец списка
itemList.add(...arrayItems)
```

### Ручной обход элементов
При ручном обходе элементов списка, метод *next()* переходит к следующему элементу списка и возвращает его содержимое. Если текущий элемент последний, то возвращает *undefined*, повторный вызов метода *next()* начинает обход списка заново и переходит к первому элементу.

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
itemList.add('1', '2', '3');
console.log(itemList.next());  // 1
console.log(itemList.next());  // 2
console.log(itemList.next());  // 3
console.log(itemList.next());  // undefined
console.log(itemList.next());  // 1
```

Возврат к предыдущему элементу осуществляется при помощи метода prev(). Метод переходит к предыдущему элементу и возвращает его.

```js
console.log(itemList.next());  // 2
console.log(itemList.prev());  // 1
console.log(itemList.prev());  // undefined
console.log(itemList.prev());  // undefined
```

> Связанный список не предоставляет порядковый номер текущего элемента, а также не имеет возможности обращаться по порядковому номеру к элементам списка.

Свойство *current* предоставляет доступ к текущему элементу. Getter свойства возвращает значение элемента, а setter позволяет его изменить. Для удаления текущего элемента используется метод *remove()*

```js
console.log(itemList.current);  // 1
console.log(itemList.next());   // 2
itemList.current = 0
console.log(itemList.current);  // 0
itemList.remove();
console.log(itemList.current);  // 3
```


Для возврата в начало списка существует два метода:

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
itemList.add('1', '2', '3');
// Методо head() переходит к первому элементу и возвращает его значение
console.log(itemList.head());  // 1
console.log(itemList.next());  // 2

// Метод start() возвращает список в начало, но не назначает текущего элемента. Такой способ используется для последовательного вызова метода next()
itemList.start();
console.log(itemList.next());  // 1
console.log(itemList.next());  // 2
```

Для добавления элементов у текущего элемента, исполльзуются методы *addBefore()* и *addAfter()*

```js
itemList.head();  // 1
itemList.next();  // 2
itemList.addBefore('1.1', '1.2', '1.3');
itemList.addAfter('2.1', '2.2', '2.3');
// 1
// 1.1
// 1.2
// 1.3
// 2
// 2.1
// 2.2
// 2.3
// 3
```


Список также предоставляет справочную информацию:

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
// Возвращает true если список пуст не содержит ни одного элемента
itemList.isEmpty()  // true
itemList.add('1', '2', '3');

itemList.isEmpty()  // false
// Возвращает true если текущий элемент является последним или текущий элемент не выбран
itemList.isEnd();  // true
// Возвращает true если следующий вызов next() вернет элемент списка
itemList.isNext();  // true

itemList.next();   // 1
itemList.isEnd();  // false
itemList.isNext();  // true

itemList.next();   // 2
itemList.isEnd();  // false
itemList.isNext();  // true

itemList.next();   // 3
itemList.isEnd();  // true
itemList.isNext();  // false

itemList.next();   // undefined
itemList.isEnd();  // true
itemList.isNext();  // true

itemList.next();   // 1
itemList.isEnd();  // false
itemList.isNext();  // true
```

### Шаблонный обход элементов

Для выполнения шаблонных операций над элементами предоставляются следующие инструменты

Методы *forEach()* и *map()* применят для каждого элемента списка заданную функцию. Метод *map()* вернёт новый связанный список, содержащий результат выполнения функции.

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
itemList.add('1', '2', '3');

// forEach
itemList.forEach(item => console.log(item));
// 1
// 2
// 3


// map
const newItemList = itemList.map(item => +item * 2)
newItemList.forEach(item => console.log(item));
// 2
// 4
// 6
```

Также доступен перебор при помощи цикла *for ... of*

```js
for (const item of itemList) {
  console.log(item)
}
// 1
// 2
// 3
```

### Длина списка

По умолчанию, объект списка не вычисляет собственную длину (количество элементов в списке) и свойство *length* возвращает значение *false*. Чтобы включить данную возможность, при создании нового списка необходимо указать параметр *lengthCount = true*

```js
const RelatedList = require("related-list");
const itemList = new RelatedList({ lengthCount: true });
itemList.length  // 0
itemList.add('1', '2', '3');
itemList.length  // 3
```

### Преобразование списка в массив

Любой список может быть представлен в виде массива с сохранением последовательности элементов. Для этого используйте метод toArray()

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
itemList.add('1', '2', '3');
itemList.toArray();    // ['1', '2', '3']
```