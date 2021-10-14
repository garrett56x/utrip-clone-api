const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: "utrip-clone.cwhakh4nyh3m.us-west-2.rds.amazonaws.com",
    user: "garrett",
    password: "Vangar#5656",
    database: "utrip-clone",
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database");
});

module.exports = connection;
