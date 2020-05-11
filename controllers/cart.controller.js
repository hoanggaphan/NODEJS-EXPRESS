const Session = require("../models/session.model");

module.exports.addToCart = async (req, res) => {
  const productId = req.params.id;
  const sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/products");
    return;
  }

  // update cart
  let session = await Session.findById(sessionId);
  let cart = { ...session.cart }; // copy lại để tránh bị tham chiếu

  if (cart[productId]) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  await Session.findByIdAndUpdate(sessionId, { cart });

  res.redirect("/products");
};
