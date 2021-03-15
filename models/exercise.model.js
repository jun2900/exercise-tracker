const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
