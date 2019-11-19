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
    .then(res => res.rows);
};
exports.addPoll = addPoll;

const addOption = function(option) {
  return poll.query(`INSERT INTO options (title)
    VALUES($1)
    RETURNING *;
    `, [option.title])
    .then (res => res.rows);
};

exports.addOption = addOption;

