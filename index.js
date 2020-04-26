// req.query
const express = require("express");
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded 
app.use(cookieParser())

app.use(express.static('public'));


// Routes
app.get("/", (req, res) => res.render("index", { name: "Hoàng" }));

app.use("/users", userRoute)

app.listen(3000, () => console.log("App listening on port " + port));
