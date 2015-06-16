+function(undefined) {
  "use strict";

  var request = require("request")
  ,   Promise = require("bluebird");

  var AppDispatcher     = require("../dispatcher/AppDispatcher")
  ,   HomeworkConstants = require("../constants/HomeworkConstants");

  var HomeworkActions = {

    setCurrentAssignment: function(assignmentId) {

      AppDispatcher.handleAction({
        actionType: HomeworkConstants.SET_ASSIGNMENT,
        assignmentId: assignmentId
      });

    },

    getAssignments: function() {
      // var fakeAssignments = [
      //   {
      //     _id: "assignment_1",
      //     students: ["student_1", "student_2", "student_3"],
      //     content: "This is an assignment for student 1, 2 and 3.",
      //     timestamp: Date.now() - 10000
      //   },
      //   {
      //     _id: "assignment_2",
      //     students: ["student_1", "student_2"],
      //     content: "1 + 2 = ?.",
      //     timestamp: Date.now() + 10000
      //   },
      //   {
      //     _id: "assignment_3",
      //     students: ["student_1"],
      //     content: "2 * 2 * 2 = ?.",
      //     timestamp: Date.now()
      //   }
      // ];

      var deferred = Promise.defer();

      request.get({
        url: "http://localhost:3001/api/assignments"
      }, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          if (res.statusCode === 200) {
            var assignments = JSON.parse(res.body);

            AppDispatcher.handleAction({
              actionType: HomeworkConstants.RECEIVED_ASSIGNMENTS,
              assignments: assignments
            });

            deferred.resolve();
          } else {
            deferred.reject(JSON.parse(res.body));
          }
        }
      });

      return deferred.promise;

    },

    getStudents: function() {
      // var fakeStudents = [
      //   {
      //     _id: "student_1",
      //     username: "Levi"
      //   },
      //   {
      //     _id: "student_2",
      //     username: "Michael"
      //   },
      //   {
      //     _id: "student_3",
      //     username: "Dude"
      //   }
      // ];

      var deferred = Promise.defer();

      request.get({
        url: "http://localhost:3001/auth/users"
      }, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          if (res.statusCode === 200) {
            var students = JSON.parse(res.body);

            AppDispatcher.handleAction({
              actionType: HomeworkConstants.RECEIVED_STUDENTS,
              students: students
            });

            deferred.resolve();
          } else {
            deferred.reject(JSON.parse(res.body));
          }
        }
      });

      return deferred.promise;
    },

    getAnswers: function() {
      // var fakeAnswers = [
      //   {
      //     _id: "answer_1",
      //     assignment: "assignment_1",
      //     student: "student_1",
      //     content: "I don't know how to answer this one.",
      //     timestamp: Date.now() - 10000
      //   },
      //   {
      //     _id: "answer_2",
      //     assignment: "assignment_1",
      //     student: "student_2",
      //     content: "I don't know either.",
      //     timestamp: Date.now() - 8000
      //   },
      //   {
      //     _id: "answer_3",
      //     assignment: "assignment_2",
      //     student: "student_1",
      //     content: "this is an easy one.",
      //     timestamp: Date.now() - 60000
      //   },
      //   {
      //     _id: "answer_4",
      //     assignment: "assignment_2",
      //     student: "student_3",
      //     content: "The answer is 3.",
      //     timestamp: Date.now() - 10000
      //   },
      //   {
      //     _id: "answer_5",
      //     assignment: "assignment_3",
      //     student: "student_2",
      //     content: "The answer is 4.",
      //     timestamp: Date.now() - 2000
      //   },
      //   {
      //     _id: "answer_6",
      //     assignment: "assignment_3",
      //     student: "student_2",
      //     content: "Oops, I made a mistake, the answer is 8.",
      //     timestamp: Date.now() - 10000
      //   },
      //   {
      //     _id: "answer_7",
      //     assignment: "assignment_3",
      //     student: "student_3",
      //     content: "hmm.",
      //     timestamp: Date.now() - 30000
      //   }
      // ];

      var deferred = Promise.defer();

      request.get({
        url: "http://localhost:3001/api/answers"
      }, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          if (res.statusCode === 200) {
            var answers = JSON.parse(res.body);

            AppDispatcher.handleAction({
              actionType: HomeworkConstants.RECEIVED_ANSWERS,
              answers: answers
            });

            deferred.resolve();
          } else {
            deferred.reject(JSON.parse(res.body));
          }
        }
      });

      return deferred.promise;

    },

    submitAnswer: function(rawAnswer) {
      var deferred = Promise.defer();

      request.post({
        url: "http://localhost:3001/api/answers",
        form: rawAnswer
      }, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          if (res.statusCode === 200) {
            var newAnswer = JSON.parse(res.body);

            AppDispatcher.handleAction({
              actionType: HomeworkConstants.RECEIVED_ANSWER,
              answer: newAnswer
            });

            deferred.resolve();
          } else {
            deferred.reject(JSON.parse(res.body));
          }
        }
      });

      return deferred.promise;
    },

    submitAssignment: function(rawAssignment) {
      var deferred = Promise.defer();

      request.post({
        url: "http://localhost:3001/api/assignments",
        form: {
          students: JSON.stringify(rawAssignment.students),
          content: rawAssignment.content,
          timestamp: rawAssignment.timestamp
        }
      }, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          if (res.statusCode === 200) {
            var newAssignment = JSON.parse(res.body);

            AppDispatcher.handleAction({
              actionType: HomeworkConstants.RECEIVED_ASSIGNMENT,
              assignment: newAssignment
            });

            deferred.resolve();
          } else {
            deferred.reject(JSON.parse(res.body));
          }
        }
      });

      return deferred.promise;
    }

  };

  module.exports = HomeworkActions;

}();
