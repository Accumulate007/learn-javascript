Promise是一种异步编程方式，Promise的实例可以理解为一个容器，保存了异步操作返回的结果。
### Promise的基本用法
Promise是一个构造函数，用于生成Promise实例。
```
let p1= new Promise(function(resolve, reject) {
  let success = 'async is success';
  let error = 'async is error';
  let result = 0;
  
  setTimeout(function(){
    result = Math.random();
		if(result > 0.5) {
			resolve(success);
		} else {
			reject(error);
		}
  }, 1000);
});
```
Promise构造函数接收一个函数作为参数，这个函数的两个参数分别是resolve和reject,它代表了异步执行结果是成功还是失败。这两个函数由JavaScript引擎提供，
不许要开发者自己部署。我只需要得到异步返回结果之后，将成功的结果作为参数传递给resolve函数，将失败的结果作为参数传递给reject函数。在生成了Promise实
例p1后，就可以通过实例的then方法指定resolve和reject的回调函数了。</br>
```
p1.then(function(success) {
	console.log(success);	
}, function(error) {
	console.log(error);
});
```
可以通过一个图片加载的例子，学习一下Promise的基本用法。
```
let m1 = new Promise(function(resolve, reject) {
	let url = 'http://pic37.nipic.com/20140113/8800276_184927469000_2.png';
	let image = new Image();

	image.onload = function() {
		resolve(image);
	}

	image.onerror = function() {
		reject(new Error(`can not load image at ${url}`))
	}

	image.src = url;
});

// Promise实例可以调用then方法操作得到的异步结果
m1.then(function(s) {
	let body = document.getElementsByTagName('body')[0];
	body.appendChild(s);
}, function(e) {
	console.log(e);
});
```
总的来说，Promise最基本的用法就是，在构造函数内拿到异步操作的返回值，然后通过JavaScript引擎提供的resolve和reject将异步结果传递出去。在Promise实例
中通过回调拿到异步结果进行相应的处理。</br>

**这里有几个点需要注意**
1)Promise新建后会立即执行。Promise构造函数的参数是一个函数，这个函数内部的同步代码，也是属于本次事件循环的同步代码。举个栗子。
```
console.log('w1');

let m1 = new Promise(function(resolve, reject) {
	console.log('p1');
	resolve('k1');
	console.log('p2');
});

console.log('w2');

m1.then(function(s) {
	console.log(s);
});
console.log('w3');
```
执行这段代码，依次输出的结果是: w1 p1 p2 w2 w3 k1。可见构造函数内部的同步代码是会立即执行的。</br>

2)实例then方法的第二个参数是可选的。








