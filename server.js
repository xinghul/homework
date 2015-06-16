/*
  author: Levi Lu
 */

+function(undefined) {
  "use strict";

  /**********************************************************
  *                      Load Modules                      *
  **********************************************************/
  var express  = require("express")
  ,   path     = require("path")
  ,   fs       = require("fs")
  ,   session  = require("express-session")
  ,   passport = require("passport");

  var favicon      = require("serve-favicon")
  ,   logger       = require("morgan")
  ,   cookieParser = require("cookie-parser")
  ,   bodyParser   = require("body-parser");

  var app        = express()
  ,   MongoStore = require("connect-mongo")(session);

  // set server root for future use
  global.serverRoot = path.resolve(__dirname);

  /**********************************************************
  * Connect MongoDB, Bootstrap models and Config passport  *
  **********************************************************/

  var db_url = process.env.MONGODB_DB_URL || "mongodb://127.0.0.1:27017/homework";
  require("mongoose").connect(db_url, function (err) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log("Connected to mongodb.");
    }
  });

  var modelsPath = path.join(__dirname, "lib/models");
  fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + "/" + file);
  });

  var passportConfig = require("./lib/config/passport");


  /**********************************************************
  *                     Configuration                      *
  **********************************************************/
  app.set("views", path.join(__dirname, "app/views"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  app.use(favicon(__dirname + "/app/favicon.ico"));
  app.use(logger("dev"));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: "Levi Lu",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      db : "levi",
      collection: "sessions"
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  app.use(express.static(path.join(__dirname, "app")));

  /**********************************************************
  *                         Routes                         *
  **********************************************************/
  // app.use(function(req, res, next) {
  //     res.setHeader('Last-Modified', (new Date()).toUTCString());
  //     next();
  // });

  var routes = require("./routes/index");
  app.use("/", routes);

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  //exports for future use
  module.exports = app;

}();
