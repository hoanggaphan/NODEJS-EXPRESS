const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) =>
  res.render("users/index", { title: "Users", users: db.get("users").value() });

module.exports.search = (req, res) => {
  const q = req.query.q;
  const matchedUser = db
    .get("users")
    .value()
    .filter(
      (user) =>
        user.name.toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  res.render("users/index", { title: "User search result", users: matchedUser, q });
};

module.exports.create = (req, res) => {
  res.render("users/create", { title: "Create new user" });
};

module.exports.get = (req, res) => {
  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  res.render("users/view", { title: "Detail user", user });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split("\\").slice(1).join("\\")

  db.get("users").push(req.body).write();
  res.redirect("/users");
};
