const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const app = express();

// Import routes
const indexRoutes = require("./src/routes/indexRoutes");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// Router
app.use("/", indexRoutes);

// App listeners
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Running on http://localhost:" + PORT);
});

// Error handlers
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
