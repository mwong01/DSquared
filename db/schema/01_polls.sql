DROP TABLE IF EXISTS polls CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE polls (
  id uuid PRIMARY KEY default uuid_generate_v4(),
  public_id uuid NOT NULL default uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  email VARCHAR(255) NOT NULL
);

CREATE INDEX IF NOT EXISTS polls_public_id_index ON polls ("public_id");