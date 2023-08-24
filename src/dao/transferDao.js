const { format } = require("date-fns");
const { ObjectId } = require("mongodb");

class TransferDao {
  constructor(db) {
    this.db = db;
  }

  async findAllTransfer() {
    return this.db
      .collection("transfer")
      .find({ isDeleted: { $exists: false } })
      .toArray();
  }

  async createTransfer({ bank, amount, toUser, desc }) {
    const newDate = new Date();
    const createdDate = format(newDate, "dd-MM-yyyy");
    const status = "pending";

    const transferData = {
      bank,
      amount,
      toUser,
      status,
      desc,
      createdDate,
    };

    try {
      const result = await this.db
        .collection("transfer")
        .insertOne(transferData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTransferById({ id }) {
    try {
      const objectId = new ObjectId(id);
      const transfer = await this.db
        .collection("transfer")
        .findOne({ _id: objectId });

      if (!transfer) {
        throw new Error(`Transfer not found`);
      }

      return transfer;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransferDao;