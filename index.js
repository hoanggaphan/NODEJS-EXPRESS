const express = require("express");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index", { name: "Nameless" }));
app.get("/users", (req, res) =>
  res.render("users/index", {
    usersList: [
      { id: 1, name: "Kula" },
      { id: 2, name: "K'" },
    ],
  })
);

app.listen(3000, () => console.log("App listening on port " + port));
