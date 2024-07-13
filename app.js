require("dotenv").config({ path: `.env` });
require("./connection/mysql2");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(router);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
