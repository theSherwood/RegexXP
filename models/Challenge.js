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
  targettext: {
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
  },
  solutions: [
    {
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
    }
  ],
  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }
    }
  ]
});

module.exports = Challenge = mongoose.model("challenges", ChallengeSchema);