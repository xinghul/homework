+function(undefined) {
  "use strict";

  var mongoose = require("mongoose")
  ,   passport = require("passport");

  var SessionApi = {

    get: function(req, res) {
      if (req.isAuthenticated()) {
        res.json(req.user.infoLocal);
      }
      res.send(401);
    },

    delete: function(req, res) {
      if (req.user) {
        req.logout();
        res.sendStatus(200);
      } else {
        res.status(400).send("Not logged in");
      }
    },

    create: function(req, res, next) {
      passport.authenticate("local", function(err, user, info) {
        var error = err || info;

        if (error) {
          return res.status(400).json(error);
        }

        req.logIn(user, function (err) {
          if (err) {
            return res.status(400).send(err);
          }

          res.json(req.user.infoLocal);
        });
      })(req, res, next);
    }

  };

  module.exports = SessionApi;
}();
