const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const bcrypt = require("bcrypt");

  // 1️⃣ Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 2️⃣ Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.json({ success: false, message: "Error hashing password" });
      }

      // 3️⃣ Insert new user
      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ success: false, message: "Database error" });
          }

          res.json({ success: true, message: "Signup successful" });
        }
      );
    });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = result[0];

    const bcrypt = require("bcrypt");

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Wrong password" });
      }
    });
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});