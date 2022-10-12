module.exports.dashboard = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("dashboard", {
      title: "Dashboard",
    });
  } else {
    return res.redirect("/");
  }
};
