require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const csrf = require("csurf");
const mongoose = require("mongoose");

// setup dbs mongodb with mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// setup route
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const transferRoute = require("./routes/transfer.route");

// setup api route
const apiProductRoute = require("./api/routes/product.route");

// setup middleware
const authMiddleWare = require("./middlewares/auth.middleware");
const sessionMiddleWare = require("./middlewares/session.middleware");

const csrfProtection = csrf({ cookie: true, signed: true });

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleWare);

app.use(express.static(path.join(__dirname, "/public")));

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

// Routes api
app.use("/api/products", apiProductRoute);

app.listen(3000, () => console.log("App listening on port " + port));
