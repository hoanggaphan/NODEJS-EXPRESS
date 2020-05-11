const mongoose = require("mongoose");

const Session = require("../models/session.model");

module.exports = async (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    const sessionId = new mongoose.Types.ObjectId();

    res.cookie("sessionId", sessionId, {
      signed: true,
    });

    const session = new Session({ _id: sessionId });
    await session.save();

    next();
    return; // không return nó sẽ chạy tiêp
  }

  // Total of the cart
  const session = await Session.findById(sessionId);
  let sum = 0;
  for (const property in session.cart) {
    sum += session.cart[property];
  }
  res.locals.cart = sum;

  next();
};
