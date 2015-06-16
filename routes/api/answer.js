+function(undefined) {
  "use strict";

  var mongoose = require("mongoose")
  ,   Promise  = require("bluebird");

  var ObjectId = mongoose.Types.ObjectId
  ,   Answer   = mongoose.model("Answer");

  var AnswerApi = {

    getAll: function() {
      var deferred = Promise.defer();

      Answer.find({}, {}, function(err, answers) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(answers);
        }
      });

      return deferred.promise;
    },

    create: function(rawAnswer) {
      rawAnswer = rawAnswer || {};
      var deferred = Promise.defer();

      console.log(rawAnswer);

      var answer = new Answer({
        assignment: ObjectId(rawAnswer.assignment),
        student: ObjectId(rawAnswer.student),
        content: rawAnswer.content,
        timestamp: rawAnswer.timestamp
      });

      answer.save(function (err, newAnswer, numberAffected) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(newAnswer);
        }
      });

      return deferred.promise;
    },

    delete: function(id) {
      var deferred = Promise.defer();

      if (!id) {
        return deferred.reject("Please specify the answer id.");
      }

      Answer.remove({_id: id}, function(err, deletedAnswer) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(deletedAnswer);
        }
      });

      return deferred.promise;
    }

  };

  module.exports = AnswerApi;

}();
