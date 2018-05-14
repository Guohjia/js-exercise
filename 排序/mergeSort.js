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