const express = require("express");
const {
  getAllTransfer,
  createTransfer,
  getTransferById,
  updateTransferStatus,
} = require("../controllers/transferController");
const { approverAuthorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllTransfer);
router.post("/", createTransfer);
router.get("/:id", getTransferById);
router.patch("/:id", approverAuthorization, updateTransferStatus);

module.exports = router;
