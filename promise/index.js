function Defer(executor) {
    if (!(this instanceof Defer)) {
        throw 'constructor Defer should use "new" keyword';
    }

    if (typeof executor !== 'function') {
        throw 'Defer params should be a function';
    }

    this.thenCache = []; //{ onFulfilled: onFulfilled, onRejected: onRejected }
    this.status = 'pending';
    this.value = null;
    var self = this;
    setTimeout(function () {//把executor的call任务插入到Event Loop的消息队列去，以异步执行executor，避免与then方法同步,确保缓存中已有传入的resolve/reject
        try {
            executor.call(self, self.resolve.bind(self), self.reject.bind(self));
        } catch (e) {
            //执行executor出错
            if (typeof self.errorHandle === 'function') {
                self.errorHandle(e)
                self.status = 'rejected';
            }else{
                self.status = 'rejected';
                throw e;
            }
        }
    }, 0);
}

Defer.prototype = {
    constructor: Defer,
    resolve: function (value) {
        this.value = value;//缓存代理的值
        this.status = 'resolved';
        this.triggerThen();//触发then参数
    },
    reject: function (reason) {
        this.value = reason; //缓存失败原因
        this.status = 'rejected';
        this.triggerThen();//触发then参数
    },
    then: function (onFulfilled, onRejected) {
        this.thenCache.push({ onFulfilled: onFulfilled, onRejected: onRejected });
        return this;
    },
    catch: function (fn) {
        if (typeof fn === 'function') {
            this.errorHandle = fn;
        }
        return this;
    },
    triggerThen: function () {
        var current = this.thenCache.shift();//移除缓存
        var res = null;
        if (!current && this.status === 'resolved') {//成功解析并读取完then cache
            return this;
        } else if (!current && this.status === 'rejected') {//解析失败并读取完then cache，直接调用errorHandle
            //执行resolve/reject出错
            if (this.errorHandle) {
                this.value = this.errorHandle.call(undefined, this.rejectReason);
                this.status = 'resolved';
            }else{
                throw this.rejectReason
            }
            return this;
        };
        if (this.status === 'resolved') {
            res = current.onFulfilled;
        } else if (this.status === 'rejected') {
            res = current.onRejected;
        }

        if (typeof res === 'function') {
            try {
                this.value = res.call(undefined, this.value);//传入缓存值
                this.status = 'resolved';//只要有处理，则状态为resolved
                this.triggerThen();// 继续执行then链,最终将返回当前promise对象
            } catch (e) {
                this.status = 'rejected';//异常，则promise为reject,规则(6)
                this.rejectReason = e;
                return this.triggerThen();//触发then链
            }
        } else {
            this.triggerThen(); // 不是函数继续执行then链,最终将返回当前promise对象
        }
    }
}

var myPromise = new Defer((resolve,reject) => {
    throw 'hha'
}).then(()=>{
    console.log('this is resolve')
},()=>{
    console.log('this is reject')
}).catch((error)=>{
    console.log('I catch '+error)
})

console.log(myPromise)