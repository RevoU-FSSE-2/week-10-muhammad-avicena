const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../middleware/config/jwtConfig");

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

  async registerUser(username, password, role) {
    try {
      if (username.trim() === "") {
        return {
          success: false,
          message: "Failed to register. Username cannot be blank",
        };
      }

      const allowedRoles = ["admin", "maker", "approver"];
      if (!allowedRoles.includes(role)) {
        return {
          success: false,
          message: "Failed to register. Invalid role specified",
        };
      }

      if (password.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.authDao.registerUser({
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
      if (error.message === "Username already exists") {
        return {
          success: false,
          message: "Failed to register. Username already exists",
        };
      }
      return { success: false, message: "Internal Server Error" };
    }
  }
}

module.exports = AuthService;
