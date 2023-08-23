class UserDao {
  constructor(db) {
    this.db = db;
  }

  async findAllUsers() {
    return this.db
      .collection("user")
      .find({ isDeleted: { $exists: false } })
      .toArray();
  }
}

module.exports = UserDao;
