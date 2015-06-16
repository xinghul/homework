+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var AuthActions = require("../../actions/AuthActions");

  var Input = ReactBootstrap.Input;

  const TeacherInput = React.createClass({

    getChecked: function() {
      return this.refs.input.getChecked();
    },

    handleChange: function() {
      AuthActions.toggleIsTeacher(this.getChecked());
    },

    render: function() {
      return (
        <Input
          type="checkbox"
          label="Is Teacher"
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={this.handleChange} />
      );
    }

  });

  module.exports = TeacherInput;

}();
