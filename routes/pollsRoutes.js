const express = require("express");
const { createPoll, joinPoll, rejoinPoll } = require("../controllers/pollsController");
const authMiddleware = require("../middleware/authentication");
const createValidationMiddleware = require("../middleware/createValidation");
const router = express.Router();

router.post("/create", createValidationMiddleware(), createPoll);
router.post("/join", joinPoll);
router.post("/rejoin", authMiddleware, rejoinPoll);

module.exports = router;
