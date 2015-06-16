+function(undefined) {
  "use strict";

  var mongoose = require("mongoose");

  var ObjectId = mongoose.Schema.ObjectId;

  // assignment: assignmentId,
  // student: studentId,
  // content: "some answer",
  // timestamp: Date.now()

  var AnswerSchema = new mongoose.Schema({

    assignment: {
      type: ObjectId,
      ref: "Assignment"
    },

    student: {
      type: ObjectId,
      ref: "User"
    },

    content: {
      type: String,
      default: ""
    },

    timestamp: {
      type: Date,
      default: Date.now()
    }

  });

  mongoose.model("Answer", AnswerSchema);

}();
