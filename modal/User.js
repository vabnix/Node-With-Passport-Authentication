const mongoos = require("mongoose");

const UserSchema = new mongoos.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoos.model("User", UserSchema);

module.exports = User;
