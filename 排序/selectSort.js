//选择排序  //o(n平方)  //注意是在i后面的一个元素开始比较,所以var j=i+1
//时间复杂度与冒泡相同  冒泡是每一轮确定一个最大的 选择是每一轮确定一个最小的;
function select(arr) {
    // var i, j
    for (var i = 0; i < arr.length - 1; i++) { //外层循环一次确定一个,一共进行length-1轮
        var min = i;
        for (var j = i + 1; j < arr.length; j++) {  //每一轮都找到一个最小数,每一轮比较的次数是length-1-已经在前面确定的数字的个数,就是i
            if (arr[j] < arr[min]) {
                min = j; //记录最小的位置
            }
        }
        if (min !== i) {
            var k = arr[i]
            arr[i] = arr[min]; //对应位置做一个交换
            arr[min] = k;
        }
    }
    return arr
}