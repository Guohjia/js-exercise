function FiveInArow(board) {
    this.board = board;
    // this.nextChess = 'white'  //初始化接下来是哪方下棋
    this.symbolNext = document.querySelector('.turn')  //下棋顺序控制
    this.backBtn=document.querySelector('.back')
    this.restartBtn=document.querySelector('.restart')
    this.symbolNext.style.background = 'white'  //初始化接下来是白方下棋
    this.dataStoreX = [];
    this.dataStoreY = [];
    this.bindEvents()
}

FiveInArow.prototype.bindEvents = function (e) {
    var _this = this;
    this.board.addEventListener('click', function (e) {
        _this.clickX = e.clientX + window.scrollX  //踩坑一：因为小格子offsetLeft是相对于父元素board计算的，而clientX是相对于浏览器窗口计算的，因此出现滚动条并滚动会出现bug，所以要加上window.scrollX;scrollY同理;
        _this.clickY = e.clientY + window.scrollY
        _this.coordinateX = e.target.offsetLeft
        _this.coordinateY = e.target.offsetTop
        _this.length = _this.dataStoreX.length
        _this.newChess = document.createElement('div')
        _this.newChess.className = 'chess'
        _this.positioning(_this.clickX, _this.clickY, _this.coordinateX, _this.coordinateY)
        _this.ifChess()
    })
    this.backBtn.addEventListener('click',function(){
        if(!_this.hasRegret){
            _this.comeBack()
        }
    })
    this.restartBtn.addEventListener('click',function(){
        _this.reStart()
    })
}

//下棋，插入元素
FiveInArow.prototype.playChess = function () {
    this.dataStoreX.push(this.newChess.style.left)
    this.dataStoreY.push(this.newChess.style.top)
    document.body.appendChild(this.newChess)
    this.hasRegret=false; //悔棋标志，只能悔棋一次返回到上一步;
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
}

//判断将要下棋的位置是否已经存在棋子;
FiveInArow.prototype.ifChess = function () {
    if (this.length > 0) {
        for (var i = 0; i < this.length; i++) {
            if (this.newChess.style.left == this.dataStoreX[i] && this.newChess.style.top == this.dataStoreY[i]) {  //判断所下位置是否已经有棋，没有则可插入结点下棋；
                console.log('这里已经有棋子啦')
                break;
            }
            if (i == this.length - 1) {   //已经遍历到最后一个数据，且与新数据不相等
                this.colorSet();
                this.playChess()
                break;
            }
        }
    } else {
        this.colorSet()
        this.playChess()
    }
}

//下棋颜色以及两个标志位的设置
FiveInArow.prototype.colorSet = function () {
    if (this.symbolNext.style.background == 'white') {
        this.newChess.style.background = "white"
        this.symbolNext.style.background = 'black' //改变标志位
    } else {
        this.newChess.style.background = "black"
        this.symbolNext.style.background = 'white'
    }
}

//悔棋
FiveInArow.prototype.comeBack=function(){
    var chesses=document.getElementsByClassName('chess')
    length=chesses.length
    chesses[length-1].remove()
    this.dataStoreX.splice(length-1,1)  //注意悔棋之后要删除数据,一个棋子对应一个数据，因此无需再次计算length
    this.dataStoreY.splice(length-1,1)
    this.colorSet()  //注意悔棋之后棋子相关颜色及标志位都要回退;
    this.hasRegret=true
}

//重新开始
FiveInArow.prototype.reStart=function(){
    var chesses=document.getElementsByClassName('chess')
    for(var i=0,length=chesses.length;i<length;i++){
       while(chesses[i]){   //踩坑时刻二:注意此处必须加while语句，不加则报错
           chesses[i].remove()
       }
    }
    this.dataStoreX=[]  //数据清零;
    this.dataStoreY=[]
    if(this.symbolNext.style.background = 'black' ){
        this.colorSet();  //确保重新开始依然是白方优先;
    }
}


newFiveInArow = (function () {
    return {
        init: function (node) {
            new FiveInArow(node)
        }
    }
})()

newFiveInArow.init(document.querySelector('.board'))