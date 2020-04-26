const shortid = require("shortid");

const db = require("../db");

module.exports.index = (req, res) =>
  res.render("users/index", { users: db.get("users").value() });

module.exports.search = (req, res) => {
  const q = req.query.q;
  const matchedUses = db
    .get("users")
    .value()
    .filter(
      (user) =>
        user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1
    );
  res.render("users/index", { users: matchedUses, q });
};

module.exports.create = (req, res) => {
  console.log(req.cookies);
  res.render("users/create");
};

module.exports.get = (req, res) => {
  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  res.render("users/view", { user });
};

module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
};
