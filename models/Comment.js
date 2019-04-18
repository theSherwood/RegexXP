const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: "challenges"
  },
  solution: {
    type: Schema.Types.ObjectId,
    ref: "solutions"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  handle: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
