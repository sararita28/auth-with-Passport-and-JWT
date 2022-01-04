// require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtStrategry = require("./strategies/jwt");

//create express app
const app = express();

const port = process.env.port || 3000;

passport.use(jwtStrategry);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/login", (req, res) => {
  let { email, password } = req.body; // This would normally be done using a database
  if (email === "youremail@gmail.com") {
    if (password === "yourpassword") {
      //this would usually be done using bcrypt
      const opts = {};
      opts.expiresIn = 120; // token expires in 2min
      const secret = "SECRET_KEY"; // this would usually be stored in process.env.secret
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send("This is a protected Route");
  }
);

app.listen(port);
