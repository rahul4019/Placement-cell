const Student = require("../models/student");

// render add student page
module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }

  return res.redirect("/");
};

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
