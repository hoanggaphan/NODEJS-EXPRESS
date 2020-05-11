const User = require("./../models/user.model");

module.exports.index = async (req, res) => {
  res.locals.title = "Users";

  const users = await User.find();
  res.render("users/index", { users });
};

module.exports.get = async (req, res) => {
  res.locals.title = "Detail user";

  const id = req.params.id;
  const user = await User.findById(id);
  res.render("users/view", { user });
};

module.exports.search = async (req, res) => {
  res.locals.title = "User search result";

  const q = req.query.q;
  const users = await User.find({ name: { $regex: q } });
  res.render("users/index", { users, q });
};

module.exports.create = (req, res) => {
  res.locals.title = "Create new user";
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    avatar: req.file.path.split("\\").slice(1).join("\\"),
  });

  await user.save();
  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await User.findByIdAndDelete(id);
  res.redirect("/users");
};
