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

        this.refs.input.getInputDOMNode().value = "";
      }
    },

    render: function() {
      var studentItems = [];
      //var count = 0;

      for (var i in this.props.students) {
        var student = this.props.students[i];

        if (!student.isTeacher) {
          /*if((count%4) === 0) {
            studentItems.push(<Row>);
          }*/

          studentItems.push(
            //<Col xs={3}>
              <Input key={student._id} type="checkbox" label={student.username}  ref={"student_"+student._id} />
            //</Col>
          );

          /*if((count%4) === 3) {
            studentItems.push(</Row>);
          }
          count++;*/
        }
      }

      /*if(count !== 0 && (count%4) !== 3) {
        studentItems.push(</Row>);
      }*/

      return (
        <div id="homeworkComposer">
          <div className="title-label">Add assignment</div>
          <form>
            <Input type="textarea" ref="input" placeholder="Type question here..." />
            <div className="title-selection">Select students</div>
              {studentItems}
            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
      );
    }
  });

  module.exports = HomeworkComposer;

}();
