const express = require("express");
const { getHistory, softDeleteHistory } = require("../controllers/historyController");
const router = express.Router();

router.get("/", getHistory);
router.delete("/:id", softDeleteHistory);

module.exports = router;
