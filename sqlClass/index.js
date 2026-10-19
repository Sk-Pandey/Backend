// ==========================================
// 1. IMPORTING REQUIRED MODULES / PACKAGES
// ==========================================
const { faker } = require("@faker-js/faker"); // Library to generate fake/mock user data
const mysql = require("mysql2"); // MySQL client library to interact with the database
const express = require("express"); // Web framework for building HTTP servers and routes
const path = require("path"); // Utility for working with file and directory paths
const app = express(); // Initialize Express application instance
const methodOverride = require("method-override"); // Middleware to support HTTP verbs like PATCH or DELETE in HTML forms

// ==========================================
// 2. MIDDLEWARE & VIEW ENGINE CONFIGURATION
// ==========================================
// Serve static assets (CSS, images, JS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Enable method override via query parameter "_method" (e.g., ?_method=PATCH)
app.use(methodOverride("_method"));

// Parse URL-encoded form data submitted via POST requests
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Define directory path where EJS templates/views are located
app.set("views", path.join(__dirname, "/views"));

// ==========================================
// 3. DATABASE CONNECTION SETUP
// ==========================================
// Create connection parameters for local MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sk_app",
  password: "sql@123",
});

// Bulk insert SQL query template (prepared statement placeholder)
let q = "Insert into user(id,username,email,password) values ?";

// Helper function: Generates an array containing random user attributes
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// ==========================================
// 4. ROUTE HANDLERS
// ==========================================

// --- Home Route: Displays total count of users ---
// Fetches the total number of records from the database and renders home.ejs
app.get("/", (req, res) => {
  let q = `Select count(*) from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch {
    console.log(err);
    res.send("Some errpor in db");
  }
});

// --- Show All Users Route: Displays user listing ---
// Queries all users (id, username, email) and renders users.ejs
app.get("/user", (req, res) => {
  let q = `Select id,username,email from user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("users.ejs", { users });
    });
  } catch {
    console.log(err);
    res.send("Some errpor in db");
  }
});

// create new user

app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = faker.string.uuid();
  let q = `INSERT INTO user values(
  ?,?,?,?
  )`;
  connection.query(q, [id, username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).render("error.ejs");
    }
    res.redirect("/user");
  });
});

// --- Edit Route: Displays edit form for a specific user ---
// Retrieves a single user record by ID from route parameters and renders edit.ejs
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `Select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);
      res.render("edit.ejs", { user });
    });
  } catch {
    console.log(err);
    res.render("error.ejs");
  }
});

// --- Update Route: Verifies password and updates username in DB ---
// Handles PATCH requests sent by form submission to update the username
app.patch("/user/:id", (req, res) => {
  let { id } = req.params; // User ID from URL
  let { password: formPass, username: newUser } = req.body; // Form input values

  // Step 1: Fetch user record to verify password
  let q = `Select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);

      // Verify whether the entered password matches the stored password
      if (user.password != formPass) {
        res.render("worng-password.ejs");
      } else {
        // Step 2: If password matches, perform the UPDATE query in database
        let updateQuery = `UPDATE user
SET username = '${newUser}'
WHERE id = '${id}';`;
        try {
          connection.query(updateQuery, (err, result) => {
            console.log(result);
            res.redirect("/user"); // Redirect back to users list on success
          });
        } catch {
          console.log(err);
          res.render("error.ejs");
        }
      }
    });
  } catch {
    console.log(err);
    res.render("error.ejs");
  }
});

// Delete Routes:

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `Select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);
      res.render("delete.ejs", { user });
    });
  } catch {
    console.log(err);
    res.render("error.ejs");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `select password from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (password != user.password) {
        res.render("worng-password.ejs");
      } else {
        let finalQuery = `DELETE FROM user
WHERE id = '${id}';`;
        try {
          connection.query(finalQuery, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/user");
          });
        } catch {
          console.log(err);
          res.render("error.ejs");
        }
      }
    });
  } catch {
    console.log(err);
    res.render("error.ejs");
  }
});

// ==========================================
// 5. START SERVER
// ==========================================
// Listen on port 3000 for incoming connections
app.listen("3000", () => {
  console.log("Server is listening at http://localhost:3000/user");
});

/* 
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch {
  console.log(err);
}

// to stop connection after query completed

connection.end();

*/
