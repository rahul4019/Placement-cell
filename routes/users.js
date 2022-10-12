const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get(
  "/profile",
  passport.checkAuthentication,
  usersController.profile
);

router.get("/", usersController.signIn);
router.get("/sign-up", usersController.signUp);

router.post("/create", usersController.create);

// use passport as middleware to authenticate
router.post(
  "/Dashboard",
  passport.authenticate("local", { failureRedirect: "/" }),
  usersController.createSession
);

module.exports = router;
