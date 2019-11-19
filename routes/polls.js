/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database');

/**
 * Add a new poll to the database
**/

const url = require('url');

/**
 * random generator library
**/

const uuidv4 = require('uuid/v4');

/**
 * mail-gun library
**/

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb6a25036350f4605b9c501db6b4cee76.mailgun.org';
const mg = mailgun({apiKey: '04783a38c46ee64d48b42a58ee1227b2-09001d55-98b334e0', domain: DOMAIN});
const data = {
	from: 'Excited User <the_morbidus@hotmail.com>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: ''
};

/**
 * Decision, Decision Routes
**/

module.exports = function() {

//Create a New Poll
router.post("/", (req, res) => {
  console.log(req.body)
  if (req.body.title === "" || req.body.email === "") {
    res.status(400);
    res.send("400 error - Bad Request: No title or email entered. Please try again");   
  }  else {

    // Mailgun API
    
    const poll = req.body; // passing req.body into a temporary variable
    // const email = poll['email'];
    // const idURL = uuidv4();  // creates a random number for shortURL
    // const startURL = req.headers.referer; //obtains href to attach to generated numbers
    // const voteURL = startURL + idURL;  // voter page
    // const adminURL = startURL + idURL;  // admin page
    // data['to'] = email;
    // data['text'] += 'Your poll name ' + poll.title + ' has been created. <br> Here is the voting link: ' + voteURL + ' .<br> Here is the admin link: ' + adminURL;
    // mg.messages().send(data, function (error, body) {  // sends the email
    //   console.log(body);
    // });
    // data['text'] = '';  // data is a global var, needs to be emptied after usage

    // console.log(idURL)

    // Data from user is entered into poll
    database.addPoll(poll.title, poll.description, poll.email)
    .then( (results) => {
      const pollId = results[0].id;
      // const myChoices = req.body.choiceSub
      // return database.addOption(pollId, myChoices)
      return Promise.all(req.body.choiceSub.map((choice) => database.addOption(pollId, parseInt(choice))))
    }).then((result) => {
      console.log(result)
      // res.redirect(`/${pollId}/links`);
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
  res.render("links");
  })
  
});

/**
 * Voting route
**/

router.get("/:public_id", (req, res) => {
  const publicId = req.params.id
  database.getPollByPublicId(publicId).then((poll) => {
  res.render("voting");
  });
});

/**
 * Admin route
**/

router.get("/:id/admin", (res, req) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
    res.render("admin")
  });
});

/**
 * Results route
**/

// Results route
router.get("/:id/results", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
    res.render("results")
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
