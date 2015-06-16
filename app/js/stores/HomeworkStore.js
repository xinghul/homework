+function(undefined) {
  "use strict";

  var _            = require("underscore")
  ,   EventEmitter = require("events").EventEmitter;

  var AppDispatcher     = require("../dispatcher/AppDispatcher")
  ,   HomeworkConstants = require("../constants/HomeworkConstants");

  var CHANGE_EVENT = "change"
  ,   _currAssignIndex = 0
  ,   _assignments = []
  ,   _students = []
  ,   _answers = [];

  var HomeworkStore = _.extend({}, EventEmitter.prototype, {

    receiveAssignments: function(assignments) {
      _assignments = assignments;
    },

    addNewAssignment: function(assignment) {
      _assignments.push(assignment);
    },

    getAssignments: function() {
      return _assignments;
    },

    getCurrentAssignment: function() {
      return _assignments[_currAssignIndex];
    },

    setCurrentAssignment: function(assignmentId) {
      for (var index in _assignments) {
        if (_assignments[index]._id === assignmentId) {
          _currAssignIndex = index;
          return;
        }
      }
    },

    receiveStudents: function(students) {
      _students = students;
    },

    getStudents: function() {
      return _students;
    },

    receiveAnswers: function(answers) {
      _answers = answers;
    },

    addNewAnswer: function(answer) {
      _answers.push(answer);
    },

    getCurrentAnswers: function() {
      var result       = []
      ,   assignmentId = _assignments[_currAssignIndex]._id;

      for (var index in _answers) {
        if (_answers[index].assignment === assignmentId) {
          result.push(_answers[index]);
        }
      }

      return result;
    },

    getAnswers: function() {
      return _answers;
    },

    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }

  });

  HomeworkStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {

      case HomeworkConstants.RECEIVED_ASSIGNMENTS:
        HomeworkStore.receiveAssignments(action.assignments);
        HomeworkStore.emitChange();
        break;

      case HomeworkConstants.RECEIVED_STUDENTS:
        HomeworkStore.receiveStudents(action.students);
        HomeworkStore.emitChange();
        break;

      case HomeworkConstants.RECEIVED_ANSWERS:
        HomeworkStore.receiveAnswers(action.answers);
        HomeworkStore.emitChange();
        break;

      case HomeworkConstants.SET_ASSIGNMENT:
        HomeworkStore.setCurrentAssignment(action.assignmentId);
        HomeworkStore.emitChange();
        break;

      case HomeworkConstants.RECEIVED_ASSIGNMENT:
        HomeworkStore.addNewAssignment(action.assignment);
        HomeworkStore.emitChange();
        break;

      case HomeworkConstants.RECEIVED_ANSWER:
        HomeworkStore.addNewAnswer(action.answer);
        HomeworkStore.emitChange();
        break;

      default:
        // do nothing
    }

  });

  module.exports = HomeworkStore;

}();
