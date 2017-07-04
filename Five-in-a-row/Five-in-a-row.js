

var border = document.querySelector('.border')
var nextChess='white'  //初始化接下来是哪方下棋
var symbol=document.querySelector('.turn')
border.addEventListener('click',function(e){
    var coordinateX=e.target.offsetLeft;
    var coordinateY=e.target.offsetTop;
    console.log(coordinateX)
    console.log(coordinateY)
    var newChess=document.createElement('div')
        newChess.className='chess'
        newChess.style.left=coordinateX-20+'px'  //减去格子一半的宽度，保证棋子在格子左上角顶点
        newChess.style.top=coordinateY-21+'px'   //减去格子一半的高度，保证棋子在格子左上角顶点
        //判断下棋顺序
        if(nextChess=='white') {
            newChess.style.background="white"
            nextChess='black'
            symbol.style.background='black' //改变标志位
        }else {
            newChess.style.background="black"
            nextChess='white'
            symbol.style.background='white'
        }
    document.body.appendChild(newChess)       //下棋，插入元素
})
