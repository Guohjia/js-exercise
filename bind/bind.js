Function.prototype.mybind = function(){
    var _arg = [].slice.call(arguments),_newThis = _arg.shift(),_this=this;
    return function(){
        return _this.apply(_newThis,_arg)
    }
}


function test(a,b){
    console.log(this)
    console.log(a,b)
}

var newTest = test.mybind('newThis','arg1','arg2')

newTest();
