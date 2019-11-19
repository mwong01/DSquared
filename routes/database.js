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
const addPoll = function(title, description = "", email) {
  return pool.query(`
    INSERT INTO polls (title, description, email, slug) 
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `, [title, description, email, "slug"])
    .then(res => res.rows);
};
exports.addPoll = addPoll;

const addOption = function(pollId, title) {
  return pool.query(`
    INSERT INTO options (poll_id, title)
    VALUES($1, $2)
    RETURNING *;
    `, [pollId, title])
    .then (res => res.rows);
};

exports.addOption = addOption;

const shortenedUrlForUSer = function() {
  return pool.query(`
  SELECT * FROM polls
  WHERE slug = "req.body.slug"
  `, 
  )
};

exports.shortenedUrlForUSer = shortenedUrlForUSer;