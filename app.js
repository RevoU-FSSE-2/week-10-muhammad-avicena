const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const connectMongoDb = require("./src/middleware/dbConfig");
require("dotenv").config();

const app = express();

// Import router
const indexRoutes = require("./src/routes/indexRoutes");
const userRoutes = require("./src/routes/userRoutes");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// App Router
app.use("/", indexRoutes);
app.use("/api/v1/users", userRoutes);

// App listeners
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Running on http://localhost:" + PORT);
});

// MongoDB connection
async function connectDatabase() {
  try {
    await connectMongoDb();
    console.log("Succesfully connected to MongoDB");
  } catch (error) {
    console.error("Error connected to database:", error);
  }
}
connectDatabase();

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
