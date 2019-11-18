/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database');

module.exports = function(database) {

  // Create a new poll
  
    router.post("/", (req, res) => {
      if (req.body.title === "" || req.body.email === "") {
        res.status(400);
        res.send("400 error - Bad Request: No title or email entered. Please try again");   
      } else {
        
      }
    });
    //   else {  
    //     const pollId = req.params.id
    //     database.addPoll(pollId)
    //     .then( (id) => {
    //       // res.redirect("/polls/:id/links"))
    //       res.send('i hope it worked')
      
    //     }).catch(e => res.send(e));
    //   }
    // })
  // Page that renders admin link and shortened url for participants
  
    router.get("/polls/:id/links", (req, res) => {
      res.render("polls_links");
    });
  
    return router;
  };
