class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUsers() {
    try {
      const users = await this.userDao.findAllUsers();
      return { success: true, users: users };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
  }
}

module.exports = UserService;
