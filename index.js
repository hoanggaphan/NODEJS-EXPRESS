require("dotenv").config();

// req.query
const express = require("express");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");

const authMiddleware = require("./middlewares/auth.middleware");

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));

// Routes
app.get("/", (req, res) => res.render("index", { title: "Home", name: "Hoàng" }));

app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);

app.listen(3000, () => console.log("App listening on port " + port));
