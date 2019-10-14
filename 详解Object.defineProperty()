Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。具体的语法为
```javascript
Object.defineProperty(obj, prop, descriptor);
```
三个参数中obj是要操作的对象，prop是对象上的某个属性，而descriptor则是这个属性的描述符，是一个对象。一个对象的属性描述符descriptor可以通过
Object.getOwnPropertyDescriptor(obj, key)获取，例如。
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

















