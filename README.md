# Related List Module

## Description

## What is this?

The module provides an implementation of such a data structure as a [linked list](https://en.wikipedia.org/wiki/Linked_list). A linked list is a collection of items, each of which stores a reference to the next item in the list, which allows you to efficiently add and remove items.

## Installation

```bash
npm install related-list
```

The module is written using CommonJS modules. Can be used in CommonJS and ES6.

## Usage

Before you can use a structure, you must create an instance, and then you can add content to it.

```js
const RelatedList = require("related-list");
// Create an empty structure
const itemList = new RelatedList();
// Add one item to the end of the list
itemList.add(onceItem)
// Add several items to the end of the list
itemList.add(onceItem, onceItem, onceItem)
// Add an array of items to the end of the list
itemList.add(...arrayItems)
```

### Manual traversal of elements
When manually traversing the elements of a list, the *next()* method goes to the next element of the list and returns its contents. If the current element is the last one, it returns *undefined*, calling *next()* method again starts traversing the list again and goes to the first element.

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

Returning to the previous element is done using the *prev()* method. The method moves to the previous element and returns it.

```js
console.log(itemList.next());  // 2
console.log(itemList.prev());  // 1
console.log(itemList.prev());  // undefined
console.log(itemList.prev());  // undefined
```

> A linked list does not provide the sequence number of the current element, nor does it have the ability to access the elements of the list by sequence number.

The *current* property provides access to the current element. The property getter returns the value of the element, and setter allows you to modify it. The *remove()* method is used to remove the current element

```js
console.log(itemList.current);  // 1
console.log(itemList.next());   // 2
itemList.current = 0
console.log(itemList.current);  // 0
itemList.remove();
console.log(itemList.current);  // 3
```

There are two methods for returning to the beginning of the list:

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
itemList.add('1', '2', '3');
// The head() method goes to the first item and returns its value
console.log(itemList.head());  // 1
console.log(itemList.next());  // 2

// The start() method returns the list to the beginning, but does not assign the current item. This method is used to call the next() method sequentially
itemList.start();
console.log(itemList.next());  // 1
console.log(itemList.next());  // 2
```

To add elements to the current element, the *addBefore()* and *addAfter()* methods are used.

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


The list also provides background information:

```js
const RelatedList = require("related-list");
const itemList = new RelatedList();
// Returns true if the list is empty and contains no items
itemList.isEmpty()  // true
itemList.add('1', '2', '3');

itemList.isEmpty()  // false
// Returns true if the current element is the last or the current element is not selected
itemList.isEnd();  // true
// Returns true if the next next() call returns an element of the list
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

### Template-based element traversal

The following tools are provided to perform template operations on elements

The *forEach()* and *map()* methods will apply the specified function to each element in the list. The *map()* method will return a new linked list containing the result of the function.


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

*for ... of* loop is also available

```js
for (const item of itemList) {
  console.log(item)
}
// 1
// 2
// 3
```

### List length

By default, the list object does not calculate its own length (the number of items in the list) and the *length* property returns *false*. To enable this feature, when creating a new list, you must specify the *lengthCount = true* parameter

```js
const RelatedList = require("related-list");
const itemList = new RelatedList({ lengthCount: true });
itemList.length  // 0
itemList.add('1', '2', '3');
itemList.length  // 3
```