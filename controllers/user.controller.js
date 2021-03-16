const User = require("../models/user.model");

exports.create_new_user = (req, res) => {
  const user = new User({
    username: req.body.username,
  });

  user.save((err, result) => {
    res.send(result);
  });
};

exports.get_all_users = (req, res) => {
  User.find((err, result) => {
    res.send(result);
  });
};
