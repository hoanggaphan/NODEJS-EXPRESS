const shortid = require("shortid");
const db = require("./../db");

module.exports = (req, res, next) => {
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true,
    });
    db.get("sessions")
      .push({
        id: sessionId,
      })
      .write();

    next();
  }

  res.locals.cart = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart")
    .reduce((sum, value, key) => sum + value, 0)
    .value();

  next();
};
