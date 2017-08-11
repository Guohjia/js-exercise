var single=function(){
    var instance;
    function init(name){
        return {
            name:name
        }
    }
    return {
        createPeople:function(name){
            if(!instance){
                instance=init(name);
            }
            return instance
        }
    }
}()

console.log(single.createPeople('xiaoMing'))  //xiaoMing
console.log(single.createPeople('xiaoMing'))   //注意依然是xiaoMing
//这就是单例模式：返回的始终是同一个对象引用,节约内存,并不会创建新的对象,只会拿出原来的核心
//应用场景:dialog弹窗