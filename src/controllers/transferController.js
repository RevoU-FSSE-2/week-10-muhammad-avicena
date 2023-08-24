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
        message: "List of all transfer",
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

async function getTransferById(req, res) {
  const { id } = req.params;
  try {
    const db = await connectMongoDB();
    const transferDao = new TransferDao(db);
    const transferService = new TransferService(transferDao);
    const result = await transferService.getTransferById({ id });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Transfer request found",
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

async function createTransfer(req, res) {
  const { bank, amount, toUser, desc } = req.body;
  try {
    const db = await connectMongoDB();
    const transferDao = new TransferDao(db);
    const transferService = new TransferService(transferDao);
    const result = await transferService.createTransfer({
      bank,
      amount,
      toUser,
      desc,
    });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully created a transfer",
        data: { _id: result.message },
      });
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateTransferStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const db = await connectMongoDB();
    const transferDao = new TransferDao(db);
    const transferService = new TransferService(transferDao);
    const result = await transferService.updateTransferStatus({
      id,
      status,
    });
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Successfully update a transfer",
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
  getAllTransfer,
  createTransfer,
  getTransferById,
  updateTransferStatus,
};
