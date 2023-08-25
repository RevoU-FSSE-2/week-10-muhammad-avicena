const express = require("express");
const http = require("http");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const connectMongoDb = require("./src/middleware/config/dbConfig");
const {
  userAuthentication,
  adminAuthorization,
} = require("./src/middleware/authMiddleware");
require("dotenv").config();
const yaml = require("yaml");
const fs = require("fs");

const app = express();

// Import router
const indexRoutes = require("./src/routes/indexRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const transferRoutes = require("./src/routes/transferRoutes");
const historyRoutes = require("./src/routes/historyRoutes");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// APi Documentation
const apiDocs = "api-docs.yaml";
const readApiFile = fs.readFileSync(apiDocs, "utf8");
const swaggerDocs = yaml.parse(readApiFile);

// App Router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", indexRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", adminAuthorization, userRoutes);
app.use("/api/v1/transfers", userAuthentication, transferRoutes);
app.use("/api/v1/histories", adminAuthorization, historyRoutes);

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
