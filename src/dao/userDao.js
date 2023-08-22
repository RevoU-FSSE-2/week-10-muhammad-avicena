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
}

module.exports = UserDao;
