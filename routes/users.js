const express = require("express");
const passport = require("passport");
const router = express.Router();

const { downloadCSVReport } = require("../controllers/csv_controller");
const usersController = require("../controllers/users_controller");
const dashboardController = require("../controllers/dashboard_controller");

router.get("/profile", passport.checkAuthentication, usersController.profile);
router.post("/update", passport.checkAuthentication, usersController.update);

router.get("/", usersController.signIn);
router.get("/sign-up", usersController.signUp);
router.get("/dashboard", dashboardController.dashboard);

router.post("/create", usersController.create);

// use passport as middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

router.get("/download", downloadCSVReport);

module.exports = router;
