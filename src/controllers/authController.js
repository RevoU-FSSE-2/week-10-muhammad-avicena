const AuthDao = require("../dao/authDao");
const connectMongoDB = require("../middleware/dbConfig");
const AuthService = require("../services/authService");

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const db = await connectMongoDB();
    const authDao = new AuthDao(db);
    const authService = new AuthService(authDao);
    const result = await authService.loginUser(username, password);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: { token: result.token },
      });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function registerUser(req, res) {
    const { username, password, role } = req.body;
  
    if (username && password && role) {
      const db = await connectMongoDB(); 
      const userDao = new AuthDao(db);
      const userService = new AuthService(userDao);
      const result = await userService.registerUser(username, password, role);
  
      if (result.success) {
        res.status(200).json({
          success: true,
          message: "Successfully created a user",
          data: { _id: result._id },
        });
      } else {
        res.status(400).json(result);
      }
    } else {
      res.status(400).json({ success: false, message: "Invalid input data" });
    }
  }

module.exports = {
  loginUser,
  registerUser
};
