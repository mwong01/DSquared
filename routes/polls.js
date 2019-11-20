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
require('dotenv').config();

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
const DOMAIN = process.env.DB_MAILGUNDOMAIN;
const API = process.env.DB_MAILGUNAPI;
const mg = mailgun({apiKey: API, domain: DOMAIN});
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
    // Data from user is entered into poll
    database.addPoll(poll.title, poll.description, poll.email)
    .then( (results) => {
      const pollId = results[0].id;
      // const myChoices = req.body.choiceSub
      // return database.addOption(pollId, myChoices)
      return Promise.all(req.body.choiceSub.map((choice) => database.addOption(pollId, choice)))
            .then(() => {
              const poll = req.body; // passing req.body into a temporary variable
              const email = poll['email'];
              const pollId = req.params.id  // creates a random number for shortURL
              const startURL = req.headers.referer; //obtains href to attach to generated numbers
              const voteURL = startURL + idURL;  // voter page
              const adminURL = startURL + pollId;  // admin page
              data['to'] = email;
              data['text'] += 'Your poll name ' + poll.title + ' has been created. <br> Here is the voting link: ' + voteURL + ' . Here is the admin link: ' + adminURL;
              mg.messages().send(data, function (error, body) {  // sends the email
                console.log(body);
              });
              data['text'] = '';  // data is a global var, needs to be emptied after usage
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
  res.render("links");
  })
  
});

/**
 * Voting route
**/

router.get("/:public_id", (req, res) => {
  const publicId = req.params.public_id;
  const mockDATA = {
    choices: 4,
    choiceSub: ['pizza', 'sushi', 'burger', 'salad']
  };
  let sizeNumber = 0;
  let objectDATA = {};
  const optionsDATA = database.getOptions(publicId);
  optionsDATA.then((data) => {
    console.log(data);
    sizeNumber = data.length -1;  // gives us the number for the last spot on array
    const findChoices = data[sizeNumber]; // copies the inner object at the end of the array
    console.log(tempVar);
    const temp = tempVar['choices'];
    const temp2 = parseInt(temp);
    console.log(temp2);
  });
  database.getPollByPublicId(publicId).then((poll) => {
  res.render("voting", mockDATA);
  });
});

/* SELECT sum(options.id) as choices, options.title as choiceSub
FROM polls
JOIN options ON polls.id = poll_id
WHERE public_id = '6b541e21-b113-4f05-b1cd-77c8b71abad8'
GROUP BY options.title, options.id
ORDER BY options.id; */

/**
 * Admin route // GIVING TROUBLE
**/

router.get("/:id/admin", (req, res) => {
  const id = req.params.id
  database.getPoll(id).then((poll) => {
  res.render("admin");
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
