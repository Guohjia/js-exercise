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
            self.reject(e);
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
    triggerThen: function () {
        var current = this.thenCache.shift();//移除缓存'
        var res = null;
        if (!current) {//成功解析并读取完then cache,也就是可能并没有调用then
            return this;
        }
        if (this.status === 'resolved') { //根据状态选择调用缓存中的函数
            res = current.onFulfilled;
        } else if (this.status === 'rejected') {
            res = current.onRejected;
        }

        if (typeof res === 'function') {
            this.value = res.call(undefined, this.value);//传入缓存值
            this.status = 'resolved';//只要有处理，则状态为resolved
            this.triggerThen();// 继续执行then链,最终将返回当前promise对象
        } else {
            this.triggerThen(); // 不是函数继续执行then链,最终将返回当前promise对象
        }
    }
}



var myPromise = new Defer((resolve, reject) => { console.log('dosomething...'); resolve('i am resolved')}).then((resolveParam) => {
    console.log(resolveParam)
}, (reason) => {
    console.log(reason)
})