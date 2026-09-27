const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`<div>
      <ol>
        <li>
          <a href="http://localhost:3000/about">About</a>
        </li>
        <li>
          <a href="http://localhost:3000/contact">Contact</a>
        </li>
        <li>
          <a href="http://localhost:3000/user">User</a>
        </li>
        <li>
          <a href="http://localhost:3000/service">Service</a>
        </li>
      </ol>
    </div>`);
});
app.get("/:username", (req, res) => {
  const { username } = req.params;
  res.send(
    `Hi am ${username}! <br> <a href="http://localhost:3000/"> << Go Back to Home</a>`,
  );
});
app.get("/about", (req, res) => {
  res.send(
    `HI am on About <br> <a href="http://localhost:3000/"> << Go Back to Home</a>`,
  );
});
app.get("/contact", (req, res) => {
  res.send(
    `HI am on Contact <br> <a href="http://localhost:3000/"> << Go Back to Home</a>`,
  );
});
app.get("/service", (req, res) => {
  res.send(
    `HI am on Service <br> <a href="http://localhost:3000/"> << Go Back to Home</a>`,
  );
});

app.listen(PORT, () => {
  console.log("App is listening on PORT: ", PORT);
});
