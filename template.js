var TemplateEngine = function (tpl, data) {
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,//对存在的控制语句进行判断，存在就直接作为脚本一部分执行，不插入数组当中,否则将报错
        code = 'var r=[];\n',
        cursor = 0;
    var add = function (line, js) {
        js ? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :  //this.name与this.profile.age要被当作js，不是字符串,双引号无需转义
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n'  //对双引号进行转义
    }
    while (match = re.exec(tpl)) {  //正则找到匹配文本，返回一个数组
        add(tpl.slice(cursor, match.index)); //对tpl进行分割，从开始分割到匹配位置
        add(match[1], true);  //传入匹配符里的结果，判断匹配符里面的内容为js
        cursor = match.index + match[0].length;  //标记检测结束的位置
    }
    add(tpl.substr(cursor, tpl.length - cursor));  //扫尾，push尾巴：'years old.</p>'
    code += 'return r.join("");'; // <--  数组转化为字符串,return the result;
    console.log(code)
    //code输出如下:
    //var r=[];
    // r.push("My skills:");
    // for (var index in this.skills) {   //for语句直接放入脚本执行
    //     r.push("<a href=\"#\">");
    //     r.push(this.skills[index]);
    //     r.push("</a>");
    // }
    // r.push("");
    // return r.join("");

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
    //new Function之后会直接调用:即去掉正则所匹配的内容,不带引号的内容都将被执行(执行var r r.push this.name等代码);apply绑定this为传入的data，那么this.name与this.profile.age就可以获得data中相对应的值

}


var template =
    'My skills:' +
    '<%for(var index in this.skills) {%>' +
    '<a href="#"><%this.skills[index]%></a>' +
    '<%}%>';
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"]
}));
//My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>



