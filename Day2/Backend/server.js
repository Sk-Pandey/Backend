import express from "express";
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Shashikant");
});
app.get("/sk", (req, res) => {
  const fetchData = async () => {
    const response = await fetch("https://api.github.com/users/Sk-Pandey");
    const data = await response.json();
    res.send(data);
  };
  fetchData();
});

app.listen(port, () => {
  console.log(`server is listenning at http://localhost:${port}`);
});
