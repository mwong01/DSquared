/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM polls;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });

        res.render('users_index', { polls })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


// POST /polls - Adds poll data to database and redirects to links page

  router.post("/polls", (req, res) => {
    // uid = creates new UID and saves it to the database (poll)
    db.query(`
    INSERT INTO polls (title, description, choice, email) 
    VALUES($1, $2, $3, $4)
    JOIN options ON polls.id = poll_id
    `)
    .then(res => {
      res.redirect("/polls/:id/links")
    })
    .catch(err => {
      res
        .send("Missing category. Please fill in again")
    })
  });


// GET /polls/:id/links - Page that renders results? 


  // router.get("/polls/:id/admin", (req, res) => {
  //   .then(r)
  //   .catch()
  // })

return router;
};


