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

#### 数据描述符和存取描述符
JavaScript对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
- **数据描述符**是一个具有值的属性，该值可能是可写的，也可能不是可写的。
- **存取描述符**是由getter-setter函数对描述的属性。

描述符必须是这两种形式之一；不能同时是两者。















