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

*这里有几个点需要注意*</br>
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

### Promise原型方法

#### 1.Promise.prototype.then
我们知道Promise的实例可以通过then方法书写异步返回结果的回调函数。then方法有两个参数，第一个参数是resolve后的执行函数，第二个是可选的reject后的执行函数。但是，then方法也会返回一个Promise实例，可以进一步执行then方法的链式调用，只是这个返回的Promise实例不是原来的那个了。写一个简单的例子。
```
let m1 = new Promise(function(resolve, reject) {
  resolve('k1');
});

m1.then(function(s) {
  console.log(s);	// 'k1'
  return 'abc';
}).then(function(s) {
  console.log(s);	// 'abc'
});
```
我们可以看到，then方法的调用不但返回了新的Promise实例，而且第一个then方法中的返回值还会作为第二个then方法的参数传递下去。</br>
如果说上一个then方法中返回的结果是一个Promise实例，那会怎么样？我们改进一下上面的例子。
```
let m1 = new Promise(function(resolve, reject) {
	resolve('k1');
});

m1.then(function(s) {
   return new Promise(function(resolve, reject) {
      setTimeout(function() {
	let num = Math.random();
	if(num > 0.5) {
	   resolve(num);
	} else {
	   reject(num);
	}
      }, 3000);
   })
}).then(function(s) {
   console.log(`The success num is ${s}`);
}, function(e) {
   console.log(`The error num is ${e}`);
});
```
我们可以发现，上一个then方法中返回的那个Promise实例的状态，决定了下一个then方法中执行的是resolve函数还是reject函数。

#### 2.Promise.prototype.catch
我们知道，Promise实例的then方法中，是有两个参数的，这两个参数都是函数。第一个参数执行的是resolve状态的回调，第二个参数是一个可选参数，执行的是reject状态的回调。之所以说第二个参数是可选的，是因为这个参数有一个替代方式，就是Promise实例的catch方法。
```
let m1 = new Promise(function(resolve, reject) {
   setTimeout(function() {
	let num = Math.random();
	if(num > 0.5) {
	   resolve(num);
	} else {
	   reject(num);
	}
   }, 1000);
});

m1.then(function(s) {
   console.log(`the success num is ${s}`);
}).catch(function(e) {
   console.error(`the error num is ${e}`);	// 这里可以替代then中的第二个参数，捕获m1中的reject状态
});
```
执行以上代码，我们发现如果m1的状态是reject，那个这个状态可以在catch中被捕获并打印。这是我们更推荐的在Promise中捕获错误的方式。</br>
*Promise中的状态一旦变化，是无法再改变的*
```
// Promise中的状态改变只有两种形式，从pending到resolve,或者是从pending到reject
let m1 = new Promise(function(resolve, reject) {
   resolve('this is resolve');
   reject('this reject can not work...');   // 这个根本不会被执行，因为m1的状态已经是resolve，无法再改变
});

m1.then(function(s) {
   console.log(s);   // this is resolve
}).catch(function(e) {
   console.error(e);
});
```

#### 3.Promise.prototype.finally
这是一个ES2018引入的方法，指定了这个方法后，无论Promise实例的状态是resolve还是reject，finally方法都会被执行。而且finally方法不接收任何参数，也就是说，在finally方法中是无法获知之前的then方法执行的是resolve还是reject回调，所以finally方法中一般处理与状态无关的事情。
```
let p1 = new Promise(function(resolve, reject) {
   try{
	throw Error('there is some thing wrong');
   }catch(e) {
	reject(e);
   }
});

p1.then(function(s) {
   console.log(s);
}).catch(function(e) {
   console.error(e);
}).finally(function() {
   console.log('always run');	// finally里面的代码无论如何都会被执行
});
```

### Promise静态方法
#### 1.Promise.all
Promise.all用于将多个Promise实例包装成一个Promise对象，具体的用法如下
```
let p = Promise.all([p1, p2, p3]);
```
1).只要all方法参数中的Promise实例，有一个状态是reject，那么p的状态就是reject。而且此时第一个reject的Promise实例的返回值，会传递给p的回调函数。
```
let p1 = new Promise(function(resolve, reject) {
   resolve('p1 resolve...');
});

let p2 = new Promise(function(resolve, reject) {
   reject('p2 reject...');
});

let pAll = Promise.all([p1,p2]);

pAll.then(function(s) {
   console.log(s);
}).catch(function(e) {
   console.error(e);	// p2 reject...
});
```
2).如果all方法参数中所有的Promise实例的状态都是resolve，那么所有实例的返回值会被包装成一个数组传递给pAll作为参数。
```
let p1 = new Promise(function(resolve, reject) {
   resolve('p1 resolve...');
});

let p2 = new Promise(function(resolve, reject) {
   resolve('p2 resolve...');
});

let pAll = Promise.all([p1,p2]);

pAll.then(function(s) {
   console.log(s);   // ["p1 resolve...", "p2 resolve..."]
}).catch(function(e) {
   console.error(e);
});
```

#### 2.Promise.race
Promise.race也用于包装多个Promise实例。不同于Promise.all的是，Promise.race生成的新的Promise实例的状态，由race方法参数中最先改变的那个Promise实例决定。
```
let p1 = new Promise(function(resolve, reject) {
   setTimeout(function() {
      resolve('p1, 500ms...')
   }, 500);
});

let p2 = new Promise(function(resolve, reject) {
   setTimeout(function() {
      resolve('p2, 200ms...');
   }, 200);
});

let pRace = Promise.race([p1,p2]);

pRace.then(function(s) {
   console.log(s);	// p2, 200ms...
}).catch(function(e) {
   console.error(e);
});
```

#### 3.Promise.resolve
Promise.resolve方法用于将一个对象包装成Promise对象。
```
// 使用Promise.resolve包装一个函数
let fn = function() {console.log('this is fn')};

let f1 = Promise.resolve(fn);

// 等价于
let f2 = new Promise(function(resolve, reject) {
   resolve(fn);
});

f1.then(function(s) {
   s();	// this is fn
});

f2.then(function(s) {
   s();	// this is fn
});
```
*传递给Promise.resolve()方法的参数有四种不同的情况，分别得到不同的结果*</br>
1)如果传递的参数是一个Promise对象，那么Promise.resolve()方法则原封不动的返回这个对象。</br>
2)如果传递的参数是一个带有thenable方法的对象，那么Promise.resolve()方法会将这个对象转为Promise对象，并且立即执行该对象的then方法。</br>
```
let thenObj = {
   'then': function(resolve, reject) {
      resolve('thenObj~~~');
   }
}

let t1 = Promise.resolve(thenObj);

t1.then(function(s) {
   console.log(s);   // thenObj~~~
});
```
3)如果传递的参数是不具备thenable属性的对象，或者传递的是普通类型的数据，那么Promise.resolve()会返回一个Promise实例，并将状态改为resolve，把这个数据作为参数传递过去。
```
let obj = {};

let t1 = Promise.resolve(obj);
t1.then(function(s) {
   console.log(s === obj);	// true
});
```
4)如果不传递任何参数，则直接返回一个resolve状态的Promise对象。
```
let t1 = Promise.resolve();

t1.then(function(s) {
   console.log(s);	// undefined
});
```

#### 4.Promise.reject
Promise.reject(obj)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。传递给Promise.reject(obj)方法的参数obj，会原封不动的作为参数传递给实例的reject回调函数作为参数。
```
let obj = {'name': 'this is an obj'}
let t1 = Promise.reject(obj);

t1.then(function(s) {
   console.log(s);
}).catch(function(e) {
   console.log(e);	// {name: "this is an obj"}
})
```
