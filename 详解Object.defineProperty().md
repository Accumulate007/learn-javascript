### 一、基本定义
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。具体的语法为
```javascript
Object.defineProperty(obj, prop, descriptor);
```
三个参数中obj是要操作的对象，prop是要定义或修改的属性的名称，而descriptor则是这个属性的描述符，是一个对象。

一个对象的属性描述符descriptor可以通过Object.getOwnPropertyDescriptor(obj, key)获取。
```javascript
let testObj = {
    name: 'jack',
    city: {
	a: 'hz',
	b: 'sh'
    }
}

let des = Object.getOwnPropertyDescriptor(testObj, 'name');
console.log(des);	// {value: "jack", writable: true, enumerable: true, configurable: true}
```

### 二、认识descriptor的属性
上面我们通过Object.getOwnPropertyDescriptor()获取了一个对象的属性描述符，可以看到属性描述符是一个对象，而且拥有一些特定的属性。除了上面看到的value,writable,enumerable,configurable之外，其实还有get和set拦截器属性。分别来认识一下这些属性。
- **value**：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等），默认为undefined。
- **writable**：当且仅当该属性的writable为true时，value才能被赋值运算符改变。
- **enumerable**：当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中(被for-in或Object.keys()枚举)。
- **configurable**：当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。
- **get**：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入。
- **set**：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。


### 三、数据描述符和存取描述符
JavaScript对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
- **数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。
- **存取描述符**是由getter-setter函数对描述的属性。

描述符必须是这两种形式之一；不能同时是两者。

#### 3.1 数据描述符
数据描述符可用于给对象添加属性，并设置属性的描述符，可选键值有：value,writable,enumerable和configurable。
```javascript
const o1 = {};

Object.defineProperty(o1, 'name', {
    enumerable: true,
    configurable: true,
    value: 'My name is o1',
    writable: true
});

console.log(o1);  // {name: "My name is o1"}
```

#### 3.2 存取描述符
存取描述符可用于拦截对对象属性的读写操作，可选键值有：get,set,enumerable和configurable。
```javascript
const o2 = {
	name: 'I am o2~'
}

let o2Val = o2['name'];
Object.defineProperty(o2, 'name', {
    enumerable: true,
    configurable: true,
    get: function() {
	console.log('get o2 name...');
	return o2Val;
    },
    set: function(newVal) {
	console.log('set o2 name~~~');
	o2Val = newVal;
    }
});

o2.name;	// get o2 name...
o2.name = 'o2 new name';	// set o2 name~~~
```

