const { name } = require("ejs");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Server started Listening at http://localhost:${port}/ig/cats`);
});
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.send("Hi am Home Route");
});
app.get("/user", (req, res) => {
  res.render("user");
});

app.get("/rolldice", (req, res) => {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  res.render("rollDice", { diceValue });
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  let Userdata = require("./data.json");
  let data = Userdata[username];
  if (data) {
    res.render("instagram", { data });
  } else {
    res.send("Data is unavailable righ now");
  }
});
