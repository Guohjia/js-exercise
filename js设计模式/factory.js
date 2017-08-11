function createPeople(name){
    var newPeople={
        name:name,
        sayName:function(){
            console.log(this.name)
        }
    }
    return newPeople  //返回一个对象
}

createPeople('xiaoMing').sayName()  //xiaoMing
createPeople('xiaoHong').sayName()  //xiaoHong

//工厂模式核心:创建返回了一个新的引用
