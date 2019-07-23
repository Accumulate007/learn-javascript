JS中两个数据的比较有==和===两种方式，===是一种包含类型比较的完全比较，而==是有隐式类型转换的比较。JavaScript中的==涉及的比较规则，有时候还是会让人摸不
着头脑的。本文就关于这个问题做一个总结。</br>

### 认识Number()转换规则
Number()是JavaScript语言内置的一个全局方法，用于将数据转换成对应的数字类型的数据，如果无法转换，则得到的结果是NaN。由于Number()方法是隐式类型转换中比
较重要的规则，首先认识一下它转换数据的规则。
```
// 转换数字 -> Number()方法用于转换数字，则原样返回数字本身，包括NaN也是
Number(0);      // 0
Number(15);     // 15
Number(-3);     // -3
Number(NaN);    // NaN

// 转换字符串
Number('123');   // 123
Number('123a');  // NaN
Number('weka');  // NaN

// 转换布尔值
Number(true);   // 1
Number(false);  // 0

// 转换null和undefined
Number(null);       // 0
Number(undefined);  // NaN

// 转换数组
Number([]);         // 0
Number(['5']);      // 5 (如果数组只有一项，则再次使用Number()去转换数组的这个项)
Number(['5', 2]);   // NaN (如果数组长度超过1个，则返回NaN)

// 转换函数
Number(function() {return 3});  // NaN

// 转换对象
Number({});   // NaN
```



















