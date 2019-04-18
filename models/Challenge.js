const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  highlight: {
    type: String,
    required: true
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

module.exports = Challenge = mongoose.model("challenges", ChallengeSchema);
