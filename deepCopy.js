  //深复制，要想达到深复制就需要用递归
        function deepCopy(obj, copy) {
            var copy = copy || {}
            for (var i in obj) {
                if (typeof obj[i] === 'object') {
                    //要考虑深复制问题了
                    obj[i].constructor === Array ? copy[i] = [] : copy[i] = {}
                    deepCopy(obj[i], copy[i])  //递归将引用类型转换为基本类型
                } else {
                    copy[i] = obj[i]  //普通类型直接赋值
                }
            }
            return copy
        }