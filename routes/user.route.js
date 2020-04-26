const express = require("express");

const controllers = require("../controllers/user.controller");
const validate = require('../validate/user.validate');

const router = express.Router();

router.get("/", controllers.index);

router.get('/cookie', (req, res, next) => {
  res.cookie('session-id', 123);
  res.send("Demo Cookie");
})

router.get("/search", controllers.search);

router.get("/create", controllers.create);

router.get("/:id", controllers.get);

router.post("/create", validate.postCreate, controllers.postCreate);

module.exports = router;