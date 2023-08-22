const bcrypt = require("bcrypt");

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUsers() {
    try {
      const users = await this.userDao.findAllUsers();
      return { success: true, users };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: "Internal Server Error" };
    }
  }

  async createUser(username, password, role) {
    try {
      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userDao.createUser({
          username,
          password: hashedPassword,
          role,
        });
        return { success: true, _id: user.insertedId };
      } else {
        return {
          success: false,
          message:
            "Password should be at least 8 characters and contain alphanumeric characters",
        };
      }
    } catch (error) {
      console.log(error.message);
      return { success: false, message: "Internal Server Error" };
    }
  }
}

module.exports = UserService;
