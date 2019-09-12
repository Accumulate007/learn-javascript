### 一、理解Generator函数的概念
Generator函数可以理解为一个状态机，封装了多个内部的状态。执行了Generator函数，会返回一个遍历器对象，通过该遍历器对象可以遍历Generator函数内部的每一个
状态。<br/>
形式上Generator函数就是一个普通的函数，但是有两点差异：<br/>
1.function关键字和函数名之间有一个星号;<br/>
2.函数体内部使用yield表达式，定义不同的内部状态。<br/>
一个最简单的Generator函数示例：<br/>
```
function* testGenerator() {
  yield 'hello';
  yield 'world';
  return '!';
}
```
testGenerator就是一个最基本的testGenerator函数，该函数内部有两个yield表达式，所以该函数有三个状态：'hello', 'world', '!'。<br/>
调用该testGenerator函数后，会返回一个遍历器对象，通过该遍历器对象，可以访问函数内部的状态。<br/>
```
const tg = testGenerator();

tg.next();	// {value: "hello", done: false}
tg.next();	// {value: "world", done: false}
tg.next();	// {value: "!", done: true}
```
#### 1.1 遍历器对象next()方法的运行逻辑
a).遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值;<br/>
b).下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式;<br/>
c).如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值;<br/>
d).如果该函数没有return语句，则返回的对象的value属性值为undefined。<br/>
yield后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，类似于一种“惰性求值”。<br/>

#### 1.2 使用Generator函数让对象具有Iterator接口
我们知道，可以被for...of遍历的对象，都是天然具有Iterator接口的对象。但是有些对象可能天然不具备Iterator接口，那我们可以手动部署Iterator接口，以便该对象可以被for...of遍历。对象的遍历器生成函数，都是部署在对象的Symbol.iterator属性上的。
```
let myIterator = {};

myIterator[Symbol.iterator] = function* () {
   yield 1;
   yield 2;
   yield 3;
}

[...myIterator];	// [1, 2, 3]

for(let key of myIterator) {
   console.log(key);	// 1 2 3
}
```



