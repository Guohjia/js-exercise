var People=function(name,age){
    this.name=name;
    this.age=age;
}
People.prototype.sayName=function(){
    console.log(this.name)
}

var Student=function(name,age,score){
    People.call(this,name,age) //动态绑定this，传入参数，添加属性
    this.score=score;
}

Student.prototype=create(People.prototype); //自己原有的继承

//这个create函数可以用Student.prototype=Object.create(People.prototype)
function create(parentObj){
    function fn(){}
    F.prototype=parentObj
    return new fn() //原型继承
};

Student.prototype.sayScore=function(){
    console.log(this.score)
}

var xiaoMing=new Student('xiaoMing',20,100)

//核心:继承原型，并且与自己的原型混合

