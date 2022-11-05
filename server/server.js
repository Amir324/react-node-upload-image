const cors = require("cors");
const express = require("express");
const app = express();
const diskdb = require("diskdb");
const database = diskdb.connect("../../", ["images"]);
module.exports = { db: database };

require("./src/cron.js");

global.__basedir = __dirname;

let port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var corsOptions = {
  origin: process.env.FRONT_END,
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
