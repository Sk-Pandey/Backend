// Higher order function is a function which have
// 1. function as argument
// 2. return a function

// map filter reduce these are higher order function becuase they have a function as argument

// problem 1 : write a function that apply higher order function twice

function applyTwice(num, fn) {
  return fn(fn(num));
}

function addTwo(num) {
  return num + 2;
}
console.log("Problem 1 Output:");
console.log(applyTwice(12, addTwo));

// Problem 2: waf which return a function that multiply numbers

function mutiply(num) {
  return function multi(x) {
    return num * x;
  };
}

const mulfn = mutiply(10);
console.log("Problem 2 Output:");
console.log(mulfn(2));

// Problem 3: Impliment a function that filter an array using a function

function filter_array(arr, fn) {
  return arr.filter(fn);
}
console.log("Problem 3 Output:");

console.log(filter_array([1, 2, 3, 4, 5, 6, , 7, 8, 9], (num) => num % 2 == 0));

// Problem 4: Impliment a function that compose two function together

function campose(f, g) {
  return function (x) {
    return f(g(x));
  };
}

const double = (x) => x * 2;
const increament = (x) => x + 1;

const composeFn = campose(increament, double);

console.log("Problem 4 Output:");
console.log(composeFn(5));

// Problem 5: Create a function that only excute once ignore all all othercalls

function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

const logMessage = once((msg) => console.log(msg));
console.log("Problem 5 Output:");

logMessage("Hi Sir1");
logMessage("Hi Sir2");
logMessage("Hi Sir3");

//More better real world idea
function createTicket() {
  let used = false;

  return function (person) {
    if (!used) {
      used = true;
      console.log(person + " entered the event.");
    } else {
      console.log("❌ Ticket already used!");
    }
  };
}

const ticket = createTicket();

ticket("Shashikant");
ticket("Rahul");
ticket("Amit");
