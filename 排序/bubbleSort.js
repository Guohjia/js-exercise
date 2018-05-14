//冒泡 时间复杂度  //o(n平方)
function bubbleSort(arr) {
    var i, j;
    for (var i = 0; i < arr.length - 1; i++) {  //轮数,每一轮确定一个在最后所排的数字,最多n-1轮就可以确定所有数字
        for (var j = 0; j < arr.length - 1 - i; j++) {   //length-1次代表每一轮只要比较length-1次,i代表每一轮在最大处确定位置的个数,无需再比较了
            if (arr[j] > arr[j + 1]) {
                var k = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = k;
            }
        }
    }
    return arr
}