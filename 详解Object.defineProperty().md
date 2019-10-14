#### 一、基本定义
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

#### 二、认识descriptor的属性
上面我们通过Object.getOwnPropertyDescriptor()获取了一个对象的属性描述符，可以看到属性描述符是一个对象，而且拥有一些特定的属性。除了上面看到的value,writable,enumerable,configurable之外，其实还有get和set拦截器属性。分别来认识一下这些属性。
- **value**：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等），默认为undefined。
- **writable**：当且仅当该属性的writable为true时，value才能被赋值运算符改变。
- **enumerable**：当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中(被for-in遍历)。
- **configurable**：当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。


#### 三、数据描述符和存取描述符
JavaScript对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
- **数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。
- **存取描述符**是由getter-setter函数对描述的属性。

描述符必须是这两种形式之一；不能同时是两者。

##### 2.1 数据描述符













