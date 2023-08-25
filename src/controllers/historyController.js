const HistoryDao = require("../dao/historyDao");
const connectMongoDB = require("../middleware/config/dbConfig");
const HistoryService = require("../services/historyService");

async function getHistory(req, res) {
  const { startDate, endDate, status } = req.query;
  try {
    const db = await connectMongoDB();
    const historyDao = new HistoryDao(db);
    const historyService = new HistoryService(historyDao);
    const result = await historyService.findHistory({
      startDate,
      endDate,
      status,
    });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "List of all history",
        data: result.message,
      });
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function softDeleteHistory(req, res) {
  const { id } = req.params;
  try {
    const db = await connectMongoDB();
    const historyDao = new HistoryDao(db);
    const historyService = new HistoryService(historyDao);
    const result = await historyService.historySoftDelete({ id });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully deleted request transfer",
        data: result.message,
      });
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getHistory,
  softDeleteHistory,
};
