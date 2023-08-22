const express = require("express");
const { getAllUser, createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUser);
router.post("/", createUser);

module.exports = router;
