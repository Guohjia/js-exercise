function FiveInArow(board) {
    this.board = board;
    // this.nextChess = 'white'  //初始化接下来是哪方下棋
    this.symbolNext = document.querySelector('.turn')  //下棋顺序控制
    this.backBtn = document.querySelector('.back')
    this.restartBtn = document.querySelector('.restart')
    this.symbolNext.style.background = 'white'  //初始化接下来是白方下棋
    this.initializeArray()
    this.bindEvents()
}
FiveInArow.prototype.initializeArray=function(){
     this.dataStore=new Array(16) 
    for(var x=0;x<16;x++){          //初始化数组,0为没有走过的，1为白棋走的，2为黑棋走的
        this.dataStore[x]=new Array(12)
        for(var y=0;y<12;y++){
            this.dataStore[x][y]=0  
        }
    }
}
FiveInArow.prototype.bindEvents = function (e) {
    var _this = this;
    this.board.addEventListener('click', function (e) {
        _this.clickX = e.clientX + window.scrollX  //踩坑一：因为小格子offsetLeft是相对于父元素board计算的，而clientX是相对于浏览器窗口计算的，因此出现滚动条并滚动会出现bug，所以要加上window.scrollX;scrollY同理;
        _this.clickY = e.clientY + window.scrollY
        _this.coordinateX = e.target.offsetLeft
        _this.coordinateY = e.target.offsetTop
        // _this.length = _this.dataStoreX.length
        _this.newChess = document.createElement('div')
        _this.newChess.className = 'chess'
        _this.positioning(_this.clickX, _this.clickY, _this.coordinateX, _this.coordinateY)
    })
    this.backBtn.addEventListener('click', function () {
        if (!_this.hasRegret) {
            _this.comeBack()
        }
    })
    this.restartBtn.addEventListener('click', function () {
        _this.reStart()
    })
}

//下棋，插入元素
FiveInArow.prototype.playChess = function () {
    document.body.appendChild(this.newChess)
    this.hasRegret = false; //悔棋标志，只能悔棋一次返回到上一步;输赢之后依然可以悔棋;
}


//纠正用户点击偏差，将每一个方格分成4份进行判断精准定位，
FiveInArow.prototype.positioning = function (clickX, clickY, coordinateX, coordinateY) {
    if (clickX - coordinateX <= 20 && clickY - coordinateY <= 21) {  //出现左上角顶点判断;等号标识交界处归于左上角定点；
        // console.log('去左上角')
        this.newChess.style.left = coordinateX - 20 + 'px'  //减去格子一半的宽度，保证棋子中心在格子左上角顶点
        this.newChess.style.top = coordinateY - 21 + 'px'   //减去格子一半的高度，保证棋子中心在格子左上角顶点
    }
    if (clickX - coordinateX > 20 && clickY - coordinateY <= 21) {  //出现右上角顶点判断;等号表示上下交界处的右边归属右上定点;
        // console.log('去右上角')
        this.newChess.style.left = coordinateX + 20 + 'px'
        this.newChess.style.top = coordinateY - 21 + 'px'
    }
    if (clickX - coordinateX <= 20 && clickY - coordinateY > 21) {  //出现左下角顶点判断;等号表示上下交界处的右边归属左下定点;
        // console.log('去左下角')
        this.newChess.style.left = coordinateX - 20 + 'px'
        this.newChess.style.top = coordinateY + 21 + 'px'
    }
    if (clickX - coordinateX > 20 && clickY - coordinateY > 21) {  //出现右下角顶点判断;
        // console.log('去右上角')
        this.newChess.style.left = coordinateX + 20 + 'px'
        this.newChess.style.top = coordinateY + 21 + 'px'
    }
    var x = (parseInt(this.newChess.style.left) - 336) / 40;//设置鼠标点击的区域，棋盘横顶点为0~16,纵顶点为0~12
    var y =(parseInt(this.newChess.style.top ) - 115) / 42;
     this.ifChess(x,y)
}

//判断将要下棋的位置是否已经存在棋子;
FiveInArow.prototype.ifChess = function (x,y) {
    if(this.dataStore[x][y]!==0){
        console.log('这里已经有棋子啦')
        return
    }else{
        this.colorSet(x,y)
        this.playChess()
        this.x=x;
        this.y=y//记录最新下的一步棋子
    }
}

//下棋颜色设置存储以及下个颜色标志位的设置
FiveInArow.prototype.colorSet = function (x,y) {
    if (this.symbolNext.style.background == 'white') {
        this.newChess.style.background = "white"
        this.symbolNext.style.background = 'black' //改变标志位
        this.dataStore[x][y]=1
    } else {
        this.newChess.style.background = "black"
        this.symbolNext.style.background = 'white'
        this.dataStore[x][y]=2
    }
}

//悔棋
FiveInArow.prototype.comeBack = function () {
    var chesses = document.getElementsByClassName('chess')
    length = chesses.length
    chesses[length - 1].remove()
    if (this.dataStore[this.x][this.y] == 1) {//注意悔棋之后棋子相关颜色及标志位都要回退;
        this.symbolNext.style.background = 'white'
    }else{
        this.symbolNext.style.background = 'black'
    }
    this.dataStore[this.x][this.y]=0  //设置悔棋位置为无棋
    this.hasRegret = true
}

//重新开始
FiveInArow.prototype.reStart = function () {
    var chesses = document.getElementsByClassName('chess')
    for (var i = 0, length = chesses.length; i < length; i++) {
        while (chesses[i]) {   //踩坑时刻二:注意此处必须加while语句，不加则报错
            chesses[i].remove()
        }
    }
    this.initializeArray() //数据清零,重新初始化数组;如果要清空的数组没有引用，空数组赋值无疑是简洁又高效的方法；如果需要保持原数组的属性，那就使用 length=0;而splice()的执行效率最低,而且会返回删除 的元素,即得到一个和原来一样的数组
    if (this.symbolNext.style.background = 'black') {
        this.symbolNext.style.background = 'white';  //确保重新开始依然是白方优先;
    }
}

// FiveInArow.prototype.ifWin = function (chessColor) {  //5个连续的，颜色相同的，在同一坐标线上的

// }


newFiveInArow = (function () {
    return {
        init: function (node) {
            new FiveInArow(node)
        }
    }
})()

newFiveInArow.init(document.querySelector('.board'))