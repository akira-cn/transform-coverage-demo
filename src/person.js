'use strcit';

class Person{
  constructor(name){
    this.name = name;
  }
  greeting(){
    let name = this.name;
    return `hello ${name}`;
  }
}

module.exports = Person;
