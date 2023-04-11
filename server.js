const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const route = require("./server/routes/router");
const connectDB = require("./server/database/connection");
const bodyParser = require("body-parser");

// process the port from environment variables
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 5000;

// set up the view engine/template engine
app.set("view engine", "pug");
//Optional
// app.set("views", path.resolve(__dirname, "views"));

// set up middlewares
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load router
app.use("/", route);

const cb = () => {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

connectDB(cb);
