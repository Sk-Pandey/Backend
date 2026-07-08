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
app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Programmer's Diet",
      joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
    },
    {
      id: 2,
      title: "JavaScript Confusion",
      joke: "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    },
    {
      id: 3,
      title: "Debugging",
      joke: "Debugging is like being the detective in a crime movie where you are also the murderer.",
    },
    {
      id: 4,
      title: "Computer Sleep",
      joke: "Why did the computer go to sleep? Because it had too many tabs open.",
    },
    {
      id: 5,
      title: "Wi-Fi Love",
      joke: "My Wi-Fi and I have a strong connection... until someone starts downloading movies.",
    },
    {
      id: 6,
      title: "Coding",
      joke: "I told my computer I needed a break, and now it won't stop sending me KitKat ads.",
    },
    {
      id: 7,
      title: "Password",
      joke: "My password is 'incorrect'. So whenever I forget it, the computer reminds me, 'Your password is incorrect.'",
    },
    {
      id: 8,
      title: "Keyboard",
      joke: "Why did the keyboard break up with the mouse? Because it felt like it was being clicked with someone else.",
    },
    {
      id: 9,
      title: "Bug Fix",
      joke: "99 little bugs in the code, 99 little bugs. Take one down, patch it around... 127 little bugs in the code.",
    },
    {
      id: 10,
      title: "Frontend vs Backend",
      joke: "Frontend says, 'It works on my browser.' Backend replies, 'It works on my server.'",
    },
  ];
  res.send(jokes);
});

app.listen(port, () => {
  console.log(`server is listenning at http://localhost:${port}`);
});
