class AuthDao {
  constructor(db) {
    this.db = db;
  }

  async loginUser({ username }) {
    try {
      const user = await this.db.collection("user").findOne({ username });
      if (!user) {
        return new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

module.exports = AuthDao;
