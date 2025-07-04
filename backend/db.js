const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ultraaiDB"
});

db.connect(err => {
    if (err) {
        console.log(err);
    }
    console.log("🚀 MySQL database connected");
});

module.exports = db;
