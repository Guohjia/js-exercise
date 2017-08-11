//jquery经典发布订阅
$('div').on('click',function(){}) //发布挂载click
$('h1').on('click',function(){
    $('div').trigger('click') //订阅click
})


//原生js实现发布订阅,一个事件类型只给一个处理函数
var Event = (function () {
var events = {};
function on(evt, handler) { //evt为事件类型
    if (!events[evt]) {    //判断这个事件类型是否存在；一个事件类型只给一个处理函数；
        events[evt] = { handler: handler, happenTimes: 0 }  //发布订阅模式的核心1
    } else {
        console.log('您已经为此事件绑定处理函数，无需再次绑定')
        return
    }
}
function fire(evt, val) {
    if (!events[evt]) {
        console.log('触发事件未绑定')
        return
    } else {
        events[evt].happenTimes++;//先增加次数，后调用函数
        console.log('第' + events[evt].happenTimes + '次触发事件..')
        events[evt].handler(val)
    }

}

function off(evt) {
    if (events[evt]) {
        events[evt] = null
        console.log('您已成功解除' + evt + '事件')
    } else {
        console.log('不存在的事件无需解绑')
    }
}
return {         //发布订阅模式的核心2
    on: on,
    fire: fire,
    off: off
}
})()

//绑定事件
Event.on('change', function (val) {    //传入的事件类型为change
    console.log('now val is' + val)
})

Event.on('change', function (val) {
    console.log('now val is' + val)
})
//您已经为此事件绑定处理函数，无需再次绑定

//触发事件
Event.fire('change', '哈哈') //trigger                  //pub(发布则绑定事件)/sub(订阅触发事件回调),事件的触发只取决于trigger,体现异步执行行为
//第一次触发事件..
// now val is 哈哈
Event.fire('change', '嘿嘿')
//第二次触发事件..
// now val is 嘿嘿

Event.fire('change', '呵呵')
//第三次触发事件..
// now val is 呵呵

Event.off('change')
//解除change事件事件，输出:您已成功接触change事件

Event.fire('change', '哈哈哈哈')
//触发事件未绑定




//原生js实现发布订阅,同一个事件类型可有多个处理函数,触发时处理函数均可被调用
(function Event(){
    var events={}
    function on(evt,handler){
        events[evt]=events[evt]||[] //判读事件类型是否已经存在，如果不存在则初始化为一个空数组，存在则保持;
        events[evt].push({
            handler:handler
        }) //加入处理函数,可以多个
    }
    
    function fire(evt,arg){
        if(!events[evt]){
            console.log('触发事件不存在,请先发布挂载')
        }
        for(var i=0;i<events[evt];i++){
             events[evt][i].handler(arg) //依次触发订阅事件
        }
    }
    return {
        on:on,
        fire:fire
    }
})()

//事件的异步驱动,更高的可维护性