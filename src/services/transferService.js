class TransferService {
  constructor(transferDao) {
    this.transferDao = transferDao;
  }

  async findAllTransfer() {
    try {
      const transferData = await this.transferDao.findAllTransfer();
      return { success: true, message: transferData };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
  }

  async getTransferById({ id }) {
    try {
      const transferData = await this.transferDao.getTransferById({ id });
      return { success: true, message: transferData };
    } catch (error) {
      console.log(error.message);
      if (
        error.message ===
        "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
      ) {
        return { success: false, message: "Transfer list not found" };
      }
      return { success: false, message: error.message };
    }
  }

  async updateTransferStatus({ id, status }) {
    try {
      const allowedStatus = ["pending", "approve", "reject"];
      if (!allowedStatus.includes(status)) {
        return {
          success: false,
          message: "Failed to update transfer. Invalid status specified",
        };
      }
      const transferData = await this.transferDao.updateTransferStatus({
        id,
        status,
      });
      return { success: true, message: transferData };
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
      ) {
        return { success: false, message: "Transfer list not found" };
      }
      return { success: false, message: error.message };
    }
  }

  async createTransfer({ bank, amount, toUser, desc }) {
    try {
      if (typeof bank !== "string" || bank === null) {
        return {
          success: false,
          message:
            "Failed to create transfer. Bank should be a non-empty string",
        };
      }

      if (typeof amount !== "number" || amount < 10000 || amount === null) {
        return {
          success: false,
          message:
            "Failed to create transfer. Amount should be a number & more than Rp. 10.000",
        };
      }

      if (typeof toUser !== "string" || toUser === null) {
        return {
          success: false,
          message:
            "Failed to create transfer. ToUser should be a non-empty string",
        };
      }

      if (typeof desc !== "string" || desc === null) {
        return {
          success: false,
          message:
            "Failed to create transfer. Desc should be a non-empty string",
        };
      }
      const transferData = await this.transferDao.createTransfer({
        bank,
        amount,
        toUser,
        desc,
      });
      return { success: true, message: transferData.insertedId };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Internal Server Error" };
    }
  }
}

module.exports = TransferService;
