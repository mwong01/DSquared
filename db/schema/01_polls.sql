DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
id PRIMARY KEY VARCHAR(255) NOT NULL,
title VARCHAR(255) NOT NULL,
description VARCHAR(255),
email VARCHAR(255) NOT NULL
);
