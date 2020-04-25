const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const shortid = require("shortid");

const db = low(adapter);

const port = 3000;

db.defaults({ users: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index", { name: "Hoàng" }));
app.get("/users", (req, res) =>
  res.render("users/index", { users: db.get("users").value() })
);

app.get("/users/search", (req, res) => {
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

app.get("/users/create", (req, res) => {
  res.render("users/create");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.get("users").find({ id }).value();
  res.render("users/view", { user });
});

app.post("/users/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

app.listen(3000, () => console.log("App listening on port " + port));
