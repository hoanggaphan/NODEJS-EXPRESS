const Product = require("./../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports.view = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  res.json(product);
};

module.exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

module.exports.update = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  res.json(product);
};

module.exports.delete = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);
  res.json(product);
};
