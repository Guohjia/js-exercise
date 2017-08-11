var People=(function(){
    var name='xiaoMing';
    function sayName(){
        console.log(name)
    }
    return {
        name:name,
        sayName:sayName
    }
})()

//模块模式,=>闭包:返回属性和方法,提供属性方法访问的接口