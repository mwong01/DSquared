/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database');

module.exports = function() {

  // Create a new poll
  
    router.post("/", (req, res) => {
      if (req.body.title === "" || req.body.email === "") {
        res.status(400);
        res.send("400 error - Bad Request: No title or email entered. Please try again");   
      }
      else {  
        console.log(req.body)
        database.addPoll(req.body.title, req.body.description, req.body.email)
        .then((result) => {
          (forEach(req.body.options))
          // result.rows
          // res.redirect("/polls/:id/links"))
          res.send('i hope it worked')
        })
        .catch(e => res.send(e));
      }
    })

    // addOption(pollId, options)

  // Page that renders admin link and shortened url for participants
  
    router.get("/polls/:id/links", (req, res) => {
      res.render("polls_links");
    });
  
    return router;
  };
