+function(window, document, undefined) {
  "use strict";

  var React  = require("react")
  ,   Router = require("react-router");

  var DefaultRoute = Router.DefaultRoute
  ,   Link         = Router.Link
  ,   Route        = Router.Route
  ,   RouteHandler = Router.RouteHandler;

  var HomeworkApp   = require("./components/HomeworkApp.react")
  ,   AssignmentApp = require("./components/AssignmentApp.react");

  const NavbarApp = require("./components/NavbarApp.react");

  var App = React.createClass({
    render: function() {
      return (
        <div>
          <NavbarApp />
          <div className="container-fluid">
            <RouteHandler/>
          </div>
        </div>
      );
    }
  });

  var routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="homework" handler={HomeworkApp}/>
      <Route name="assignment" handler={AssignmentApp}/>
      <DefaultRoute handler={HomeworkApp}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById("mainContent"));
  });

}(window, document);
