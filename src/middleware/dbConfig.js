const { MongoClient } = require("mongodb");

// Database server
async function mongoDbProd(req, res, next) {
  try {
    const client = await new MongoClient(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@avicena-dev.ft7wwp4.mongodb.net/${process.env.DATABASE_USERNAME}?retryWrites=true&w=majority`
    ).connect();
    const db = client.db(process.env.DATABASE_NAME);
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Database local
async function mongoDbDev(req, res, next) {
  try {
    const client = await new MongoClient(`mongodb://127.0.0.1:27017/`, {
      useUnifiedTopology: true,
    }).connect();
    const db = client.db("revou-w10-lokal");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

const connectMongoDb = async () => {
  // Change database connection to local or server
  const db = await mongoDbDev();
  return db;
};

module.exports = connectMongoDb;
