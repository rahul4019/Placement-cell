const User = require("../models/user");

module.exports.profile = function (req, res) {
  // console.log("user: ", req.params);
  // User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: req.user,
    });
  // });
};

// render the Sign In page
module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "Placement cell | Sign In",
  });
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "Placement cell | Sign Up",
  });
};

// get Sign Up data
module.exports.create = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // if password doesn't match
    if (password != confirm_password) {
      return res.redirect("back");
    }

    // check if user already exist
    User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log("Error in finding user in signing up");
        return;
      }

      if (!user) {
        await User.create(
          {
            email,
            password,
            username,
          },
          (err, user) => {
            if (err) {
              console.log(err, "Error in creating user in signing up");
            }
            return res.redirect("/");
          }
        );
      } else {
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  console.log("logged in successfully");
  return res.render("dashboard", {
    title: "Placement cell | Dashboard",
  });
};
