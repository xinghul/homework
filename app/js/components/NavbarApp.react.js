+function(undefined) {
  "use strict";

  var React          = require("react")
  ,   Router         = require("react-router")
  ,   ReactBootstrap = require("react-bootstrap");

  var Link = Router.Link;

  var Navbar  = ReactBootstrap.Navbar
  ,   Nav     = ReactBootstrap.Nav
  ,   NavItem = ReactBootstrap.NavItem;

  var AuthApp = require("./AuthApp.react");

  const Narbar = React.createClass({

    render: function() {

      return (
        <nav role="navigation" className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="#" className="navbar-brand">Levi Lu</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="homework">Homework</Link></li>
              </ul>
              <div className="nav navbar-nav pull-right" id="authModalTrigger">
                <AuthApp />
              </div>
            </div>
          </div>
        </nav>
      );
    }

  });

  module.exports = Narbar;

}();
