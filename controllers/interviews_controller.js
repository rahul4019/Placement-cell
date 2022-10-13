const Interview = require("../models/interview");

module.exports.addInterview = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_interview", {
      title: "Schedule An Interview",
    });
  }

  return res.redirect("/");
};

module.exports.create = async (req, res) => {
  try {
    const { company, date } = req.body;

    await Interview.create(
      {
        company,
        date,
      },
      (err, Interview) => {
        if (err) {
          req.flash("error", "Couldn't add Interview!");
          return res.redirect("back");
        }
        req.flash("success", "Interview added!");
        return res.redirect("back");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
