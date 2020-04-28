const db = require("../db");

module.exports.index = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 8;

  //   const start = (page - 1) * perPage;
  //   const end = page * perPage;

  const drop = (page - 1) * perPage;
  const pageAmount = Math.ceil(db.get("products").value().length / perPage);

  res.render("products/index", {
    // products: db.get("products").value().slice(start, end),
    title: "Products",
    products: db.get("products").drop(drop).take(perPage).value(),
    pageAmount,
    page,
  });
};
