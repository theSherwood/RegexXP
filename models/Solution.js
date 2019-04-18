const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "challenges"
  },
  handle: {
    type: String
  },
  regex: {
    type: String,
    required: true
  },
  length: {
    type: Number
  },
  description: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Solution = mongoose.model("solutions", SolutionSchema);
