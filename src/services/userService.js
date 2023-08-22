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

}

module.exports = UserService;
