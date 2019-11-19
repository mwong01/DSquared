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
  if (req.body.title === "" || req.body.email === "") {
    res.status(400);
    res.send("400 error - Bad Request: No title or email entered. Please try again");   
  }  else {  
    addPoll(poll)
    .then( (id) => {
      // res.redirect("/polls/:id/links"))
      res.send('i hope it worked')
    })
    .catch(e => res.send(e));
  }

  // Mailgun API
  const tempVar = req.body;
  const email = tempVar['email'];

  const shortURL = uuidv4();  // creates a random number for shortURL

  const startURL = req.headers.referer; //obtains href to attach to generated numbers

  const voteURL = startURL + shortURL;  // voter url

  const creatorURL = uuidv4();    // generates a random number for the admin

  const adminURL = startURL + creatorURL;  // admin address

  data['to'] = email;
  data['text'] += 'Your poll name ' + tempVar.title + ' has been created. <br> Here is the voting link: ' + voteURL + ' .<br> Here is the admin link: ' + adminURL;
  mg.messages().send(data, function (error, body) {  // sends the email
    console.log(body);
  });
  data['text'] = '';  // data is a global var, needs to be emptied after usage
});
    
  
/**
 *  Links route
 *  Links page renders two links: shortened url and admin link
**/
router.get("/:id/links", (req, res) => {
  res.render("polls_links");
});

  
/**
 * Voting route
**/

router.get("/:id", (req, res) => {
  let tempVar;
  res.render("voting", tempVar);
});

/**
 * Admin route
**/

router.get("/:id/admin", (res, req) => {
  res.render("admin")
});

/**
 * Results route
**/

// Results route
router.get("/:id/results", (req, res) => {

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

  res.render("thank_you");
});

  return router;
};
