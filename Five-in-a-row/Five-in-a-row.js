function FiveInArow(board) {
    this.board = board;
    this.symbolNext = document.querySelector('.turn')  //下棋顺序控制
    this.backBtn = document.querySelector('.back')
    this.restartBtn = document.querySelector('.restart')
    this.symbolNext.style.background = 'white'  //初始化开始是白方下棋
    this.gameOver=false
    this.initializeArray()
    this.bindEvents()
}

FiveInArow.prototype.initializeArray=function(){
    this.dataStore=new Array(17) 
    for(var x=0;x<=16;x++){          //初始化数组,0为没有走过的，1为白棋走的，2为黑棋走的
        this.dataStore[x]=new Array(13)
        for(var y=0;y<=12;y++){
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
        _this.newChess = document.createElement('div')
        _this.newChess.className = 'chess'
        if(!_this.gameOver){
            _this.positioning(_this.clickX, _this.clickY, _this.coordinateX, _this.coordinateY)
        }else{
            alert('游戏已经结束，不能再下棋了，请重新开始')
        }
    })
    this.backBtn.addEventListener('click', function () {
        if(_this.gameOver){
            alert('游戏已经结束，不能再悔棋了，请重新开始')
        }
        if (!_this.hasRegret) {
            _this.comeBack()
        }
    })
    this.restartBtn.addEventListener('click', function () {
        _this.reStart()
    })
}

//下棋，插入元素
FiveInArow.prototype.playChess = function (x,y) {
        document.body.appendChild(this.newChess)
        this.ifWin(x,y,this.dataStore[x][y])
        if(this.gameOver){
        this.hasRegret = true  //悔棋标志，只能悔棋一次返回到上一步;胜负已分，不再悔棋
    }else{
        this.hasRegret=false;
    }
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
    var x = parseInt((parseInt(this.newChess.style.left) - 336) / 40);//设置鼠标点击的区域，棋盘横顶点为0~16,纵顶点为0~12
    var y =parseInt((parseInt(this.newChess.style.top ) - 115) / 42);
    console.log(x)
    console.log(y)
    this.ifChess(x,y)
}

//判断将要下棋的位置是否已经存在棋子;
FiveInArow.prototype.ifChess = function (x,y) {
    if(this.dataStore[x][y]!==0){
        console.log('这里已经有棋子啦')
        return
    }else{
        this.colorSet(x,y)
        this.x=x;
        this.y=y//记录最新下的一步棋子
        this.playChess(x,y)
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
    this.gameOver=false
    if (this.symbolNext.style.background = 'black') {
        this.symbolNext.style.background = 'white';  //确保重新开始依然是白方优先;
    }
}

FiveInArow.prototype.ifWin = function (x,y,chess) {
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;

    for(var i=x;i>=0;i--){
        if(this.dataStore[i][y]!=chess){
            break;
        }else{
            count1++
        }
    }
    //往右边判断
    for(var i=x+1;i<=16;i++){
        if(this.dataStore[i][y]!=chess){
            break;
        }else{
            count1++
        }
    }
    //往上判断
    for(var i=y;i>=0;i--){
        if(this.dataStore[x][i]!=chess){
            break;
        }else{
            count2++
        }
    }
    //往下判断
     for(var i=y+1;i<=12;i++){
        if(this.dataStore[x][i]!=chess){
            break;
        }else{
            count2++
        }
    }

    //往左上判断
    for(var i=x,j=y;i>=0&&j>=0;i--,j--){
        if(this.dataStore[i][j]!==chess){
            break
        }else{
            count3++
        }
    }
    //往右下判断
   
    for(var i=x+1,j=y+1;i<=16&&j<=12;i++,j++){
        if(this.dataStore[i][j]!==chess){
            break
        }else{
            count3++
        }
    }

    //往右上判断,x增加,y减小
    for(var i=x,j=y;i<=16&&j>=0;i++,j--){
         if(this.dataStore[i][j]!==chess){
            break
        }else{
            count4++
        }
    }

    //往左下判断,x减小,y增加
    for(var i=x-1,j=y+1;i>=0&&j<=16;i--,j++){
         if(this.dataStore[i][j]!=chess){
            break
        }else{
            count4++
        }
    }

    if(count1>=5||count2>=5||count3>=5||count4>=5){
        this.gameOver=true
        if(chess==1){
            window.setTimeout(function(){
                alert('白方胜')
            },300)
        }else{
            window.setTimeout(function(){
                alert('黑方胜')
            },300)
        }
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
