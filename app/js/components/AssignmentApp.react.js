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
      return (
        <div id="assignmentApp">
          <h1>Assignment {this.state.assignment._id}</h1>
          <h2>{this.state.assignment.content}</h2>
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
