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
    const id = req.params.id;
    let arrayChoices =[];  // array for options
    let arrayChoiceID = [];  // array for options id
    database.getOptionsByPollsID(id).then((data) => {
      arrayChoices = helpers.buildChoicesArray(data);  //gets an array with the choices/options
      for (let j = 0; j < arrayChoices; j++) { // this for loop is for making an array of options id
        let singleTemp;
        database.getOptionsId(arrayChoices[j]).then((datas) => {   //gets options id for push
          console.log(datas);
          singleTemp = datas['id'];
        });
        arrayChoiceID.push(singleTemp);
      }

      console.log(arrayChoiceID);
    });

    
    let rankSumArray = [];  // for making an array with rank sum
    arrayChoiceID.forEach((singleChoiceID) => {
      database.getVotesSum(singleChoiceID).then((data) => {
        const sum = data['sum'];
        rankSumArray.push(sum);
      });
    });


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
    
    const deleteLine = req.headers.origin + '/polls/';
    const id = req.headers.referer.replace(deleteLine, "");
    let poll_ID;
    database.getPollIdByPublicId(id).then((data) => {
      let object = data;
      let array = Object.values(object);
      poll_ID = array[0];
      console.log(poll_ID);
      ///////////////
      //add to Voter table
      //////////////
      database.addVoter(poll_ID, name);
      let rankArray = [];
      for (let i = votes.length; i > 0; i--) {
        rankArray.push(i);
      }
      let newName;
      if (name !== '') {
        database.getVoterId(name).then((voID) => {
          newName = voID['id'];
          for (let i = 0; i < votes.length; i++) {
            database.getOptionsId(votes[i]).then((opID) => {
              database.insertVotes(opID['id'], newName,rankArray[i])
            })
          }
        });
      }
      for (let i = 0; i < votes.length; i++) {
        database.getOptionsId(votes[i]).then((opID) => {
          database.insertVotes(opID['id'], newName,rankArray[i])
        })
      }
    });
    res.redirect("/thank-you");

  });


  /**
   * Results route
  **/
  router.get("/thank-you", (req, res) => {
      res.render("thank_you");
  });

  return router;
};