function People(name){
    this.name=name;
    this.say()
}

People.prototype.say=function(){
    console.log(this.name)
}

var xiaoming=new People('xiaoming')


//增加行为均放在原型链上,返回一个新的引用