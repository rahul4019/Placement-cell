const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interviews_controller");

router.get("/add-interview", interviewController.addInterview);

router.post("/create", interviewController.create);

module.exports = router;
