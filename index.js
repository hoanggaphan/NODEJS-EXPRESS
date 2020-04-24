const express = require("express");

const app = express();
const port = 3000;
const users = [
  { id: 1, name: "Kula" },
  { id: 2, name: "K'" },
];

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index", { name: "Nameless" }));
app.get("/users", (req, res) => res.render("users/index", { users }));

app.get("/users/search", (req, res) => {
  const q = req.query.q;
  const matchedUses = users.filter(
    (user) => user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1
  );
  res.render("users/index", { users: matchedUses, q });
});

app.listen(3000, () => console.log("App listening on port " + port));
