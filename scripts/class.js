function person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log('Hi my name is ' + this.name);
  }
}

class person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi = () => {
    console.log('Hi my name is ' + this.name);
  }
}

const Bob = new person('Bob', 12);
const Chris = new person2('Chris', 24);

Chris.sayHi();

console.log(Chris);