const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "You are successfully connected to the Utrip Clone API" });
});

require("./app/routes/destination.routes.js")(app);
require("./app/routes/item.routes.js")(app);

// set port, listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
