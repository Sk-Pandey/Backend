const express = require("express");
const app = express();


// this part if for Post request me body me a rhe data ko transalate krne ke liye urlencoded se ya json se 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome");
});

// GET REQUEST
app.get("/register", (req, res) => {
  const { name, password } = req.query;
  res.send(`Standard Get Response, Welcome ${name}`);
});

// POST REQUEST
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.send("Standard Post Response " + username);
});


const port = 3000;

// Server Starting
app.listen(port, () => {
  console.log(`Server Listening at http://localhost:3000/`);
});
