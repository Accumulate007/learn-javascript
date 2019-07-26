### 1.slice(start, end)
slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分。
```
let str = 'abcdefghijk is my name';

let s1 = str.slice(2, 6);	// 'cdef'
```

### 2.split()
split() 方法用于把一个字符串分割成字符串数组。
```
let str = 'abcdefghijk is my name';

let s1 = str.split('f');	// ["abcde", "ghijk is my name"]
```

### 3.substr(start, num)
substr() 方法可在字符串中抽取从start下标开始的指定数目num的字符。
```
let str = 'abcdefghijk is my name';

let s1 = str.substr(3, 3);	// 'def'
```

### 4.substring(start, end)
substring() 方法用于提取字符串中介于两个指定下标之间的字符。包括start处的字符，但不包括end处的字符。
```
let str = 'abcdefghijk is my name';	

let s1 = str.substring(3, 16);	// 'defghijk is m'
```

### 5.charAt(index)
charAt() 方法可返回指定位置的字符。
```
let str = 'abcdefghijk is my name';	

let s1 = str.charAt(5);	// 'f'
```

### 6.charCodeAt(index)
charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。
```
let str = 'abcdefghijk is my name';	

let s1 = str.charCodeAt(7);	// 104
```


