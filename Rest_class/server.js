const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

const port = 3000;

// For setting up path for public and views folder
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// data converstion from url encode  or json to redable
app.use(express.urlencoded({ extended: true }));

// Post  Data

let posts = [
  {
    id: uuidv4(),
    username: "Akshat",
    content: "Hey am new Here",
  },
  {
    id: uuidv4(),
    username: "Skpandeyyy",
    content: "You can connect with on LinkedIn Too.",
  },
  {
    id: uuidv4(),
    username: "Rajveer",
    content: "Whats up Guys",
  },
];

//Get all posts Route
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Add new Post form  route
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => id === p.id);

  console.log("ID from URL:", id);
  console.log("All posts:", posts);
  console.log("Found post:", post);

  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const post = posts.find((p) => id === p.id);

  post.content = content;

  res.redirect("/posts");
});

//
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
