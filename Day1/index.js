import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/Shashikant", (req, res) => {
  res.send("Hello Shashikant Pandey");
});
app.get("/login", (req, res) => {
  res.send(`
    <form>
      <input type="text" placeholder="Enter your name" />
      <input type="password" placeholder="Enter Password" />
      <button type="submit">Login</button>
    </form>
  `);
});
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


