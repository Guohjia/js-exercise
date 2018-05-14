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