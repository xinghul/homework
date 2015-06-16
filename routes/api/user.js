+function(undefined) {
  "use strict";

  var mongoose = require("mongoose")
  ,   passport = require("passport");

  var User     = mongoose.model("User")
  ,   ObjectId = mongoose.Types.ObjectId;

  var UserApi = {

    create: function(req, res, next) {
      var newUser = new User(req.body);

      // do a check here
      newUser.save(function(err) {
        if (err) {
          var errObj = {};

          if (err.errors["local.username"]) {
            errObj.usernameError = err.errors["local.username"].message;
          }

          if (err.errors["local.email"]) {
            errObj.emailError = err.errors["local.email"].message;
          }

          return res.status(400).json(errObj);
        }

        req.logIn(newUser, function(err) {
          if (err) {
            return next(err);
          }

          return res.json(newUser.infoLocal);
        });
      });
    },

    get: function(req, res, next) {
      var userId = req.params.userId;

      User.findById(ObjectId(userId), function(err, user) {
        if (err) {
          return next(err);
        }
        if (user) {
          res.json(user.infoLocal);
        } else {
          res.status(404).send("USER NOT FOUND")
        }
      });
    },

    getAll: function(req, res, next) {
      User.find({}, {}, function(err, users) {
        if (err) {
          return next(err);
        } else {
          var result = [];
          for (var i in users) {
            result.push(users[i].infoLocal);
          }

          res.json(result);
        }
      });
    }

  };

  module.exports = UserApi;

}();
