const controller = require("../controllers/user.controller");
const middleware = require("../middleware/verifyUser");

module.exports = (app) => {
  //Add new user
  app.post(
    "/api/exercise/new-user",
    middleware.checkUsernameExist,
    controller.create_new_user
  );

  //Get all users
  app.get("/api/exercise/users", controller.get_all_users);
};
