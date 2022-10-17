const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students_controller");

router.post("/update/:id", studentsController.update);

router.get("/add-student", studentsController.addStudent);
router.get("/edit-student/:id", studentsController.editStudent);

router.post("/create", studentsController.create);
router.get("/destroy/:studentId", studentsController.destroy);

module.exports = router;
