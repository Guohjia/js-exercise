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
        promise: {
            then: function (_callback) {
                if (pending) {
                    pending.push(_callback)
                } else {
                    _callback();
                }
                //
            }
        },
    }
}

