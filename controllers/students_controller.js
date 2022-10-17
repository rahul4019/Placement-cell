const Student = require("../models/student");
const Interview = require("../models/interview");

// render add student page
module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }

  return res.redirect("/");
};

// render edit student page
module.exports.editStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (req.isAuthenticated()) {
    return res.render("edit_student", {
      title: "Edit Student",
      student_details: student,
    });
  }

  return res.redirect("/");
};

// creation of new student
module.exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      batch,
      college,
      placement_status,
      dsa_score,
      react_score,
      webdev_score,
    } = req.body;

    // check if student already exist
    Student.findOne({ email }, async (err, student) => {
      if (err) {
        console.log("error in finding student");
        return;
      }

      if (!student) {
        await Student.create(
          {
            name,
            email,
            college,
            batch,
            dsa_score,
            react_score,
            webdev_score,
            placement_status,
          },
          (err, student) => {
            if (err) {
              req.flash("error", "Couldn't add student!");
              return res.redirect("back");
            }
            req.flash("success", "Student added!");
            return res.redirect("back");
          }
        );
      } else {
        req.flash("error", "Student already exist!");
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// Deletion of student
module.exports.destroy = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      req.flash("error", "Couldn't find student");
      return;
    }

    const interviewsOfStudent = student.interviews;

    // delete reference of student from companies in which this student is enrolled
    if (interviewsOfStudent.length > 0) {
      for (let interview of interviewsOfStudent) {
        await Interview.findOneAndUpdate(
          { company: interview.company },
          { $pull: { students: { student: studentId } } }
        );
      }
    }

    student.remove();
    req.flash("success", "Student deleted!");
    return res.redirect("back");
  } catch (err) {
    console.log("error", err);
    return;
  }
};

// update student details
module.exports.update = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const {
      name,
      college,
      batch,
      dsa_score,
      react_score,
      webdev_score,
      placement_status,
    } = req.body;

    if (!student) {
      req.flash("error", "Student does not exist!");
      return res.redirect("back");
    }

    student.name = name;
    student.college = college;
    student.batch = batch;
    student.dsa_score = dsa_score;
    student.react_score = react_score;
    student.webdev_score = webdev_score;
    student.placement_status = placement_status;

    student.save();
    req.flash("success", "Student updated!");
    return res.redirect("/dashboard");
  } catch (err) {
    req.flash("error", err);
    console.log(err);
    return res.redirect("back");
  }
};
