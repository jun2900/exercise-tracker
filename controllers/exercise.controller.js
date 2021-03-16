const async = require("async");

const Exercise = require("../models/exercise.model");
const User = require("../models/user.model");

exports.add_exercise = (req, res) => {
  const now = new Date();
  const exercise = new Exercise({
    description: req.body.description,
    duration: req.body.duration,
    date: req.body.date ? req.body.date : now,
    user: {
      _id: req.body.userId,
    },
  });

  exercise.save((err, result) => {
    User.findById(result._id)
      .populate("user")
      .exec((err, result) => {
        res.send({
          _id: result.user._id,
          username: result.user.username,
          description: result.description,
          duration: result.duration,
          date: result.date.toDateString(),
        });
      });
  });
};

exports.log_exercise = (req, res) => {
  let limitting = parseInt(req.query.limit) || 0;

  async.parallel(
    {
      user: (callback) => {
        User.findById(req.query.userId).exec(callback);
      },
      exercises: (callback) => {
        let query = Exercise.find({ user: { _id: req.query.userId } });
        if (req.query.from && !req.query.to) {
          query.find({ date: { $gte: req.query.from } });
        } else if (!req.query.from && req.query.to) {
          query.find({ date: { $lte: req.query.to } });
        } else if (req.query.from && req.query.to) {
          query.find({ date: { $gte: req.query.from, $lte: req.query.to } });
        }
        query
          .select("description duration date -_id")
          .limit(limitting)
          .exec(callback);
      },
      ammountExercise: (callback) => {
        Exercise.countDocuments({ user: { _id: req.query.userId } }).exec(
          callback
        );
      },
    },
    (err, results) => {
      let log = results.exercises.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      });
      res.send({
        _id: results.user._id,
        username: results.user.username,
        count: results.ammountExercise,
        log: log,
      });
    }
  );
};
