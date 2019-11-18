const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Add a new poll to the database
 * @param {{tite: string, description: string, email: string}} 
 * @return {Promise<{}>} A promise to the user.
 */
const addPoll = function(poll) {
  return poll.query(`
    INSERT INTO polls (title, description, email) 
    VALUES($1, $2, $3)
    RETURNING *;
    `, [poll.title, poll.description, poll.email])
    .then(
      (res) => {
        console.log(res.rows)
        return poll.query(`INSERT INTO options (choice)
        VALUES($1)
        RETURNING *;
        `)
    });
};

exports.addPoll = addPoll;