const express = require("express");

const usersRoute = require('./routes/users.route');

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

app.get("/", (req, res) => res.render("index", { name: "Hoàng" }));

app.use("/users", usersRoute)

app.listen(3000, () => console.log("App listening on port " + port));
