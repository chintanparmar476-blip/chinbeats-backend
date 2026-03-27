const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "gondola.proxy.rlwy.net",
  user: "root",
  password: "ZZGsZfsDqGaxcZkXbUriDfpfzPHuaumn",
  database: "railway",
  port: 11774
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

module.exports = db;

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

module.exports = db;