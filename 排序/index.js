//时间复杂度:基本语句执行次数与数据个数n的函数关系

//冒泡 时间复杂度  //o(n平方)
function bubble(arr) {
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

// console.log(bubble([5, 4, 3, 2, 5, 6, 7, 10]))


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




//归并排序  O(nlog2n)  空间复杂度: O(n)
function merge(leftArr, rightArr) {
    var re = [];
    while (leftArr.length > 0 && rightArr.length > 0) { //不断获取最前面的元素,直到其中一个数组为空
        if (leftArr[0] < rightArr[0]) {
            re.push(leftArr.shift())
        } else {
            re.push(rightArr.shift())
        }
    }

    //两边数组长度不相等可以直接合并
    return re.concat(leftArr).concat(rightArr)
}

function mergeSort(arr) {
    if (arr.length === 1) { return arr; }
    var mid = Math.floor(arr.length / 2), leftArr = arr.slice(0, mid), rightArr = arr.slice(mid)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

//希尔排序  时间复杂度:O(n^1.3)   空间复杂度: O(1) 不稳定
function shellSort(arr){  
    var gap =Math.floor(arr.length/2); //设置增量取值
    while(gap>=1){  
        for(var i =gap;i<arr.length;i++){  
            var j,temp=arr[i];  
            for(j=i-gap;j>=0&&temp<arr[j];j=j-gap){
                arr[j+gap]=arr[j];  
            }  
            arr[j+gap]=temp;  
        }  
        console.log("gap="+gap);  
        console.log(arr);  
        gap=Math.floor(gap/2);   //增量取值减半
    }  
}

//快速排序  时间复杂度:O(nlog2n)  空间复杂度: O(log2n)
var quickSort = function (arr) {
    if (arr.length <= 1) { return arr; }  //递归出口
    var pivotIndex = Math.floor(arr.length / 2); //选择一个排序的基准
    var pivot = arr.splice(pivotIndex, 1)[0];   //找出基准值=>必须有基准值,不能同arr[pivot]代替
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};

//插入排序
function insertionSort(myArray) {

    var len = myArray.length,     // 数组的长度
        value,                      // 当前比较的值
        i,                          // 未排序部分的当前位置
        j;                          // 已排序部分的当前位置

    for (i = 0; i < len; i++) {

        // 储存当前位置的值,就是待排元素的值
        value = myArray[i];

        /*
         * 当已排序部分的当前元素大于value，
         * 再将前一位与value比较
         */
        for (j = i - 1; j > -1 && myArray[j] > value; j--) {  //如果已排序的部分大于当前值
            myArray[j + 1] = myArray[j]; //就将当前元素向后移一位
        }

        myArray[j + 1] = value;  //直到找到已排序部分的值小于等于当前值,已排序部分后面的位置就归当前值了，不然就是当前元素后移
    }

    return myArray;
}
console.log(insertionSort([5, 4, 3, 2, 5, 6, 7, 10]))
//空间复杂度 o(1) //时间复杂度 o(n平方)  //稳定



/**
 * 二分查找:在排好序的数组查找一个数,取中间值,如果目标数小于中间值,则在中间值的左侧查找;反之则是右侧;
 * 时间复杂度:O(log2n)
 * 空间复杂度:O(1)
 * 稳定性:稳定
 */

var Arr = [3, 5, 6, 7, 9, 12, 15];
function binary(find, arr, low, high) {
    if (low <= high) {
        if (arr[low] == find) {
            return low;
        }
        if (arr[high] == find) {
            return high;
        }
        var mid = Math.ceil((high + low) / 2);
        if (arr[mid] == find) {
            return mid;
        } else if (arr[mid] > find) {
            return binary(find, arr, low, mid - 1);
        } else {
            return binary(find, arr, mid + 1, high);
        }
    }
    return -1;
}
binary(15, Arr, 0, Arr.length - 1);