const Transfer = require("../models/transfer.model");

module.exports.create = (req, res) => {
  res.render("transfer/create", { csrfToken: req.csrfToken() });
};

module.exports.postCreate = (req, res) => {
  const data = new Transfer({
    accountId: req.body.accountId,
    amount: parseInt(req.body.amount),
    userId: req.signedCookies.userId,
  });

  data.save().then(() => res.redirect("/transfer/create"));
};
