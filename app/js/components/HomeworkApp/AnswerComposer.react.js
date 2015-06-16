+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var Input  = ReactBootstrap.Input
  ,   Button = ReactBootstrap.Button;

  var HomeworkActions = require("../../actions/HomeworkActions");

  var HomeworkComposer = React.createClass({

    handleSubmit: function() {
      if (!this.props.userId || !this.props.assignmentId || !this.refs.input.getValue()) {
        return;
      }

      var rawAnswer = {
        assignment: this.props.assignmentId,
        student: this.props.userId,
        content: this.refs.input.getValue(),
        timestamp: Date.now()
      };
      
      HomeworkActions.submitAnswer(rawAnswer);

      this.refs.input.getInputDOMNode().value = "";
    },

    render: function() {
      return (
        <div id="answerComposer">
          <h4>Post answer</h4>
          <form>
            <Input type="textarea" ref="input" placeholder="Type answer here..." />
            <Button onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
      );
    }
  });

  module.exports = HomeworkComposer;

}();
