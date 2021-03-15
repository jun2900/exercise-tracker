const controller = require("../controllers/exercise.controller");

module.exports = (app) => {
  //POST add exercise
  app.post("/api/exercise/add", controller.add_exercise);

  //GET exercise log
  app.get("/api/exercise/log", controller.log_exercise);
};
