# js-exercise
一些个人日常的javascript 练习，不断更新ing.....

### 模板字符串归纳:
* 思路： 首先，匹配<% %>，将里面的内容进行替换；
         然后因为有对象的复杂引用:this.属性.属性，采用数组push,对里面的js的代码单独解析；
         最后因为有for等复杂语句，加入新的正则进行判断，为这些复杂语句则不进行数组push（因为这些js代码不像（this.属性）有确切的值，直接导入数组就会报错），所以直接加入脚本执行;
         
* 要点：逻辑思维，正则的运用，数组api和字符串api的熟练运用

### 五子棋小游戏
[预览][https://guohjia.github.io/js-exercise/Five-in-a-row/Five-in-a-row.html]
