const { MongoClient } = require("mongodb");

async function connectMongoDb() {
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

module.exports = connectMongoDb;
