/**
 * Common.js
 * 主要用于服务器端，例如NodeJS
 * 
 * 每一次require都会把模块执行一遍，并且把到处的对象克隆一份
 * 
 * 重复引入的模块不会重复执行，而是会有模块的缓存，供后续重复引入的时候拷贝使用
 * 
 * 运行时加载：用到哪个模块的时候才会加载哪个模块
 */


// 导入模块
// require的时候会把moduleA.js执行一遍，并将值复制一分赋给变量 moduleA
// 后面再重新require moduleA.js，会把上一次导入的结果拷贝一份过来(模块缓存)
let moduleA = require('./moduleA.js')


// 到处模块
module.exports = {

}





