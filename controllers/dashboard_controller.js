const Student = require("../models/student");
const Interview = require("../models/interview")

module.exports.dashboard = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let students = await Student.find({});
      let interviews = await Interview.find({});

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
    return;
  }
};
