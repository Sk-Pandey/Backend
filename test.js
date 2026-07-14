const fs = require("fs");
const filepath = "sk.text";

fs.writeFile(filepath, "My name is Shashikant Pandey", (err) => {
  if (err) {
    console.log(err.message);
  }
});
fs.appendFile(filepate, "\nkya hua mayank", (err) => {
  if (err) {
    console.log(err.message);
  }
});
