//方法一:indexof

Array.prototype.indexOf=Array.prototype.indexOf||function(item){ 
    for(var i=0;i<this.length;i++){
        if(this[i]===item){
            return i;  //item存在返回所对应的序号
        }else{
            return -1; //item不存在返回-1
        }
    }
    
}

function removeRepeat(arr){
    var reset=[] //去重后的新数组
    for(var i=0;i<arr.length;i++){
        if(reset.indexOf(arr[i])===-1){
            reset.push(arr[i])
        }
    }
    return reset;
}

 var a=[1,2,1,2,3]
var b=removeRepeat(a)
console.log(b)  //[1,2,3]

//indexof 的filter写法

b=a.filter(function(item,index,array){
     return array.indexOf(item)==index;
})
console.log(b) //[1,2,3]

//filter的es6写法
b=a.filter((item,index,array)=>{return array.indexOf(item)==index})

//方法二  sort,此方法在去重之后会破坏原来的数组值的顺序
Array.prototype.uniq=function(){
    if(!this.length||this.length===0){return this;}
    this.sort();// sort() 方法在适当的位置对数组的元素进行排序，并返回数组。
    console.log(this) //由[1,2,1,2,3]变为[1,1,2,2,3]
    var reset=[this[0]]  //先将第一个值放入新数组中
    for(var i=1;i<this.length;i++){
        if(this[i]!==this[i-1]) {  //如果item和前一个不一样,则push到新数组
            reset.push(this[i])
        }
    }
    return reset 
}
var  b=a.uniq();
console.log(b) //[1,2,3]