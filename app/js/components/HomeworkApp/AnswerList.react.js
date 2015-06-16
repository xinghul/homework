+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   Router         = require("react-router")
  ,   ReactBootstrap = require("react-bootstrap");

  var Link  = Router.Link
  ,   Table = ReactBootstrap.Table;

  var HomeworkActions = require("../../actions/HomeworkActions")
  ,   HomeworkStore   = require("../../stores/HomeworkStore");

  function getStateFromStores() {
    return {
      answers: HomeworkStore.getCurrentAnswers(),
      students: HomeworkStore.getStudents()
    };
  }

  var AnswerList = React.createClass({

    getInitialState: function() {
      return getStateFromStores();
    },

    componentDidMount: function() {
      HomeworkStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      HomeworkStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    },

    render: function() {
      var studentIdToName = {};
      for (var i in this.state.students) {
        var student = this.state.students[i];
        studentIdToName[student._id] = student.username;
      }

      var listItems = [];
      for (var i in this.state.answers) {
        var answer = this.state.answers[i];

        listItems.push(
          <tr key={answer._id}>
            <td>{parseInt(i) + 1}</td>
            <td>{answer._id}</td>
            <td>{studentIdToName[answer.student]}</td>
            <td>{answer.content}</td>
            <td>{new Date(answer.timestamp).toLocaleTimeString()}</td>
          </tr>
        );
      }

      return (
        <div id="answerList">
          <h4>Answers</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Answer ID</th>
                <th>Student</th>
                <th>Content</th>
                <th>Date</th>
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

  module.exports = AnswerList;

}();
