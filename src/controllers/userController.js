const UserDao = require("../dao/userDao");
const connectMongoDB = require("../middleware/dbConfig");

async function getAllUser(req, res) {
  try {
    const db = await connectMongoDB();
    const userDao = new UserDao(db);
    const user = await userDao.findAllUsers();
    res
      .status(200)
      .json({ succes: true, message: "list of users", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createUser(req, res) {
  const { username, password, role } = req.body;

  if (username && password && role) {
    try {
      const db = await connectMongoDB();
      const userDao = new UserDao(db);
      if (password.length >= 8 && /^[a-zA-Z0-9]+$/.test(password)) {
        const user = await userDao.createUser({ username, password, role });
        res.status(200).json({
          success: true,
          message: "Successfully created a user",
          data: { _id: user.insertedId },
        });
      } else {
        res.status(400).json({
          success: false,
          message:
            "Password should be at least 8 characters and contain alphabet numbers",
        });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid input data" });
  }
}

module.exports = {
  getAllUser,
  createUser,
};
