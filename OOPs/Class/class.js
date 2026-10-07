class Student {
  constructor(roll, name) {
    ((this.name = name), (this.roll = roll));
  }
  isPresent() {
    console.log(`${this.name} is Present`);
  }
}

let s1 = new Student(1, "Sakcham");
let s2 = new Student(2, "Aradhya");
let s3 = new Student(3, "Samriddhi");

s3.isPresent();

// Inheritance

class Animal {
  constructor(name, age) {
    ((this.name = name), (this.age = age));
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }
}
class Cat extends Animal {
  constructor(name, age, size) {
    super(name, age);
    this.size = size;
  }
}

let dog1 = new Dog("trisy", 7, "black");
console.log(dog1);

dog1.eat();
