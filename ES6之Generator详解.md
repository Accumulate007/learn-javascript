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






