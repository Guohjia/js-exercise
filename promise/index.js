function Defer(executor) { //executor 用户传递的执行函数,参数分别为resolve与reject;
    if (!(this instanceof Defer)) { //
        throw 'Defer is a constructor and should be called width "new" keyword';
    }
    if (typeof executor !== 'function') {
        throw 'Defer params must be a function';
    }
    try {
        executor.call(this, this.resolve.bind(this), this.reject.bind(this));//传递resolve，reject方法
    } catch (e) {
        this.reject(e);  //函数中执行错误立即调用reject
    }
}

Defer.prototype = {
    constructor: Defer,
    resolve: function (value) {
        this.value = value;//缓存代理的值
    },
    reject: function (reason) {
        this.rejectReason = reason;//缓存失败原因
    }
}