/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database');

///////////////////////////////
// url library
///////////////////////////////

const url = require('url');

///////////////////////////////
///////////////////////////////

//////////////////////////////
// random generator library
//////////////////////////////

const uuidv4 = require('uuid/v4');

///////////////////////////////
///////////////////////////////

//////////////////////////
//mail-gun library
//////////////////////////

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb6a25036350f4605b9c501db6b4cee76.mailgun.org';
const mg = mailgun({apiKey: '04783a38c46ee64d48b42a58ee1227b2-09001d55-98b334e0', domain: DOMAIN});
const data = {
	from: 'Excited User <the_morbidus@hotmail.com>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: ''
};

module.exports = function(database) {

  // Create a new poll
  
    router.post("/", (req, res) => {
      
    });

    ////// Creates voting page

    router.get("/polls/:id", (req, res) => {
      let tempVar;
      res.render("voting", tempVar);
    });

    /////// posts voting data, and then renders thank you page
    /////// Can be changed to redirect to a router.post thank_you

    router.post("/thank-you", (req, res) => {
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

    /////////////////
    ////// links page
    /////////////////

    router.get("/polls/:id/links", (req, res) => {
      res.render("polls_links");
    });

    /////// calls admin page

    router.get("/polls/:id/admin", (req, res) => {
      res.render("admin");
    });

    
  
    return router;
  };
