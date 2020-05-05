require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const csurf = require("csurf");

// setup route
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");

// setup middleware
const authMiddleWare = require("./middlewares/auth.middleware");
const sessionMiddleWare = require("./middlewares/session.middleware");

const csrfProtection = csurf({ cookie: true })

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleWare);

app.use("/static", express.static(path.join(__dirname, "/public")));

// Routes
app.get("/", (req, res) => {
  res.locals.title = "Home";
  res.render("index", { name: "Hoàng" });
});

app.use("/users", authMiddleWare.requireAuth, userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/transfer", csrfProtection, authMiddleWare.requireAuth, transferRoute);

app.listen(3000, () => console.log("App listening on port " + port));
