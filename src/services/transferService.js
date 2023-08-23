class TransferService {
  constructor(transferDao) {
    this.transferDao = transferDao;
  }

  async findAllTransfer() {
    try {
      const transfer = await this.transferDao.findAllTransfer();
      return { success: true, transfer: transfer };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message};
    }
  }

  async createTransfer({ bank, amount, toUser, desc }) {
    try {
      if (typeof bank !== "string" || bank.trim() === "") {
        return {
          success: false,
          message:
            "Failed to create transfer. Bank should be a non-empty string",
        };
      }

      if (
        typeof amount !== "number" ||
        amount < 10000 ||
        amount.trim() === ""
      ) {
        return {
          success: false,
          message:
            "Failed to create transfer. Amount should be a number & more than Rp. 10.000",
        };
      }

      if (typeof toUser !== "string" || toUser.trim() === "") {
        return {
          success: false,
          message:
            "Failed to create transfer. ToUser should be a non-empty string",
        };
      }

      if (typeof desc !== "string" || desc.trim() === "") {
        return {
          success: false,
          message:
            "Failed to create transfer. Desc should be a non-empty string",
        };
      }
      const user = await this.transferDao.createTransfer({
        bank,
        amount,
        role,
        toUser,
        desc,
      });
      return { success: true, _id: user.insertedId };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Internal Server Error" };
    }
  }
}

module.exports = TransferService;
