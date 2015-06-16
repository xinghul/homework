+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var Pager    = ReactBootstrap.Pager
  ,   PageItem = ReactBootstrap.PageItem;

  var HomeworkStore = require("../stores/HomeworkStore")
  ,   AuthStore     = require("../stores/AuthStore");

  var AnswerList     = require("./HomeworkApp/AnswerList.react")
  ,   AnswerComposer = require("./HomeworkApp/AnswerComposer.react");

  function getStateFromStores() {
    return {
      assignment: HomeworkStore.getCurrentAssignment(),
      students: HomeworkStore.getStudents(),
      user: AuthStore.getUser()
    };
  }

  var AssignmentApp = React.createClass({

    getInitialState: function() {
      return getStateFromStores();
    },

    componentDidMount: function() {
      AuthStore.addChangeListener(this._onChange);
      HomeworkStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      AuthStore.removeChangeListener(this._onChange);
      HomeworkStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    },

    render: function() {
      var assigneeNames = [];
      for (var i in this.state.students) {
        var student = this.state.students[i];

        if (this.state.assignment.students.indexOf(student._id) !== -1) {
          assigneeNames.push(student.username);
        }
      }

      return (
        <div id="assignmentApp">
          <h1>Assignment {this.state.assignment._id}</h1>
          <h2>{this.state.assignment.content}</h2>
          <h4>Assignees: {assigneeNames.join(", ")}</h4>
          <AnswerList />
          {this.state.user._id ? <AnswerComposer assignmentId={this.state.assignment._id} userId={this.state.user._id}/> : null}
          <Pager>
            <PageItem previous href="#">&larr; Go Back</PageItem>
          </Pager>
        </div>
      );
    }
  });

  module.exports = AssignmentApp;

}();
