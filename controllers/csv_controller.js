const Student = require("../models/student");
const fs = require("fs");
const path = require("path");

module.exports.downloadCSVReport = async function (req, res) {
  try {
    const allStudents = await Student.find({});
    let report =
      "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = "";

    for (let student of allStudents) {
      studentData1 =
        student.id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.placement_status +
        "," +
        student.dsa_score +
        "," +
        student.webdev_score +
        "," +
        student.react_score;
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          let studentData2 = "";
          studentData2 +=
            "," +
            interview.date.toString() +
            "," +
            interview.company +
            "," +
            interview.result;
          report += "\n" + studentData1 + studentData2;
        }
      }
    }

    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirct("back");
        }
        req.flash("success", "successfully downloaded CSV report!");
        return res.download("uploads/studentsReport.csv");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
