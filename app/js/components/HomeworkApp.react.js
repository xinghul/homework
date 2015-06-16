+function(undefined) {
  "use strict";

  var React = require("react");

  var HomeworkActions = require("../actions/HomeworkActions")
  ,   HomeworkStore   = require("../stores/HomeworkStore")
  ,   AuthStore       = require("../stores/AuthStore");

  var HomeworkList     = require("./HomeworkApp/HomeworkList.react")
  ,   HomeworkComposer = require("./HomeworkApp/HomeworkComposer.react");

  function getStateFromStores() {
    return {
      assignments: HomeworkStore.getAssignments(),
      students: HomeworkStore.getStudents(),
      user: AuthStore.getUser()
    };
  }

  var HomeworkApp = React.createClass({

    getInitialState: function() {
      return getStateFromStores();
    },

    componentDidMount: function() {
      HomeworkStore.addChangeListener(this._onChange);
      AuthStore.addChangeListener(this._onChange);

      HomeworkActions.getAssignments();
      HomeworkActions.getStudents();
      HomeworkActions.getAnswers();
    },

    componentWillUnmount: function() {
      HomeworkStore.removeChangeListener(this._onChange);
      AuthStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    },

    render: function() {
      var message;
      if (this.state.user.isTeacher) {
        message = "Teacher account";
      } else if (this.state.user._id) {
        message = "Student account";
      }
      return (
        <div id="homeworkApp">
          {message}
          <HomeworkList assignments={this.state.assignments}/>
          {this.state.user.isTeacher ? <HomeworkComposer students={this.state.students}/> : null}
        </div>
      );
    }
  });

  module.exports = HomeworkApp;

}();
