DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  name VARCHAR(255)
);