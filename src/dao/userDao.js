const { format } = require("date-fns");

class UserDao {
  constructor(db) {
    this.db = db;
  }

  async findAllUsers() {
    return this.db
      .collection("user")
      .find({ is_deleted: { $exists: false } })
      .toArray();
  }

  async createUser({ username, password, role }) {
    const createdDate = new Date();
    const formatDate = format(createdDate, "dd-MM-yyyy");

    const userData = {
      username,
      password,
      role,
      formatDate,
    };

    try {
      const isUserTaken = await this.db
        .collection("user")
        .findOne({ username });
      if (isUserTaken) {
        throw new Error("Error : Username already exists");
      }
      const result = await this.db.collection("user").insertOne(userData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserDao;
