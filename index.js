require("./config/database").connect();
const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`server is running on port: ${port}`);
});
