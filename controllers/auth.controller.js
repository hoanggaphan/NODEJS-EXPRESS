const db = require("../db");
const md5 = require('md5');

module.exports.get = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

module.exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = db.get("users").find({ email }).value();

  if (!user) {
    res.render("auth/login", { title: "Login", errors: ["User does not exist!"], values: req.body });
    return;
  }

  const hashedPassword = md5(password);
  if (user.password !== hashedPassword) {
    res.render("auth/login", { title: "Login", errors: ["Wrong password!"], values: req.body });
    return;
  }

  res.cookie('userId', user.id, { signed: true });
  res.redirect("/users");
};
