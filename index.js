require("./config/database").connect();
const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
  name:'placement-cell',
  // TODO change the secret before deployment in production mode
  secret: 'mySecret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100000)
  }
}))

// use express router
app.use("/", require("./routes"));

app.use(passport.initialize());
app.use(passport.session())

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`server is running on port: ${port}`);
});
