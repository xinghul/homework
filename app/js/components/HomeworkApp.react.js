+function(undefined) {
  "use strict";

  var React = require("react");

  var HomeworkActions = require("../actions/HomeworkActions")
  ,   HomeworkStore   = require("../stores/HomeworkStore");

  var HomeworkList     = require("./HomeworkApp/HomeworkList.react")
  ,   HomeworkComposer = require("./HomeworkApp/HomeworkComposer.react");

  function getStateFromStores() {
    return {
      assignments: HomeworkStore.getAssignments(),
      students: HomeworkStore.getStudents()
    };
  }

  var HomeworkApp = React.createClass({

    getInitialState: function() {
      return getStateFromStores();
    },

    componentDidMount: function() {
      HomeworkStore.addChangeListener(this._onChange);

      HomeworkActions.getAssignments();
      HomeworkActions.getStudents();
      HomeworkActions.getAnswers();
    },

    componentWillUnmount: function() {
      HomeworkStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    },

    render: function() {
      return (
        <div id="homeworkApp">
          <HomeworkList assignments={this.state.assignments}/>
          <HomeworkComposer students={this.state.students}/>
        </div>
      );
    }
  });

  module.exports = HomeworkApp;

}();
