
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
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
    return res.rows[0]
  });
}

const getOptions = function(id) {
  return pool.query(`
  SELECT options.title as choiceSub
  FROM polls
  JOIN options ON polls.id = poll_id
  WHERE public_id = $1
  GROUP BY options.title, options.id
  ORDER BY options.id;`,
  [id]).then(res => res.rows)
};

const addVoter = function(pollId, name) {
  return pool.query(`
  INSERT INTO voters(poll_id, name)
  VALUES ($1, $2)
  RETURNING*;`, [pollId, name]).then(res => res.rows);
};

const getVoterId = function(name) {
  return pool.query(`
  SELECT id
  FROM voters
  WHERE name = $1;`, [name]).then(res => res.rows[0]);
};

const getOptionsId = function(singleChoice) {
  return pool.query(`
  SELECT id
  FROM options
  WHERE title = $1;`, [singleChoice]).then(res=>res.rows[0]);
}

const insertVotes = function(optionId, voterId, points) {
  return pool.query(`
  INSERT INTO voters_options (option_id, voter_id, rank)
  VALUES ($1, $2, $3)
  RETURNING*;`, [optionId, voterId, points]).then(res => res.rows);
}

const getPollIdByPublicId = function(id) {
  return pool.query(`
  SELECT id FROM polls 
  WHERE public_id = $1 
  LIMIT 1`, 
  [id]).then(res => {
    return res.rows[0]
  });
}

const getVotesSum = function(optionID) {
  return pool.query(`
  SELECT SUM(rank) as sum
  FROM voters_options
  WHERE option_id = $1
  GROUP BY option_id;
  `, [optionID]).then(res => res.rows[0]);
}

const getOptionsByPollsID = function(id) {
  return pool.query(`
  SELECT options.id, options.title as choiceSub
  FROM polls
  JOIN options ON polls.id = poll_id
  WHERE poll_id = $1
  GROUP BY options.title, options.id
  ORDER BY options.id;`,
  [id]).then(res => res.rows)
};

module.exports = {getPoll, getPollByPublicId, addOption, addPoll, getOptions, addVoter, getVoterId, getOptionsId, insertVotes, getPollIdByPublicId, getVotesSum, getOptionsByPollsID}