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
const addPoll = function(title, email, description = "") {
  return pool.query(`
    INSERT INTO polls (title, description, email) 
    VALUES($1, $2, $3)
    RETURNING *;
    `, [title, description, email])
    .then(res => res.rows);
};

const addOption = function(pollId, title) {
  return pool.query(`
    INSERT INTO options (poll_id, title)
    VALUES($1, $2)
    RETURNING *;
    `, [pollId, title])
    .then (res => res.rows);
};


const getPoll = function(id) {
  return pool.query(`
  SELECT * FROM polls 
  WHERE id = $1 
  LIMIT 1`, 
  [id]).then(res => res.rows[0])
}

const getPollByPublicId = function(id) {
  return pool.query(`
  SELECT * FROM polls 
  WHERE public_id = $1 
  LIMIT 1`, 
  [id]).then(res => {
    console.log("gePollByPublicId: ", res);
    return res.rows[0]
  });
}

const getOptions = function(id) {
  return pool.query(`
  SELECT sum(options.id) as choices, options.title as choiceSub
  FROM polls
  JOIN options ON polls.id = poll_id
  WHERE public_id = $1
  GROUP BY options.title, options.id
  ORDER BY options.id;`,
  [id]).then(res => res.rows)
};

module.exports = {getPoll, getPollByPublicId, addOption, addPoll, getOptions}
