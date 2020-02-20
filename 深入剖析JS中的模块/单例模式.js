
let name = 'jack'


function fn() {

}


(function() {
    let name = 'bbb'
    function fn() {
        console.log(name)
    }
})()

/**
 * 高级单例模式
 * 创建一个命名空间，接收闭包中返回的相关信息，将闭包中的变量暴露出来供外部使用
 */
let module1 = (function() {
    let name = 'ccc'
    function fn() {
        console.log(name)
    }

    return {
        fn: fn
    }
})()



