const mailgun = require("mailgun-js");
const database = require('./database');
const helpers = require('./helpers');


const DOMAIN = process.env.DB_MAILGUNDOMAIN;
const API = process.env.DB_MAILGUNAPI;
const mg = mailgun({apiKey: API, domain: DOMAIN});


const sendPollSubmittedEmail = function(req, poll) {
  const data = {
    from: 'DSquared <DSquared@hotmail.com>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: ''
  };
  const email = poll['email'];
  const startURL = helpers.fullURL(req) + "/polls/"; 
  const publicURL = startURL + poll.public_id;
  const adminURL = startURL + poll.id + "/admin";  

  data['to'] = email;
  data['text'] += `Your poll name ${poll.title} has been created. 
  Here is the voting link: ${publicURL}. 
  Here is the admin link: ${adminURL}`
  mg.messages().send(data, function (error, body) {
  });
};

const sendVoteSubmittedEmail = function(req, poll) {
  const data = {
    from: 'DSquared <DSquared@hotmail.com>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Someone voted! Checkout the results',
    text: ''
  };
  const email = poll['email'];
  const startURL = helpers.fullURL(req) + "/polls/"; 
  const resultURL = startURL + poll.id + "/results";  

  data['to'] = email;
  data['text'] += `One of your peeps voted on your poll: ${poll.title}. 
  You can view the results here: ${resultURL}.`
  mg.messages().send(data, function (error, body) {
  });
};

module.exports = {sendPollSubmittedEmail, sendVoteSubmittedEmail};