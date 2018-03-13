var defer = function () {
    let pending = [], value;
    return {
        resolve: function (_value) {
            if(pending){
                value = _value;
                for (var i = 0; i < pending.length; i++) {
                    pending[i](value)
                }
                pending = undefined;
            }else{
                throw new Error("只能被resolve一次啊.")
            }
        },
        then: function (_callback) {
            if (pending) {
                pending.push(_callback)
            } else {
                _callback();
            }
            //
        }
    }
}

let oneOneSecondLater = () => {
    let result = defer();
    setTimeout(() => {
        result.resolve(1); //一秒后传入值,并且执行callback
        result.resolve(1);
    }, 1000);
    return result;
};

oneOneSecondLater().then((i) => {
    console.log('这就是,我就是异步then,我只为自己代言哈哈哈哈'+i)
})  //第二个then无法实现链式调用