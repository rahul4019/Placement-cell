const express = require("express");
const router = express.Router();


console.log("router reloaded");

router.use("/", require("./users"))

module.exports = router;
