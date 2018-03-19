/**
 * 装饰者(decorator)模式能够在不改变对象自身的基础上，在程序运行期间给对像动态的添加职责。与继承相比，装饰者是一种更轻便灵活的做法。
 * 可以动态的给某个对象添加额外的职责，而不会影响从这个类中派生的其它对象；
 */

var Plan1 = {
    fire: function () {
        console.log('发射普通的子弹');
    }
};

var missileDecorator= function () {
    console.log('发射导弹!');
};

var fire = Plan1.fire;

Plan1.fire=function () {
    fire();
    missileDecorator();
};

Plan1.fire();


//是新添加的函数在旧函数之前执行
Function.prototype.before=function (beforefn) {
    var _this= this;                               //保存旧函数的引用
    return function () {                           //返回包含旧函数和新函数的“代理”函数
        beforefn.apply(this,arguments);            //执行新函数,且保证this不被劫持,新函数接受的参数
                                                    // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
        return _this.apply(this,arguments);
    };
};

//新添加的函数在旧函数之后执行
Function.prototype.after=function (afterfn) {
    var _this=this;
    return function () {
        var ret=_this.apply(this,arguments);
        afterfn.apply(this,arguments);
        return ret;
    };
};


//日志系统decorator
var decorator_log = function(fn) {
    return function(){
            var result = fn.apply(this, arguments); //调用传入的逻辑
            console.log('日志系统，加法计算参数是-- '); //下面的代码就是新增的log装饰
            console.log(arguments[0]);
            return result
        }
}


var Add = function(array) {
    return array.reduce(function(pre,cur) { 
        return pre+cur
    },0)
};
Add = decorator_log(Add) //对ADD方法进行装饰扩展