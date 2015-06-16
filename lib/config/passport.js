+function(undefined) {
  "use strict";

  var mongoose = require("mongoose")
  ,   passport = require("passport");

  var LocalStrategy = require("passport-local").Strategy;

  var User = mongoose.model("User");

  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL ===================================================================
  // =========================================================================
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, function(email, password, done) {

    process.nextTick(function () {

      User.findOne({"local.email": email }, function(err, user) {
        if (err) {
          done(err);
        } else if (!user) {
          done(null, false, {
            "emailError": "Email is not registered."
          });
        } else if (!user.authenticate(password)) {
          done(null, false, {
            "passwordError": "Password is incorrect."
          });
        } else {
          done(null, user);
        }
      });
      
    });
  }));

}();
