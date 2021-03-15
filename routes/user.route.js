const controller = require("../controllers/user.controller");

module.exports = (app) => {
  //Add new user
  app.post("/api/exercise/new-user", controller.create_new_user);

  //Get all users
  app.get("/api/exercise/users", controller.get_all_users);
};
