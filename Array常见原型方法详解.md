### 1.concat()
该方法用于合并两个或者多个数组，也可以往数组添加元素。该方法不改变原数组，返回一个新生成的数组。
```
let a1 = ['a', 'b'];
let a2 = [1,2];
let a3 = [true, false];

let aa = a1.concat(a2, a3);	// ["a", "b", 1, 2, true, false]
let bb = a1.concat(a2, 9, 10, a3);	// ["a", "b", 1, 2, 9, 10, true, false]
```

### 2.slice(start, end)
slice()方法用于截取数组中的元素，不会改变原数组。截取的数组元素从下标start(包含)开始到end(不包含)结束，并且返回截取的元素组成的数组。</br>
如果第一个参数是一个负数，则表示从数组的尾部开始计算位置，比如slice(-1, 2)表示从数组最后一项开始截取一个元素。
```
let a1 = ['a', 'b',1,2,3,4];

let arr = a1.slice(1, 5);	// ["b", 1, 2, 3]
let arr2 = a1.slice(-1);	// [4]
```

### 3.splice(index,howmany,item1,.....,itemX)
该方法用于向原数组添加或者删除元素，从index位置开始，howmany为需要删除的元素个数，从第三个参数开始，为向数组新增的元素，该方法**会**改变原数组，并返回删除的数组元素。
```
let a1 = ['a', 'b',1,2,3,4];
let a2 = ['o', 'p', 'q', 'r', 's', 't'];

let arr1 = a1.splice(0, 2);	// ["a", "b"]
console.log(a1);	// [1, 2, 3, 4]

let arr2 = a2.splice(2, 3, 12, 13, 14);	// ["q", "r", "s"]
console.log(a2);	// ["o", "p", 12, 13, 14, "t"]
```

### 4.shift()
该方法用于删除数组的第一个元素，然后返回这个被删除的元素。如果数组是一个空数组，则说明都不做，返回一个undefined。该方法**会**改变原数组。
```
let arr1 = ['a', 'b',1,2,3,4];
let arr2 = [];

let a1 = arr1.shift();	// 'a'
console.log(arr1);			// ["b", 1, 2, 3, 4]

let a2 = arr2.shift();	// undefined
console.log(arr2);			// []
```

### 5.unshift(newelement1,newelement2,....,newelementX)
unshift() 方法可向数组的开头添加一个或更多元素，并返回新的数组长度。该方法**会**改变原数组。
```
let arr1 = ['a', 'b',1,2,3,4];

let a1 = arr1.unshift(null, undefined, 9);	// 9 (这是改变后arr1数组的长度)
console.log(a1, arr1);			// [null, undefined, 9, "a", "b", 1, 2, 3, 4]
```

### 6.pop()
pop() 方法用于删除并返回数组的最后一个元素。如果是一个空数组，则返回一个undefined。该方法**会**改变原数组。
```
let arr1 = [2, 10, 14, 8, 4, 12, 6];

arr1.pop();
console.log(arr1);	// [2, 10, 14, 8, 4, 12]
```

### 7.sort(func)
sort()方法用于对数组进行排序，有一个可选的参数func，可自定义排序的规则，也可以不传参数进行默认排序。该方法**会**改变原数组。
```
let arr1 = [2, 10, 14, 8, 4, 12, 6];

function sortNumber(a, b) {
	return a - b;
}

arr1.sort(sortNumber);
console.log(arr1);	// [2, 4, 6, 8, 10, 12, 14]
```

### 8.map(func)
map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。该方法不会改变原始数组。
```
let arr1 = [2, 10, 14, 8, 4, 12, 6];

function util(item) {
    return item + 'k';
}

let a1 = arr1.map(util);
console.log(arr1);	// [2, 10, 14, 8, 4, 12, 6]
console.log(a1);	// ["2k", "10k", "14k", "8k", "4k", "12k", "6k"]
```

### 9.reduce(func)
reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。空数组不会有任何操作。
```
let numbers = [65, 44, 12, 4];
 
function getSum(total, num) {
  console.log(`---total is ${total}, num is ${num}---`);
  // ---total is 65, num is 44---
  // ---total is 109, num is 12---
  // ---total is 121, num is 4---
  return total + num;
}

let result = numbers.reduce(getSum);
console.log('the result is ', result);	// the result is  125
```

### 10.filter(func)
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。该方法不会改变原数组。
```
let numbers = ['abc', 'kk', '-a-', 'ok', 'hello', 'alone'];
 
function forFilter(item) {
  return item.indexOf('a') > -1;
}

let result = numbers.filter(forFilter);
console.log(result);	// ["abc", "-a-", "alone"]
```
