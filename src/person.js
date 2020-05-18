class Person{
    constructor(name='bill',age="28"){
        this.name = name;
        this.age = age;
    }
    toJson(){
        return JSON.stringify({
            name:this.name,
            age:this.age,
        })
    }
}
module.exports=Person;