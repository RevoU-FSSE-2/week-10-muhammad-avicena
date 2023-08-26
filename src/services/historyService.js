class HistoryService {
  constructor(historyDao) {
    this.historyDao = historyDao;
  }

  async findHistory({ startDate, endDate, status }) {
    try {
      if (startDate > endDate) {
        return {
          success: false,
          message:
            "Invalid date time. endDate should be greater than startDate",
        };
      }

      const allowedStatusValues = ["pending", "approve", "reject"];
      const validStatus = Array.isArray(status)
        ? status.filter((value) => allowedStatusValues.includes(value))
        : [];

      if (validStatus.length < 1) {
        return {
          success: false,
          message: "Invalid input data. You should input more than one status",
        };
      }

      const historyData = await this.historyDao.findHistory({
        startDate,
        endDate,
        status,
      });

      if (historyData.length === 0) {
        return {
          success: false,
          message:
            "No history transfer list found for the specified date range",
        };
      }

      return { success: true, message: historyData };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.message };
    }
  }

  async historySoftDelete({ id }) {
    try {
      const transferData = await this.historyDao.historySoftDelete({ id });
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
}

module.exports = HistoryService;
