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
