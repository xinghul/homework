+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var AuthActions = require("../../actions/AuthActions");

  var Input = ReactBootstrap.Input;

  const EmailInput = React.createClass({

    getInitialState: function() {
      return {
        value: ''
      };
    },

    getValue: function() {
      return this.refs.input.getValue();
    },

    validationState: function() {
      let value = this.state.value;

      var legalEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (value.length > 0) {
        if (legalEmail.test(value)) {
          return "success";
        } else {
          return "error";
        }
      }
    },

    handleChange: function() {
      // XXX This could also be done using ReactLink:
      // http://facebook.github.io/react/docs/two-way-binding-helpers.html
      this.setState({
        value: this.getValue()
      });

      AuthActions.inputEmail(this.getValue());
    },

    render: function() {
      return (
        <Input
          type="email"
          value={this.state.value}
          placeholder="Enter email"
          label="Email"
          help={this.props.emailError}
          bsStyle={this.validationState()}
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={this.handleChange} />
      );
    }

  });

  module.exports = EmailInput;

}();
