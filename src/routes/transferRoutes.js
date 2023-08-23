const express = require("express");
const { getAllTransfer } = require("../controllers/transferController");

const router = express.Router();

router.get("/", getAllTransfer);

module.exports = router;
