const UserDao = require("../dao/userDao");
const connectMongoDB = require("../middleware/dbConfig");
const UserService = require('../services/userService'); 

async function getAllUsers(req, res) {
  try {
    const db = await connectMongoDB(); 
    const userDao = new UserDao(db);
    const userService = new UserService(userDao);
    const result = await userService.getAllUsers();

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "List of users",
        data: result.users,
      });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


module.exports = {
  getAllUsers
};
