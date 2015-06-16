+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  // XXX try to make it work with refs
  var AuthActions = require("../../actions/AuthActions");

  var Input = ReactBootstrap.Input;

  const UsernameInput = React.createClass({

    getInitialState: function() {
      return {
        value: ''
      };
    },

    getValue: function() {
      return this.refs.input.getValue();
    },

    validationState: function() {
      let length = this.state.value.length;
      if (length > 10) { return "success"; }
      else if (length > 5) { return "warning"; }
      else if (length > 0) { return "error"; }
    },

    handleChange: function() {
      // XXX This could also be done using ReactLink:
      // http://facebook.github.io/react/docs/two-way-binding-helpers.html
      this.setState({
        value: this.getValue()
      });

      AuthActions.inputUsername(this.getValue());
    },

    render: function() {
      return (
        <Input
          type="text"
          value={this.state.value}
          placeholder="Enter username"
          label="Username"
          help={this.props.usernameError}
          bsStyle={this.validationState()}
          hasFeedback
          ref="input"
          groupClassName="group-class"
          labelClassName="label-class"
          onChange={this.handleChange} />
      );
    }

  });

  module.exports = UsernameInput;

}();
