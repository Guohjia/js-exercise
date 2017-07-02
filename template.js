var tpl="<p>Hello,my name is <%name%>,I \'m <%age%> years old</p>"
var data={name:'ghj',age:20}

function TemplateEngine(tpl,data){
    var reg=/<%([^%>]+)?%>/g  //匹配以<%开头，%>结尾的字符
    while(match=reg.exec(tpl)){  //使用while语句匹配所有以<%开头，%>结尾的字符
    tpl=tpl.replace(match[0],data[match[1]])
    }
    return tpl
}

var result=TemplateEngine(tpl,data)
console.log(result)  
//<p>Hello,my name is ghj,I'm 20 years old</p>


