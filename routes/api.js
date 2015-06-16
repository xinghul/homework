+function() {
    "use strict";

    var express  = require("express")
    ,   ObjectId = require("mongoose").Schema.ObjectId;

    var router     = express.Router()
    ,   assignment = require("./api/assignment")
    ,   answer     = require("./api/answer");

    router.get("/", function(req, res, next) {
      res.send("api");
    });

    /***************************************/
    /*              api for assignment         */
    /***************************************/

    router.get("/assignments", function(req, res) {

      assignment.getAll().then(function(assignments) {
        res.json(assignments);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to fetch the assignments.");
      });

    });

    router.post("/assignments", function(req, res) {

      assignment.create(req.body).then(function(newAssignment) {
        res.json(newAssignment);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to create the assignment.");
      });

    });

    router.delete("/assignments/:id", function(req, res) {

      assignment.delete(req.params.id).then(function(result) {
        res.json(req.params.id);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to delete the assignment.");
      });

    });

    /***************************************/
    /*              api for answer         */
    /***************************************/

    router.get("/answers", function(req, res) {

      answer.getAll().then(function(answers) {
        res.json(answers);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to fetch the answers.");
      });

    });

    router.post("/answers", function(req, res) {

      console.log(req.body)

      // res.send("haha");

      answer.create(req.body).then(function(newAnswer) {
        res.json(newAnswer);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to create the answer.");
      });

    });

    router.delete("/answers/:id", function(req, res) {

      answer.delete(req.params.id).then(function(result) {
        res.json(req.params.id);
      }).catch(function(err) {
        console.log(err);

        res.status(500).end("error occurred when trying to delete the answer.");
      });

    });

    module.exports = router;

}();
