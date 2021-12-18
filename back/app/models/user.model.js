const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    organ: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    brws: [
        {
            id: String,
            isbn: String,
            title: String,
            author: String,
            publisher: String,
            pubdate: String,
            description: String,
            brwtime: Date
        }
    ],
  })
);

module.exports = User;
