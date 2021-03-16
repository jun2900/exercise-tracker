const User = require("../models/user.model");

exports.checkUsernameExist = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, result) => {
    if (result) {
      res.send("User already exist");
      return;
    }
    next();
  });
};
