const { format } = require("date-fns");
class AuthDao {
  constructor(db) {
    this.db = db;
  }

  async loginUser({ username }) {
    try {
      const user = await this.db.collection("user").findOne({ username });
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async registerUser({ username, password, role }) {
    const newDate = new Date();
    const createdDate = format(newDate, "yyyy-MM-dd");

    const userData = {
      username,
      password,
      role,
      createdDate,
    };

    try {
      const isUserTaken = await this.db
        .collection("user")
        .findOne({ username });
      if (isUserTaken) {
        throw new Error("Username already exists");
      }
      const result = await this.db.collection("user").insertOne(userData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthDao;
