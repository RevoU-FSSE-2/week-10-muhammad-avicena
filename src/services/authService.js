const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../middleware/jwtConfig");

class AuthService {
  constructor(authDao) {
    this.authDao = authDao;
  }

  async loginUser(username, password) {
    try {
      const user = await this.authDao.loginUser({ username, password });
      if (!user) {
        return { success: false, message: "User not found" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { username: user.username, id: user._id, role: user.role },
          JWT_SIGN
        );
        return { success: true, token: token };
      } else {
        return {
          success: false,
          message: "Incorrect username or password. Please try again !",
        };
      }
    } catch (error) {
      console.log(error.message);
      return { success: false, message: "Internal Server Error" };
    }
  }
}

module.exports = AuthService;