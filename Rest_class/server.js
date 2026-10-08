const express = require("express");

// Creating an Express application.
// 'app' will be used to create routes, use middleware,
// configure the server, and start the server.
const app = express();

// uuid is used to generate a unique ID for every post.
// v4 generates a random UUID such as:
// "550e8400-e29b-41d4-a716-446655440000"
const { v4: uuidv4 } = require("uuid");

// method-override allows us to use HTTP methods like
// PATCH, PUT, and DELETE from HTML forms.
//
// Normal HTML forms only support GET and POST.
// So we use method-override to convert a POST request
// into PATCH/PUT/DELETE when we send:
// ?_method=PATCH
const methodOverride = require("method-override");

// Tell Express to use method-override.
// "_method" is the name of the query parameter
// that will contain the method we actually want to use.
//
// Example:
// POST /posts/123?_method=PATCH
//
// method-override changes this into:
// PATCH /posts/123
app.use(methodOverride("_method"));

const port = 3000;

// --------------------------------------------------
// PATH + EJS + STATIC FILES SETUP
// --------------------------------------------------

// 'path' is Node.js's built-in module for working
// with file and folder paths.
const path = require("path");

// Tell Express that we are using EJS as our template engine.
//
// This allows us to create dynamic HTML pages using .ejs files.
//
// Example:
// res.render("index.ejs", { posts });
//
// EJS allows us to use JavaScript data inside HTML.
app.set("view engine", "ejs");

// Tell Express where our EJS files are located.
//
// __dirname = the directory where this current JS file exists.
//
// So Express will look inside:
// current-folder/views
//
// for files such as:
// index.ejs
// new.ejs
// show.ejs
// edit.ejs
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" folder.
//
// Static files are files that don't need to be processed
// by Express before being sent to the browser.
//
// Examples:
// CSS
// JavaScript
// Images
//
// If public/output.css exists, we can access it as:
// /output.css
app.use(express.static(path.join(__dirname, "public")));

// --------------------------------------------------
// MIDDLEWARE FOR READING FORM DATA
// --------------------------------------------------

// HTML forms send their data in an encoded format.
//
// express.urlencoded() parses that incoming form data
// and converts it into a JavaScript object.
//
// Without this middleware:
//
// req.body
//
// would not contain the submitted form data.
//
// Example form:
//
// <input name="username">
// <textarea name="content">
//
// After submitting:
//
// req.body becomes:
//
// {
//     username: "...",
//     content: "..."
// }
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// TEMPORARY POST DATA
// --------------------------------------------------

// This is our temporary database.
//
// We are currently storing posts inside a JavaScript array.
//
// IMPORTANT:
// This data will disappear whenever the server restarts.
//
// Later, this array can be replaced with a real database
// such as MongoDB, MySQL, PostgreSQL, or Supabase.
let posts = [
  {
    id: uuidv4(),
    username: "Akshat",
    content:
      "Just started learning backend development with Node.js and Express. Excited to understand how everything works behind the scenes!",
  },
  {
    id: uuidv4(),
    username: "Shashikant",
    content:
      "Consistency is more important than motivation. Even one hour of focused coding every day can make a huge difference.",
  },
  {
    id: uuidv4(),
    username: "Rajveer",
    content:
      "Built my first full-stack project today! Still a lot to improve, but seeing everything work together feels amazing.",
  },
  {
    id: uuidv4(),
    username: "Priya",
    content:
      "Spent the whole day practicing JavaScript. Finally started feeling comfortable with array methods like map, filter, and reduce.",
  },
  {
    id: uuidv4(),
    username: "Aman",
    content:
      "Anyone else preparing for software development internships? Trying to balance DSA, projects, and learning new technologies.",
  },
  {
    id: uuidv4(),
    username: "Neha",
    content:
      "Small progress is still progress. Finished another set of coding problems today and learned a few new approaches.",
  },
  {
    id: uuidv4(),
    username: "Rohan",
    content:
      "Working on my portfolio website this week. Hoping to make it simple, clean, and focused on the projects I have actually built.",
  },
  {
    id: uuidv4(),
    username: "Sneha",
    content:
      "Finally understood how middleware works in Express. It seemed confusing at first, but everything makes much more sense now.",
  },
  {
    id: uuidv4(),
    username: "Vikash",
    content:
      "Today I learned why databases are so important in real-world applications. Now I want to practice designing better database schemas.",
  },
  {
    id: uuidv4(),
    username: "Ananya",
    content:
      "Learning something new every day. My current goal is to become comfortable enough with full-stack development to build projects without constantly following tutorials.",
  },
];

// --------------------------------------------------
// GET ALL POSTS
// --------------------------------------------------

// GET /posts
//
// This route runs when the browser requests:
// http://localhost:3000/posts
//
// req = request coming FROM the browser
// res = response we send BACK to the browser
app.get("/posts", (req, res) => {
  // Render the index.ejs file.
  //
  // We also send the 'posts' array to EJS.
  //
  // Inside index.ejs we can access it using:
  // posts
  //
  // Example:
  // <% posts.forEach(post => { ... }) %>
  res.render("index.ejs", { posts });
});

// --------------------------------------------------
// SHOW FORM FOR CREATING A NEW POST
// --------------------------------------------------

