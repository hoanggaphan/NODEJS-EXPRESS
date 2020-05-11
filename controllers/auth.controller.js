const User = require("../models/user.model");
const md5 = require("md5");

module.exports.get = (req, res) => {
  res.locals.title = "login";
  
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  res.locals.title = "login";

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist!"],
      values: req.body,
    });
    return;
  }

  const hashedPassword = md5(password);
  if (user.password !== hashedPassword) {
    res.render("auth/login", {
      errors: ["Wrong password!"],
      values: req.body,
    });
    return;
  }

  res.cookie("userId", user._id, { signed: true });
  res.redirect("/users");
};
