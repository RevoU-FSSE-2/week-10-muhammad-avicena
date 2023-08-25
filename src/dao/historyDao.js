const { format } = require("date-fns");
const { ObjectId } = require("mongodb");
class UserDao {
  constructor(db) {
    this.db = db;
  }

  async findHistory({ startDate, endDate, status }) {
    const startDateFormat = format(new Date(startDate), "yyyy-MM-dd");
    const endDateFormat = format(new Date(endDate), "yyyy-MM-dd");

    const query = {
      isDeleted: { $exists: false },
      createdDate: {
        $gte: startDateFormat,
        $lte: endDateFormat,
      },
      status: { $in: status },
    };

    return this.db.collection("transfer").find(query).toArray();
  }

  async historySoftDelete({ id }) {
    try {
        const objectId = new ObjectId(id);
        const historyToUpdate = await this.db
          .collection("transfer")
          .findOne({ _id: objectId });

      if (!historyToUpdate) {
        throw new Error("History not found");
      }

      if (
        historyToUpdate.status === "approve" ||
        historyToUpdate.status === "reject"
      ) {
        throw new Error(
          "Cannot delete history with status 'approve' or 'reject'"
        );
      }

      const history = await this.db
        .collection("transfer")
        .findOneAndUpdate({ _id: objectId }, { $set: { isDeleted: true } });

      return history.value;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

module.exports = UserDao;
