const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  googleID: {
    type: String
  },
  githubId: {
    type: String
  },
  handle: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  comments: [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }
    }
  ],
  solutions: [
    {
      solution: {
        type: Schema.Types.ObjectId,
        ref: "solutions"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
module.exports = User = mongoose.model("users", UserSchema);
