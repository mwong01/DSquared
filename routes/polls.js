/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

 // load .env data into process.env
require('dotenv').config();


const express = require('express');
const router  = express.Router();
const database = require('./database');
const emailAPI = require('./emailAPI');
const helpers = require('./helpers');


/**
 * Decision, Decision Routes
**/

module.exports = function() {

//Create a New Poll & send an email
router.post("/", (req, res) => {
  if (req.body.title === "" || req.body.email === "") {
    res.status(400);
    res.send("400 error - Bad Request: No title or email entered. Please try again");
  }  else {
    const poll = req.body;
    database.addPoll(poll.title, poll.email, poll.description)
    .then((results) => {
      const pollId = results[0].id;
      console.log("poll:", results[0]);
      emailAPI.sendPollSubmittedEmail(req, results[0]);
      return Promise.all(req.body.choiceSub.map((choice) => database.addOption(pollId, choice)))
            .then(() => {
              res.redirect(`/polls/${pollId}/links`);
            })
    }).catch(e => res.send(e));
  }

});

/**
 *  Links route
 *  Links page renders two links: url and admin link
**/
router.get("/:id/links", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
  const startURL = helpers.fullURL(req) + "/polls/";
  console.log("req.headers: ", req.headers)
  const publicURL = startURL + poll.public_id;
  const adminURL = startURL + poll.id + "/admin";
  let templateVars = {publicURL, adminURL}
  res.render("links", templateVars);
  });
});

/**
 * Voting route
**/

router.get("/:public_id", (req, res) => {
  const publicId = req.params.public_id;

  const optionsDATA = database.getOptions(publicId);
  optionsDATA.then((data) => {
    let objectDATA = {};
    objectDATA = helpers.buildChoicesObject(data);
    database.getPollByPublicId(publicId).then((poll) => {
      res.render("voting", objectDATA);
      });
  });
});


/**
 * Admin route
**/

router.get("/:id/admin", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
  const startURL = helpers.fullURL(req) + "/polls/";
  const resultsURL = startURL + poll.id + "/results";
  let templateVars = {resultsURL};
  res.render("admin", templateVars);
  });
});

/**
 * Results route
**/

// Results route
router.get("/:id/results", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
    res.render("results");
  });
});

// Creates vote route
router.post("/:id/results", (req, res) => {
  console.log(req.body);  // just have this to see if data is comign across
  let votes = '';    // variable to pass the votes into
  let name = '';     // variable for the voter's name, if they wish to pass it in
  let temp = req.body;  // pass req.body to a temp variable
  if (temp['votes']) {
    votes = temp.votes;  //stores the votes
    console.log(votes);
  } else {
    name = temp['voter-name'];  // stores the voter name, '' for null
    console.log(name);
  }

  res.redirect("thank_you");
});

  return router;
};
