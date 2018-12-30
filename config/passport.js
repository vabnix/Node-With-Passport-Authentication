const LocalStrategy = require("passport-local");
const mongoos = require("mongoose");
const bcrypt = require("bcryptjs");

// Getting the User modal
const User = require("../modal/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match User
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Email not register!!" });
          }
          //Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect!!" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
