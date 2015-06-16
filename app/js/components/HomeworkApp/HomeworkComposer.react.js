+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var Input  = ReactBootstrap.Input
  ,   Button = ReactBootstrap.Button;

  var HomeworkActions = require("../../actions/HomeworkActions");

  var HomeworkComposer = React.createClass({

    handleSubmit: function() {
      var students = [];
      for (var i in this.props.students) {
        var student = this.props.students[i];

        if (this.refs["student_" + student._id].getChecked()) {
          students.push(student._id);
        }
      }

      if (students.length > 0 && this.refs.input.getValue()) {
        var assignment = {
          students: students,
          content: this.refs.input.getValue(),
          timestamp: Date.now()
        }

        HomeworkActions.submitAssignment(assignment);
      }
    },

    render: function() {
      var studentItems = [];

      for (var i in this.props.students) {
        var student = this.props.students[i];
        studentItems.push(
          <Input key={student._id} type="checkbox" label={student.username} ref={"student_"+student._id} />
        );
      }

      return (
        <div id="homeworkComposer">
          <h3>Add assignment</h3>
          <form>
            <Input type="textarea" ref="input" placeholder="Type question here..." />
            <h4>Select students</h4>
            {studentItems}
            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
      );
    }
  });

  module.exports = HomeworkComposer;

}();
