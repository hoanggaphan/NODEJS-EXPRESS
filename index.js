// req.query
const express = require("express");
const bodyParser = require('body-parser')

const usersRoute = require('./routes/users.route');

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 

app.use(express.static('public'));
// Routes
app.get("/", (req, res) => res.render("index", { name: "Hoàng" }));

app.use("/users", usersRoute)

app.listen(3000, () => console.log("App listening on port " + port));
