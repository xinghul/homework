+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   Router         = require("react-router")
  ,   ReactBootstrap = require("react-bootstrap");

  var Link  = Router.Link
  ,   Table = ReactBootstrap.Table;

  var HomeworkActions = require("../../actions/HomeworkActions");

  var HomeworkList = React.createClass({

    setCurrentAssignment: function(assignmentId) {
      HomeworkActions.setCurrentAssignment(assignmentId);
    },

    render: function() {
      var listItems = [];
      for (var i in this.props.assignments) {
        var assignment = this.props.assignments[i];

        listItems.push(
          <tr key={assignment._id}>
            <td>{parseInt(i) + 1}</td>
            <td>
              <Link to="assignment" onClick={this.setCurrentAssignment.bind(this, assignment._id)}>
                {assignment._id}
              </Link>
            </td>
            <td>{assignment.content}</td>
            <td>{new Date(assignment.timestamp).toLocaleTimeString()}</td>
          </tr>
        );
      }

      return (
        <div id="homeworkList">
          <div className="title-header">Assignments</div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment ID</th>
                <th>Content</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </Table>
        </div>
      );
    }
  });

  module.exports = HomeworkList;

}();
