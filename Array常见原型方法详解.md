#### concat()
该方法用于合并两个或者多个数组，也可以往数组添加元素。该方法不改变原数组，返回一个新生成的数组。
```
let a1 = ['a', 'b'];
let a2 = [1,2];
let a3 = [true, false];

let aa = a1.concat(a2, a3);	// ["a", "b", 1, 2, true, false]
let bb = a1.concat(a2, 9, 10, a3);	// ["a", "b", 1, 2, 9, 10, true, false]
```

#### slice(start, end)
slice()方法用于截取数组中的元素，不会改变原数组。截取的数组元素从下标start(包含)开始到end(不包含)结束，并且返回截取的元素组成的数组。</br>
如果第一个参数是一个负数，则表示从数组的尾部开始计算位置，比如slice(-1, 2)表示从数组最后一项开始截取一个元素。
```
let a1 = ['a', 'b',1,2,3,4];

let arr = a1.slice(1, 5);	// ["b", 1, 2, 3]
let arr2 = a1.slice(-1);	// [4]
```

#### splice(index,howmany,item1,.....,itemX)
该方法用于向原数组添加或者删除元素，从index位置开始，howmany为需要删除的元素个数，从第三个参数开始，为向数组新增的元素，该方法**会**改变原数组，并返回删除的数组元素。
```
let a1 = ['a', 'b',1,2,3,4];
let a2 = ['o', 'p', 'q', 'r', 's', 't'];

let arr1 = a1.splice(0, 2);	// ["a", "b"]
console.log(a1);	// [1, 2, 3, 4]

let arr2 = a2.splice(2, 3, 12, 13, 14);	// ["q", "r", "s"]
console.log(a2);	// ["o", "p", 12, 13, 14, "t"]
```














