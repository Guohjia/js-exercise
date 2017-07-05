
var board = document.querySelector('.board')
var nextChess = 'white'  //初始化接下来是哪方下棋
var symbol = document.querySelector('.turn')  //下棋顺序控制
var dataStoreX = [], dataStoreY = []
// dataStore[x]=[]
// dataStore[y]=[]

board.addEventListener('click', function (e) {
    var clickX = e.clientX + window.scrollX  //踩坑一：因为小格子offsetLeft是相对于父元素board计算的，而clientX是相对于浏览器窗口计算的，因此出现滚动条并滚动会出现bug，所以要加上window.scrollX;scrollY同理;
    var clickY = e.clientY + window.scrollY
    var coordinateX = e.target.offsetLeft
    var coordinateY = e.target.offsetTop
    var newChess = document.createElement('div')
    newChess.className = 'chess'

    //纠正用户点击偏差，将每一个方格分成4份进行判断精准定位，                           
    if (clickX - coordinateX <= 20 && clickY - coordinateY <= 21) {  //出现左上角顶点判断;等号标识交界处归于左上角定点；
        // console.log('去左上角')
        newChess.style.left = coordinateX - 20 + 'px'  //减去格子一半的宽度，保证棋子中心在格子左上角顶点
        newChess.style.top = coordinateY - 21 + 'px'   //减去格子一半的高度，保证棋子中心在格子左上角顶点
    }
    if (clickX - coordinateX > 20 && clickY - coordinateY <= 21) {  //出现右上角顶点判断;等号表示上下交界处的右边归属右上定点;
        // console.log('去右上角')
        newChess.style.left = coordinateX + 20 + 'px'
        newChess.style.top = coordinateY - 21 + 'px'
    }
    if (clickX - coordinateX <= 20 && clickY - coordinateY > 21) {  //出现左下角顶点判断;等号表示上下交界处的右边归属左下定点;
        // console.log('去左下角')
        newChess.style.left = coordinateX - 20 + 'px'
        newChess.style.top = coordinateY + 21 + 'px'
    }
    if (clickX - coordinateX > 20 && clickY - coordinateY > 21) {  //出现右下角顶点判断;
        // console.log('去右上角')
        newChess.style.left = coordinateX + 20 + 'px'
        newChess.style.top = coordinateY + 21 + 'px'
    }
    //判断下棋顺序
    // if (nextChess == 'white') {
    //     newChess.style.background = "white"
    //     nextChess = 'black'
    //     symbol.style.background = 'black' //改变标志位
    // } else {
    //     newChess.style.background = "black"
    //     nextChess = 'white'
    //     symbol.style.background = 'white'
    // }
    var length = dataStoreX.length
    if (length > 0) {
        for (var i = 0; i < length; i++) {
            // console.log('遍历')       
            if (newChess.style.left == dataStoreX[i] && newChess.style.top == dataStoreY[i]) {  //判断所下位置是否已经有棋，没有则可插入结点下棋；
                console.log('这里已经有棋子啦')
                break;
            }
            if (i == length - 1) {   //已经遍历到最后一个数据，且与新数据不相等
                if (nextChess == 'white') {
                    newChess.style.background = "white"
                    nextChess = 'black'
                    symbol.style.background = 'black' //改变标志位
                } else {
                    newChess.style.background = "black"
                    nextChess = 'white'
                    symbol.style.background = 'white'
                }
                // console.log(newChess.style.left,newChess.style.top)
                console.log(e.target.offsetLeft)
                dataStoreX.push(newChess.style.left)
                dataStoreY.push(newChess.style.top)
                document.body.appendChild(newChess)  //下棋，插入元素
                break;
            }
        }
    } else {
        newChess.style.background = "white"
        nextChess = 'black'
        symbol.style.background = 'black' //改变标志位
        dataStoreX.push(newChess.style.left)
        dataStoreY.push(newChess.style.top)
        document.body.appendChild(newChess)
    }

})
