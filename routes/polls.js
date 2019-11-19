/*
<<<<<<< HEAD
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
=======
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
>>>>>>> 4877a8adc9ab5e7e99db59f4d9c266fe412055f5
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
<<<<<<< HEAD
const database = require('./database');

module.exports = function() {
=======
const database = require("./database");

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     let query = `SELECT * FROM widgets`;
//     console.log(query);
//     db.query(query)
//       .then(data => {
//         const widgets = data.rows;
//         res.json({ widgets });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

module.exports = function(database) {
>>>>>>> 4877a8adc9ab5e7e99db59f4d9c266fe412055f5

  // Create a new poll
  
    router.post("/", (req, res) => {
      if (req.body.title === "" || req.body.email === "") {
        res.status(400);
        res.send("400 error - Bad Request: No title or email entered. Please try again");   
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
