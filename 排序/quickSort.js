//快速排序  时间复杂度:O(nlog2n)  空间复杂度: O(log2n)
//版本一:
var quickSort = function (arr) {
    if (arr.length <= 1) { return arr; }  //递归出口
    var pivotIndex = Math.floor(arr.length / 2); //选择一个排序的基准
    var pivot = arr[pivotIndex];   //找出基准值=>必须有基准值,不能同arr[pivot]代替
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if(i!== pivotIndex){
            if (arr[i] > pivot) {
                right.push(arr[i]);
            } else {
                left.push(arr[i]);
            }
        }
    }
    return quickSort(left).concat([pivot],quickSort(right));
}

//版本二:
var quickSort = function (arr, p, r) {
    var partition = function(arr, p, r) {
        var x = arr[r]; //以最后一个元素为主元
        var i = p -1;  //大于主元和小于主元的分界线,也就是刚开始都在大于主元的位置
        for(var j = p;j<r;j++){  //循环数组
            if(arr[j] <= x){ //如果循环到的元素小于主元
                i++; //分界线往前移动
                [arr[i],arr[j]] = [arr[j],arr[i]];//分界线上的元素和循环到的元素互换 
                //综上可以看出分界线永远在循环到的元素的前面
            }
        }
        [arr[i+1],arr[r]] = [arr[r],arr[i+1]];
        return i+1;
    }
    if(p<r) {
        var q = partition(arr,p,r);
        quickSort(arr, p,q-1);//对分界线左边，即小于主元的部分进行递归
        quickSort(arr, q + 1,r);//对分界线右边，即大于主元的部分进行递归
    }
}

var a = [];
for(var i=0;i<20;i++){
    a.push(parseInt(Math.random()*20))
}
console.log(a)
quickSort(a,0,a.length-1)
console.log(a)