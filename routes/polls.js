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
        res.json({ polls });

        res.render('users_index', { polls })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// module.exports = (db) => {
//   router.post("/", (req, res) => {
//     db.query(`INSERT INTO polls (title, description, )`)
//   })
// };