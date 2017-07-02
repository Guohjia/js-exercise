var TemplateEngine = function (tpl, data) {
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,//对存在的控制语句进行判断，存在就直接作为脚本一部分执行，不插入数组当中,否则将报错
        code = 'var r=[];\n',
        cursor = 0;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :  //this.name与this.profile.age要被当作js，不是字符串,双引号无需转义
            (code += line!=''? 'r.push("' + line.replace(/"/g, '\\"') + '");\n':'')  //对双引号进行转义,如果line为空， r.push("")就不用push了，升级后此次push就没有了
    }
    while (match = re.exec(tpl)) {  //正则找到匹配文本，返回一个数组
        add(tpl.slice(cursor, match.index)); //对template进行分割，从开始分割到匹配位置
        add(match[1], true);  //传入匹配符里的结果，判断匹配符里面的内容为js
        cursor = match.index + match[0].length;  //标记检测结束的位置
    }
    add(tpl.substr(cursor, tpl.length - cursor));  //扫尾，push尾巴：'years old.</p>'
    code += 'return r.join("");'; // <--  数组转化为字符串,return the result;
    console.log(code)

    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
    //new Function之后会直接调用:即去掉正则所匹配的内容,不带引号的内容都将被执行(执行var r r.push this.name等代码);apply绑定this为传入的data，那么this.name与this.profile.age就可以获得data中相对应的值

}

//template逻辑更加复杂
var template = 
'My skills:' + 
'<%if(this.showSkills) {%>' +
    '<%for(var index in this.skills) {%>' + 
    '<a href="#"><%this.skills[index]%></a>' +
    '<%}%>' +
'<%} else {%>' +
    '<p>none</p>' +
'<%}%>';
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: true
}));
//My skills:<a href="#">js</a><a href="#">html</a><a href="#">css</a>
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"],
    showSkills: false
}));
//My skills:<p>none</p>

