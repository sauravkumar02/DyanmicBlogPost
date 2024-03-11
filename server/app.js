const express = require("express");
const cors = require('cors');
const app = express();
const server = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { urlencoded, json } = require("body-parser");
const blogRoute = require("./api/routes/blog");
const authRoute = require('./api/routes/auth')


mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.dcbw39u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose.connection.on("connected", () => {
  console.log("connected with db h");
});

mongoose.connection.on("error", (err) => {
  console.log("connected fail");
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/blog", blogRoute);
app.use("/auth",authRoute)
module.exports = app;
