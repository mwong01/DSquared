DROP TABLE IF EXISTS votes_options CASCADE;

CREATE TABLE votes_options (
  id SERIAL PRIMARY KEY NOT NULL,
  option_id INTEGER REFERENCES options(id) ON DELETE CASCADE,
  vote_id INTEGER REFERENCES votes(id) ON DELETE CASCADE,
  rank VARCHAR(255) [] NOT NULL
);
