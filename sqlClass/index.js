// ==========================================
// 1. IMPORTING REQUIRED MODULES / PACKAGES
// ==========================================
const { faker } = require("@faker-js/faker"); // Library to generate fake/mock user data (UUIDs, names, emails, passwords)
const mysql = require("mysql2"); // MySQL client library to interact with the database
const express = require("express"); // Web framework for building HTTP servers and handling routes
const path = require("path"); // Node.js utility for handling file and directory paths
const app = express(); // Initialize Express application instance
const methodOverride = require("method-override"); // Middleware to support HTTP verbs like PATCH and DELETE via HTML forms

// ==========================================
// 2. MIDDLEWARE & VIEW ENGINE CONFIGURATION
// ==========================================
// Serve static assets (compiled Tailwind CSS output.css, images, JS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Enable method override using the query parameter "_method" (e.g., ?_method=PATCH or ?_method=DELETE)
app.use(methodOverride("_method"));

// Parse incoming URL-encoded form data from POST requests into req.body
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Define directory path where EJS view templates are stored
app.set("views", path.join(__dirname, "/views"));

// ==========================================
// 3. DATABASE CONNECTION SETUP
// ==========================================
// Establish connection credentials for the local MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sk_app",
  password: "sql@123",
});

// Bulk insert SQL query template (prepared statement placeholder)
let q = "Insert into user(id,username,email,password) values ?";

// Helper function: Generates an array containing mock user credentials
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

// --- Home Route: Displays user statistics ---
// Fetches the total count of registered users and renders home.ejs
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

// --- Show All Users Route: Displays user list table / cards ---
// Retrieves all active users (id, username, email) and renders users.ejs
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

// --- Create User Form Route: Displays user registration form ---
// Renders new.ejs containing the form to input username, email, and password
app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

// --- Create User Action Route: Inserts new user into MySQL ---
// Generates a unique UUID and inserts new user record into the DB, then redirects to /user
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
// Handles PATCH requests sent via form submission (?_method=PATCH)
app.patch("/user/:id", (req, res) => {
  let { id } = req.params; // User ID from URL
  let { password: formPass, username: newUser } = req.body; // Form input values

  // Step 1: Query the user record to authenticate the action
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
        // Step 2: If authentication passes, update username in database
        let updateQuery = `UPDATE user
SET username = '${newUser}'
WHERE id = '${id}';`;
        try {
          connection.query(updateQuery, (err, result) => {
            console.log(result);
            res.redirect("/user"); // Redirect back to users table on success
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

// --- Delete Form Route: Displays confirmation page for deleting a user ---
// Retrieves user details by ID and renders delete.ejs asking for password confirmation
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

// --- Delete Action Route: Verifies password and removes user from DB ---
// Handles DELETE requests sent via form submission (?_method=DELETE)
app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;

  // Step 1: Fetch stored password for this specific user ID
  let q = `select password from user where id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      // Password validation check
      if (password != user.password) {
        res.render("worng-password.ejs");
      } else {
        // Step 2: If password matches, permanently delete the user record
        let finalQuery = `DELETE FROM user
WHERE id = '${id}';`;
        try {
          connection.query(finalQuery, (err, result) => {
            if (err) throw err;
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

// ==========================================
// 5. START SERVER
// ==========================================
// Listen on port 3000 for incoming HTTP requests
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
