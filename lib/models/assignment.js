+function(undefined) {
  "use strict";

  var mongoose = require("mongoose");

  var ObjectId = mongoose.Schema.ObjectId;

  // students: [userId],
  // content: "some question",
  // timestamp: Date.now()

  var AssignmentSchema = new mongoose.Schema({

    students: [{
      type: ObjectId,
      ref: "User"
    }],

    content: {
      type: String,
      default: ""
    },

    timestamp: {
      type: Date,
      default: Date.now()
    }

  });

  mongoose.model("Assignment", AssignmentSchema);

}();
