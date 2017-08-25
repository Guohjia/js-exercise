Function.prototype.newBind =function (context){
    var self=this;
    return function(){
         //这里的self就是调用函数
        return self.apply(context)
    }
}

function xxx(){
    console.log(this)
}
var a=xxx.newBind({a:1},1,2)
a()
