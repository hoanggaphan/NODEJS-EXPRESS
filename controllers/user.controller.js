const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.locals.title = "Users";
  res.render("users/index", { users: db.get("users").value() });
}

module.exports.search = (req, res) => {
  res.locals.title = "User search result";

  const q = req.query.q;
  const matchedUser = db
    .get("users")
    .value()
    .filter(
      (user) =>
        user.name.toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  res.render("users/index", { users: matchedUser, q });
};

module.exports.create = (req, res) => {
  res.locals.title = "Create new user";
  res.render("users/create");
};

module.exports.get = (req, res) => {
  res.locals.title = "Detail user";

  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  res.render("users/view", { user });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split("\\").slice(1).join("\\")

  db.get("users").push(req.body).write();
  res.redirect("/users");
};
