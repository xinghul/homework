+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   ReactBootstrap = require("react-bootstrap");

  var Button         = ReactBootstrap.Button
  ,   Input          = ReactBootstrap.Input
  ,   DropdownButton = ReactBootstrap.DropdownButton
  ,   MenuItem       = ReactBootstrap.MenuItem
  ,   Modal          = ReactBootstrap.Modal
  ,   ModalTrigger   = ReactBootstrap.ModalTrigger
  ,   OverlayMixin   = ReactBootstrap.OverlayMixin;

  var AuthStore   = require("../stores/AuthStore")
  ,   AuthActions = require("../actions/AuthActions");

  const UsernameInput = require("./AuthApp/UsernameInput.react")
  ,     TeacherInput  = require("./AuthApp/TeacherInput.react")
  ,     EmailInput    = require("./AuthApp/EmailInput.react")
  ,     PasswordInput = require("./AuthApp/PasswordInput.react");

  function getStateFromStores() {
    return {
      isModalOpen: AuthStore.isModalOpen(),
      isSignUp: AuthStore.isSignUp(),
      username: AuthStore.getUsernameInput(),
      isTeacher: AuthStore.isTeacher(),
      email: AuthStore.getEmailInput(),
      password: AuthStore.getPasswordInput(),
      user: AuthStore.getUser()
    };
  }

  var AuthApp = React.createClass({

    mixins: [OverlayMixin],

    getInitialState: function() {
      return getStateFromStores();
    },

    toggleMode: function() {
      AuthActions.toggleMode();
    },

    toggleModal: function() {
      AuthActions.toggleModal();
    },

    handleSubmit: function() {
      var self = this;
      if (this.state.isSignUp) {
        // handle sign up

        // XXX might do the checking somewhere else
        // eg. disable submit when missing fields
        if (this.state.username && this.state.email && this.state.password) {
          AuthActions.userSignUp({

            username: this.state.username,
            isTeacher: this.state.isTeacher,
            email: this.state.email,
            password: this.state.password

          }).then(function() {
            AuthActions.toggleModal();
          }).catch(function(err) {
            console.log(err);

            self.setState(err);
          });
        } else {
          this.setState({
            message: "Missing fields"
          });
        }
      } else {
        // handle log in
        AuthActions.userLogIn({

          email: this.state.email,
          password: this.state.password

        }).then(function() {
          AuthActions.toggleModal();
        }).catch(function(err) {
          console.log(err);

          self.setState(err);
        });
      }

    },

    handleLogOut: function() {
      AuthActions.removeUserFromCookie();
    },

    componentDidMount: function() {
      AuthStore.addChangeListener(this._onChange);

      AuthActions.logInFromCookie();
    },

    componentWillUnmount: function() {
      AuthStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      // XXX use store to set them seperately.
      this.setState({
        usernameError: null,
        emailError: null,
        passwordError: null,
        message: null
      });

      this.setState(getStateFromStores());
    },

    render: function() {
      var userArea;
      if (this.state.user.username) {
        var title = "Hello, " + this.state.user.username;
        userArea =
          <DropdownButton title={title} bsStyle='primary' pullRight>
            <MenuItem onClick={this.handleLogOut}>Log out</MenuItem>
          </DropdownButton>
      } else {
        userArea = <Button onClick={this.toggleModal} bsStyle="success">Sign in</Button>;
      }

      return (
        <div id="userArea">
          {userArea}
        </div>
      );
    },

    renderOverlay: function() {
      if (!this.state.isModalOpen) {
        return <span/>;
      }

      var switchMessageSpan;
      if (this.state.isSignUp) {
        switchMessageSpan =
          <span className="pull-left">
            Already have an account? <a onClick={this.toggleMode}>Sign In</a>
          </span>
      } else {
        switchMessageSpan =
          <span className="pull-left">
            New here? <a onClick={this.toggleMode}>Sign Up</a>
          </span>
      }

      return (
        <Modal title={this.state.isSignUp ? "Sign up" : "Sign In"} onRequestHide={this.toggleModal}>
          <div className="modal-body">
            {this.state.isSignUp ? <UsernameInput usernameError={this.state.usernameError}/> : null}
            {this.state.isSignUp ? <TeacherInput /> : null}
            <EmailInput emailError={this.state.emailError}/>
            <PasswordInput passwordError={this.state.passwordError}/>
            <div style={{color: "red"}}>{this.state.message}</div>
          </div>
          <div className="modal-footer">
            {switchMessageSpan}
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.toggleModal}>Close</Button>
          </div>
        </Modal>
      );
    }
  });

  module.exports = AuthApp;

}();
