const express = require("express");
const signupRouter = express.Router();
const models = require("../models/index");

signupRouter.get("/", function(req, res) {
  res.render("signup");
});

signupRouter.post("/", function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.redirect("/");
  }

  var errors = req.validationErrors();

  if (errors) {
    return res.render("signup", { errors: errors, data: req.body });
  } else {
    console.log(" models.user: ", models);
    var newUser = models.user.build(req.body);
    newUser
      .save()
      .then(function(savedUser) {
        res.redirect("/login");
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  }
});

module.exports = signupRouter;
