const express = require("express");
const shortid = require("shortid");

const db = require("../db");

const router = express.Router();

router.get("/", (req, res) =>
  res.render("users/index", { users: db.get("users").value() })
);

router.get("/search", (req, res) => {
  const q = req.query.q;
  const matchedUses = db
    .get("users")
    .value()
    .filter(
      (user) =>
        user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1
    );
  res.render("users/index", { users: matchedUses, q });
});

router.get("/create", (req, res) => {
  res.render("users/create");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  res.render("users/view", { user });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

module.exports = router;