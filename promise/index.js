         /**
         * 思路归纳
         * 如何实现异步?setTimeout0执行传入的executor执行函数,保证then传入的resolve/reject已经被缓存
         * 如何对状态进行处理?将MyPromise原型上的resolve/reject(这两个函数中进行了状态处理)作为参数传入executor => 由triggerThen根据状态值执行缓存中的函数
         * 如何执行所有传入的异步状态处理函数 => triggerThen递归,递归出口为thenCache读取完并且状态不为pending
         * 如何实现链式调用?注意状态处理结束时MyPromise的返回
         * 如何进行异常处理？传入了catch则调用catch,没有传入则执行throw;注意返回this,注意resolve/reject时出错status依然为resolved,而executor出错status变成rejected
         * 疑问1:当前操作then之后只是返回当前promise,并没有返回新的 => 遇到无法通过的case再解决吧
         * 疑问1:取消对setTimeout的依赖是否可以实现？
         */

         /**
         * @param {Function} executor 传入Promise的执行函数
         * @param {Array} thenCache 对状态处理方式(也就是通常的resolve/reject)进行缓存 => { onFulfilled: onFulfilled, onRejected: onRejected }
         * @param {String} status  状态处理
         * @param {any} value  resolve/reject值传递 =>并且如果resolve有返回值,then链式调用时可以实现值传递
         * @param {Function} errorHandle  链式调用catch传入的异常处理函数
         * @param {Object}  current  每次从thenCache中读取的状态处理对象 resolve and reject
         */
        function MyPromise(executor) {
            if (!(this instanceof MyPromise)) {  //必须以构造函数的形式被调用
                throw 'constructor MyPromise should use "new" keyword';
            }

            if (typeof executor !== 'function') {  //传人的executor执行函数必须是函数
                throw 'MyPromise params should be a function';
            }

            this.thenCache = []; 
            this.status = 'pending'; 
            this.value = null; 
            var self = this;
            
            //确保缓存中已有传入的resolve/reject，把executor的call任务插入到Event Loop的消息队列去，以异步执行executor
            setTimeout(function () {
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

        MyPromise.prototype = {
            constructor: MyPromise,
            //这里的resolve与reject主要用于缓存代理值,并且标记status,由triggerThen根据状态值执行缓存中的函数
            resolve: function (value) {
                this.value = value;
                this.status = 'resolved';
                this.triggerThen();
            },
            reject: function (reason) {
                this.value = reason; 
                this.status = 'rejected';
                this.triggerThen();
            },
            then: function (onFulfilled, onRejected) {
                //对传入的resolve/reject进行缓存
                this.thenCache.push({ onFulfilled: onFulfilled, onRejected: onRejected });
                return this;
            },
            catch: function (fn) {
                if (typeof fn === 'function') {
                    this.errorHandle = fn; //记录开发手动传入的异常处理函数
                    return this;
                }else{
                    throw 'catch handle must be function'
                }
            },
            triggerThen: function () {
                var current = this.thenCache.shift();//取出缓存
                var res = null;
                if (!current && this.status === 'resolved') {//成功解析并读取完then cache => promise状态处理结束
                    return this;
                } else if (!current && this.status === 'rejected') {//解析失败并读取完then cache，直接调用errorHandle
                    if (this.errorHandle) {
                        this.value = this.errorHandle.call(undefined, this.rejectReason);
                        this.status = 'resolved'; //进入状态处理出错状态依然为resolved
                    }else{
                        this.status = 'resolved';
                        throw this.rejectReason
                    }
                    return this;
                };

                //根据状态选择执行响应函数
                if (this.status === 'resolved') {
                    res = current.onFulfilled;
                } else if (this.status === 'rejected') {
                    res = current.onRejected;
                }

                if (typeof res === 'function') {
                    try {
                        this.value = res.call(undefined, this.value);//传入缓存值=>then链式调用时实现值传递
                        this.status = 'resolved'; //只要有处理，则状态为resolved
                        this.triggerThen();// 继续执行then链,最终将返回当前promise对象
                    } catch (e) {
                        this.status = 'rejected';
                        this.rejectReason = e;
                        return this.triggerThen();//继续执行then链
                    }
                } else {
                    this.triggerThen(); // 不是函数继续执行then链,最终将返回当前promise对象
                }
            }
        }
        


        //test

        // var myPromise = new MyPromise((resolve,reject) => {
        //     console.log('do something....');
        //     resolve('hahaha')
        // }).then((value)=>{
        //     console.log('this is resolve,and its value is ' + value)
        // },(value)=>{
        //     console.log('this is reject,and its value is' + value)
        // }).catch((error)=>{
        //     console.log('I catch '+error)
        // })

        // var myPromise = new MyPromise((resolve,reject) => {
        //     resolve()
        // }).then(()=>{
        //     throw 'go error'
        //     console.log('this is resolve')
        // },()=>{
        //     console.log('this is reject')
        // }).catch((error)=>{
        //     console.log('I catch '+error)
        // })

        var myPromise = new MyPromise(function (resolve) {
            resolve(100);
        });
        myPromise.then(function (value) {
            return value * 2;
        }).then(function (value) {
            return value * 2;
        }).then(function (value) {
            console.log("2: " + value); // => 100 * 2 * 2
        });

        console.log(myPromise)