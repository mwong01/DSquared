DROP TABLE IF EXISTS voters CASCADE;
CREATE TABLE voters (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id uuid REFERENCES polls(id) ON DELETE CASCADE,
  name VARCHAR(255)
);
