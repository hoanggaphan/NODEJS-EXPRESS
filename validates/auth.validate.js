const db = require("../db");

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = db.get("users").find({ email }).value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist!"],
      values: req.body,
    });
    return;
  }

  if (user.password !== password) {
    res.render("auth/login", { errors: ["Wrong password!"], values: req.body });
    return;
  }

  next();
};
