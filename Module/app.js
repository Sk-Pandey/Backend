let greet = require("./greet");

let names = require("./peoples");
names.forEach((name) => {
  greet(name);
});
