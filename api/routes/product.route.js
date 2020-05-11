const express = require("express");

const router = express.Router();
const controllers = require("../controllers/product.controller");

router.get("/", controllers.index);

router.get("/:id", controllers.view);

// router.put("/:id", controllers.update);

router.patch("/:id", controllers.update);

router.post("/", controllers.create);

router.delete("/:id", controllers.delete)

module.exports = router;
