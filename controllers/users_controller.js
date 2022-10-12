const User = require("../models/user");

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
    profile_user: req.user,
  });
  // });
};

// render the Sign In page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("user_sign_in", {
    title: "Placement cell | Sign In",
  });
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
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
      req.flash("error", "Password and Confirm password are not same");
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
              req.flash("error", "Couldn't sign Up");
            }
            req.flash("success", "Account created!");
            return res.redirect("/");
          }
        );
      } else {
        req.flash("error", "Email already registed!");
        return res.redirect("back");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in successfully");
  return res.redirect("/dashboard");
};

module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    return res.redirect("/");
  });
};
