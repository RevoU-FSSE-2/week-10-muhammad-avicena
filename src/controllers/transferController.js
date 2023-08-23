const TransferDao = require("../dao/transferDao");
const connectMongoDB = require("../middleware/config/dbConfig");
const TransferService = require("../services/transferService");

async function getAllTransfer(req, res) {
  try {
    const db = await connectMongoDB();
    const transferDao = new TransferDao(db);
    const transferService = new TransferService(transferDao);
    const result = await transferService.findAllTransfer();

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "List of transfer",
        data: result.transfer,
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
  getAllTransfer,
};
