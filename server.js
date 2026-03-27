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

 app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require("bcrypt");

  console.log("REGISTER:", req.body);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.json({ success: false, message: "DB error" });

    if (result.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      db.query(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        [email, hash],
        (err) => {
          if (err) return res.json({ success: false, message: "Insert error" });

          res.json({ success: true, message: "Signup success" });
        }
      );
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require("bcrypt");

  console.log("LOGIN:", req.body);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.json({ success: false, message: "DB error" });

    if (result.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    bcrypt.compare(password, result[0].password, (err, match) => {
      if (match) {
        res.json({ success: true, message: "Login success" });
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