const express = require("express");
const {
  getAllTransfer,
  createTransfer,
  getTransferById
} = require("../controllers/transferController");
const { adminAuthorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", adminAuthorization, getAllTransfer);
router.post("/", createTransfer);
router.get("/:id", getTransferById);

module.exports = router;
