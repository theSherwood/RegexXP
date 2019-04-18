const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "challenges"
  },
  regex: {
    type: String
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
  },
  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }
    }
  ]
});

module.exports = Solution = mongoose.model("solutions", SolutionSchema);
