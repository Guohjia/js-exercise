function New(f) {
    //返回一个func
    return function () {
        var o = {"__proto__": f.prototype};
        f.apply(o, arguments);//继承父类的属性

        return o; //返回一个Object
    }
}


function parentTest(name){
    this.name=name
}

parentTest.prototype.charactor='kind';


var child = New(parentTest)('xiaming')

console.log(child)