'use strcit';

class Person{
  constructor(name){
    this.name = name;
  }
  greeting(){
    console.log('hello', this.name);
  }
}

module.exports = Person;
