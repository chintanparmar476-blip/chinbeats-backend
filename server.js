const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username,email,password) VALUES (?,?,?)",
    [username, email, hashed],
    (err) => {
      if (err) return res.json({ message: "User exists" });
      res.json({ message: "Registered successfully" });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) {
  return res.json({ success: false, message: "User not found" });
}

const user = result[0];
const match = await bcrypt.compare(password, user.password);

if (match) {
  res.json({ success: true, message: "Login successful", user });
} else {
  res.json({ success: false, message: "Wrong password" });
}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});