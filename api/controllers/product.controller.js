const Product = require("./../../models/product.model");

module.exports.index = async (req, res) => {
  res.locals.title = "Products";

  const products = await Product.find();
  res.json(products);
};
