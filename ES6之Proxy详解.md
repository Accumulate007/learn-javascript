Proxy用于修改，或者说是拦截JavaScript中的某些操作的默认行为。相当于在目标对象之前设置了一层拦截，所有对目标对象的操作，都要先经过这层拦截的处理。
那我们所说的操作到底指的什么呢？举例如下。
```
let obj = {};

// 属性的读取
obj.name;

// 属性的设置
obj.name = 'jack';

// 属性的遍历
(for key in obj)

// 属性的删除
delete obj.age;

// 对象属性描述符的读取
let descript = Object.getOwnPropertyDescriptor(obj, name);
```
上面只是所谓对象操作的一些例子，JavaScript中还有非常多对于对象的操作。而Proxy的作用就是，在你操作这些对象的时候，在这个中间设置一层拦截，可以修改，
或者说定制操作后的结果。

#### Proxy的基本用法
Proxy的用法很简单，都遵循如下的基本形式
```
let proxy = new Proxy(obj, handler);
```
obj是你所需要代理和拦截的对象，handler是一个对象，这个对象上面有很多方法，这些方法就是对操作所做的拦截行为。这个handler里的方法不是随意写的，目前为
止，handler内一共支持13中拦截操作。分别是
1)*get(target, propKey, receiver)：用于拦截对象的属性读取。receiver参数其实就是Proxy的当前实例。*
```
let obj = {
	'name': 'jack',
	age: 25
}

let proxy = new Proxy(obj, {
	get: function(target, property, receiver) {
    console.log(proxy === receiver); // true   (receiver参数其实就是Proxy的当前实例)
		return 'map';
	}
})

proxy.name;	// 'map'
```

2)*set(target, propKey, value, receiver):拦截对对象属性的设置。*
```
let obj = {
	'name': 'jack',
	age: 25
}

let proxy = new Proxy(obj, {
	set: function(target, property, value, receiver) {
		if(typeof value === 'number' && property === 'age') {
			obj[property] = value;
		}
	}
})

proxy.name = 'abc';
proxy.age = 65;
console.log(obj);   // {name: "jack", age: 65}
```



















