const express = require("express");
const router = express.Router();

console.log("router reloaded");

router.use("/", require("./users"));
router.use("/student", require("./students"));
router.use("/interview", require("./interviews"));

module.exports = router;
