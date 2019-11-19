INSERT INTO polls (id, public_id, title, description, email) VALUES ('fc46c0d1-7045-4d0e-a4de-39401ccd2a67', '6b541e21-b113-4f05-b1cd-77c8b71abad8', 'lunch plans', 'whats for lunch tomorrow?', 'lunch@lunch.com');

INSERT INTO options (id, poll_id, title) VALUES (1,'fc46c0d1-7045-4d0e-a4de-39401ccd2a67','pizza');
INSERT INTO options (id, poll_id, title) VALUES (2,'fc46c0d1-7045-4d0e-a4de-39401ccd2a67','burgers');
INSERT INTO options (id, poll_id, title) VALUES (3,'fc46c0d1-7045-4d0e-a4de-39401ccd2a67','roti');
INSERT INTO options (id, poll_id, title) VALUES (4,'fc46c0d1-7045-4d0e-a4de-39401ccd2a67','salad');

INSERT INTO voters (id, poll_id, name) VALUES (1, 'fc46c0d1-7045-4d0e-a4de-39401ccd2a67', 'Homer');
INSERT INTO voters (id, poll_id, name) VALUES (2, 'fc46c0d1-7045-4d0e-a4de-39401ccd2a67', 'Marge');
INSERT INTO voters (id, poll_id, name) VALUES (3, 'fc46c0d1-7045-4d0e-a4de-39401ccd2a67', 'Ned');

INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (1,1,1,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (2,2,1,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (3,3,1,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (4,4,1,4);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (5,1,2,4);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (6,2,2,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (7,3,2,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (8,4,2,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (9,1,3,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (10,2,3,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (11,3,3,4);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (12,4,3,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (13,1,4,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (14,2,4,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (15,3,4,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (16,4,4,4);
