/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();

const express = require('express');
const router  = express.Router();
const database = require('./database');
const emailAPI = require('./emailAPI');
const helpers = require('./helpers');

/**
 * Decision, Decision Routes
**/
//Create a New Poll & send an email
module.exports = function() {
router.post("/", (req, res) => {
  if (req.body.title === "" || req.body.email === "") {
    res.render('index', { notification: 'No title or email entered. Please try again'})
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
    objectDATA.id = publicId;
    res.render("voting", objectDATA);
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
router.get("/:id/results", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
    res.render("results");
  });
});

// Creates vote route
router.post("/:id/results", (req, res) => {
  let votes = '';    // variable to pass the votes into
  let name = '';     // variable for the voter's name, if they wish to pass it in
  let body = req.body;  // pass req.body to a temp variable
  votes = body['choiceSub'];  //stores the votes
  name = body['voter-name'];  // stores the voter name, '' for null
  
  const id = req.params.id;
  let poll_ID;
  database.getPollIdByPublicId(id).then((data) => {
    let object = data;
    let array = Object.values(object);
    poll_ID = array[0];
    console.log(poll_ID);
    //Add to voter table
    return database.addVoter(poll_ID, name);
  }).then((voter) => {
    let rankArray = [];
    for (let i = votes.length; i > 0; i--) {
      rankArray.push(i);
    }
    if (voter.name !== '') {
        let newName = voter['id'];
        for (let i = 0; i < votes.length; i++) {
          database.getOptionsId(votes[i]).then((opID) => {
            database.insertVotes(opID['id'], newName,rankArray[i])
          })
        }
    } else {
      for (let i = 0; i < votes.length; i++) {
        database.getOptionsId(votes[i]).then((opID) => {
          database.insertVotes(opID['id'], voter.name,rankArray[i])
        })
      }
    }
    return true;
  })
  .then(() => {
    database.getPollByPublicId(id)
    .then((poll) => {
      emailAPI.sendVoteSubmittedEmail(req, poll);
    })
    res.redirect("/thank-you")
  }).catch(e => res.send(e));  
});

  return router;
};