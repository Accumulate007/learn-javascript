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

### Proxy的基本用法
Proxy的用法很简单，都遵循如下的基本形式
```
let proxy = new Proxy(obj, handler);
```
obj是你所需要代理和拦截的对象，handler是一个对象，这个对象上面有很多方法，这些方法就是对操作所做的拦截行为。这个handler里的方法不是随意写的，目前为
止，handler内一共支持13中拦截操作。分别是</br>

1) *get(target, propKey, receiver)：用于拦截对象的属性读取。receiver参数其实就是Proxy的当前实例。*
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

2) *set(target, propKey, value, receiver):拦截对对象属性的设置。*
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

3) *has(target, propKey):用于拦截对proxy属性进行for in的操作，它返回一个布尔值。*
```
let obj = {
   'name': 'jack',
   age: 25
}

let proxy = new Proxy(obj, {
   has: function(target, property) {
      if(property.indexOf('age') > -1) {   // 只有 age 属性可以被for in
	return true;
      }
      return false;
   }
})

console.log('name' in proxy);	// false
console.log('age' in proxy);	// true
```

4)*deleteProperty(target, propKey):用于拦截对proxy属性进行delete的操作，它返回一个布尔值,代表该属性是否可以被删除*
```
let obj = {
   'name': 'jack',
   age: 25
}

let proxy = new Proxy(obj, {
    deleteProperty: function(target, property) {
	if(property.indexOf('age') > -1) {	// age 属性不可被删除
	   return false;
	}
	delete target[property];	// 满足条件之后，可以在原对象身上进行相应的操作
    }
})

console.log(delete proxy.age);	// false
console.log(delete proxy.name);	// true
console.log(obj);	// {age: 25}
```

5)*ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。*</br>

6)*getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。*</br>

7)*defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。*</br>

8)*preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。*</br>

9)*getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。*</br>

10)*isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。*</br>

11)*setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。*</br>

12)*apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。*</br>

13)*construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。*</br>

### Proxy使用需要注意的点
1.所有的操作都是对Proxy实例对象proxy的操作，而不是对被代理对象本身的操作，否则拦截不会起作用。</br>

2.如果handler没有设置任何拦截方法，则相当于直接操作被代理对象本身。
```
let obj = {
   'name': 'jack',
   age: 25
}

let proxy = new Proxy(obj, {});

proxy.name = 'abc';
proxy.city = 'hangzhou';
console.log(obj);   // {name: "abc", age: 25, city: "hangzhou"}
```

3.Proxy构造函数的实例，可以作为创建其它对象的原型。
```
let proxy = new Proxy({}, {
    get:function(target, property) {
	return 'aaa';
    }
});

let obj = Object.create(proxy);
obj.name;	// aaa
obj.age;	// aaa
```