// GET /posts/new
//
// This route does NOT create a post.
//
// Its job is only to show the HTML form
// where the user can enter a new post.
app.get("/posts/new", (req, res) => {
  // Render the form page.
  res.render("new.ejs");
});

// --------------------------------------------------
// SHOW ONE PARTICULAR POST
// --------------------------------------------------

// GET /posts/:id
//
// ':id' is a dynamic route parameter.
//
// Example URL:
//
// /posts/12345
//
// Express will store:
// req.params.id = "12345"
//
// We use this ID to find the specific post
// that the user wants to view.
app.get("/posts/:id", (req, res) => {
  // Extract the id from req.params.
  //
  // This:
  // const { id } = req.params;
  //
  // is the shorter version of:
  // const id = req.params.id;
  const { id } = req.params;

  // Search the posts array for a post whose ID
  // matches the ID received from the URL.
  //
  // find() returns the matching post.
  //
  // If no post is found, it returns undefined.
  const post = posts.find((p) => id === p.id);

  // These console.log statements are useful while debugging.
  //
  // They let us see:
  // 1. Which ID came from the URL
  // 2. What posts currently exist
  // 3. Which post was found
  console.log("ID from URL:", id);

  console.log("All posts:", posts);

  console.log("Found post:", post);

  // Render show.ejs and send the selected post to it.
  //
  // Inside show.ejs we can access:
  // post.username
  // post.content
  // post.id
  res.render("show.ejs", { post });
});

// --------------------------------------------------
// SHOW EDIT FORM
// --------------------------------------------------

// GET /posts/:id/edit
//
// Example:
//
// /posts/12345/edit
//
// This route is responsible for showing
// the edit form for a particular post.
//
// IMPORTANT:
// This route does NOT update the post.
//
// It only finds the post and displays
// its existing content inside edit.ejs.
app.get("/posts/:id/edit", (req, res) => {
  // Get the ID from the URL.
  const { id } = req.params;

  // Find the post that has the same ID.
  //
  // The found post is then sent to edit.ejs.
  const post = posts.find((p) => id == p.id);

  // Render the edit page and provide the post data.
  //
  // edit.ejs can now use:
  //
  // post.id
  // post.username
  // post.content
  res.render("edit.ejs", { post });
});

// --------------------------------------------------
// UPDATE EXISTING POST
// --------------------------------------------------

// PATCH /posts/:id
//
// This route actually performs the EDIT/UPDATE operation.
//
// The HTML form itself sends a POST request because
// normal HTML forms don't directly support PATCH.
//
// method-override sees:
// ?_method=PATCH
//
// and converts the request into:
//
// PATCH /posts/:id
app.patch("/posts/:id", (req, res) => {
  // Get the post ID from the URL.
  //
  // Example:
  // /posts/abc123
  //
  // id = "abc123"
  const { id } = req.params;

  // Get the updated content from the submitted form.
  //
  // express.urlencoded() middleware is responsible
  // for making req.body available.
  //
  // Example:
  //
  // req.body = {
  //     content: "My updated content"
  // }
  const { content } = req.body;

  // Find the post that needs to be updated.
  const post = posts.find((p) => id === p.id);

  // Replace the old content with the new content.
  //
  // The rest of the post remains unchanged.
  //
  // username stays the same
  // id stays the same
  // content gets updated
  post.content = content;

  // After updating the post, send the user back
  // to the page containing all posts.
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  posts = posts.filter((p) => p != post);

  res.redirect("/posts");
});

// --------------------------------------------------
// CREATE A NEW POST
// --------------------------------------------------

// This route is currently commented out.
//
// When uncommented, it will handle the form submission
// from new.ejs.
//
// The flow will be:
//
// User fills form
//       ↓
// POST /posts
//       ↓
// Get username + content from req.body
//       ↓
// Generate unique ID
//       ↓
// Add new object to posts array
//       ↓
// Redirect to /posts
//
// --------------------------------------------------

app.post("/posts", (req, res) => {
  // Get the values submitted by the form.
  //
  // These names must match the "name" attributes
  // of the HTML form inputs.
  const { username, content } = req.body;

  // Generate a unique ID for the new post.
  const id = uuidv4();

  // Add the new post object to the posts array.
  posts.push({ id, username, content });

  // After creating the post, redirect the user
  // to the page showing all posts.
  res.redirect("/posts");
});

// --------------------------------------------------
// START SERVER
// --------------------------------------------------

// Start the Express server and listen for incoming
// HTTP requests on port 3000.
//
// After running the application, the server will be
// available at:
//
// http://localhost:3000/
app.listen(port, () => {
  // This message appears in the terminal when
  // the server successfully starts.
  console.log(`Server running at http://localhost:${port}/`);
});

/* 

CREATE
POST /posts
       ↓
Add post to posts[]


READ ALL
GET /posts
       ↓
Show all posts


READ ONE
GET /posts/:id
       ↓
Find one post using ID
       ↓
Show that post


SHOW EDIT FORM
GET /posts/:id/edit
       ↓
Find post
       ↓
Show existing data in edit form


UPDATE
PATCH /posts/:id
       ↓
Find post using ID
       ↓
Replace content
       ↓
Redirect to /posts

*/
