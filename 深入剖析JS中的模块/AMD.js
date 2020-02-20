/**
 * Require.js   主要就是其中的 define 和 require 方法
 * 
 * 模块的定义基于 define 方法实现
 * define([name]?, [dependence]?, [factory])
 * name： 定义的模块的名称
 * dependence: 依赖的模块
 * factory： 所有依赖的模块加载完成之后触发factory
 * 
 * 定义新的模块之前，把依赖的模块事先都导入(依赖前置)
 * 
 */

// define 用于定义模块

// moduleA.js
define('moduleA', function() {
    function sum(...args) {
        let len = args.length
        if(len === 0) return 0
        if(len === 1) return args[0]
        return args.reduce((total, item) => {
            return total + item
        })
    }

    return {
        sum
    }
})


// moduleB.js
define('moduleB', function() {
    function average(...args) {
        let len = args.length
        if(len === 0) return 0
        if(len === 1) return args[0]

        let total = args.reduce((total, item) => {
            return total + item
        })
        return total / len
    }

    return {
        average
    }
})

// define 也可以有依赖
define(['./js/lib/module.js'], function() {
    
})



/**
 * require([dependence], [callback])
 * dependence: 依赖的模块
 * callback：所有依赖的模块加载完成之后触发callback
 */

 // rquire 使用 define定义好的模块

require([
    './js/lib/moduleA', 
    './js/lib/moduleB'
], function(moduleA, moduleB) {
    let total = moduleA.sum(1, 2)
    console.log(total)

    let average = moduleB.average(4, 6, 8)
    console.log(average)
})




/**
 * 实现自己的AMD
 */

let factories = {}

function define(moduleName, factory) {
    factories[moduleName] = factory
}



function require(dependence, callback) {
    dependence = dependence.map(item => {
        return factories[item]()
    })

    callback(...dependence)
}







