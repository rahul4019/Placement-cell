const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.dashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      // populating all students with interviews
      let students = await Student.find({}).populate("interviews");

      // populating all interviews with students
      let interviews = await Interview.find({}).populate("students.student");

      return res.render("dashboard", {
        title: "Dashboard",
        all_students: students,
        all_interviews: interviews,
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
