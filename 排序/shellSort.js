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