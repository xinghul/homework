+function(undefined) {
  "use strict";

  var mongoose = require("mongoose")
  ,   Promise  = require("bluebird");

  var ObjectId   = mongoose.Types.ObjectId
  ,   Assignment = mongoose.model("Assignment");

  var AssignmentApi = {

    getAll: function() {
      var deferred = Promise.defer();

      Assignment.find({}, {}, function(err, assignments) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(assignments);
        }
      });

      return deferred.promise;
    },

    create: function(rawAssignment) {
      rawAssignment = rawAssignment || {};
      var deferred = Promise.defer();

      var rawStudents = JSON.parse(rawAssignment.students)
      ,   students = [];

      for (var i in rawStudents) {
        students.push(ObjectId(rawStudents[i]));
      }

      var assignment = new Assignment({
        students: students,
        content: rawAssignment.content,
        timestamp: rawAssignment.timestamp
      });

      assignment.save(function (err, newAssignment, numberAffected) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(newAssignment);
        }
      });

      return deferred.promise;
    },

    delete: function(id) {
      var deferred = Promise.defer();

      if (!id) {
        return deferred.reject("Please specify the assignment id.");
      }

      Assignment.remove({_id: id}, function(err, deletedAssignment) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(deletedAssignment);
        }
      });

      return deferred.promise;
    }

  };

  module.exports = AssignmentApi;

}();
