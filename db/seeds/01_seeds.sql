INSERT INTO polls (id, title, description, email, slug) VALUES (1, 'lunch plans', 'what do we want for lunch this friday?', 'lunch@lunch.com', 'AAA12345');
INSERT INTO polls (id, title, description, email, slug) VALUES (2, 'favorite color', NULL, 'color@color.com', 'BBB12345');

INSERT INTO options (id, poll_id, title) VALUES (1,1,'pizza');
INSERT INTO options (id, poll_id, title) VALUES (2,1,'burgers');
INSERT INTO options (id, poll_id, title) VALUES (3,1,'roti');
INSERT INTO options (id, poll_id, title) VALUES (4,1,'salad');

INSERT INTO options (id, poll_id, title) VALUES (5,2,'red');
INSERT INTO options (id, poll_id, title) VALUES (6,2,'green');
INSERT INTO options (id, poll_id, title) VALUES (7,2,'blue');

INSERT INTO voters (id, poll_id, name) VALUES (1,1,'Homer');
INSERT INTO voters (id, poll_id, name) VALUES (2,1,'Marge');
INSERT INTO voters (id, poll_id, name) VALUES (3,1,'Ned');
INSERT INTO voters (id, poll_id, name) VALUES (4,1,'Apu');
INSERT INTO voters (id, poll_id, name) VALUES (5,1,'Mr. Burns');

INSERT INTO voters (id, poll_id, name) VALUES (6,2,'Moe');
INSERT INTO voters (id, poll_id, name) VALUES (7,2,NULL);
INSERT INTO voters (id, poll_id, name) VALUES (8,2,'Ralph');

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
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (17,1,5,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (18,2,5,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (19,3,5,4);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (20,4,5,3);

INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (21,5,6,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (22,6,6,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (23,7,6,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (24,5,7,1);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (25,6,7,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (26,7,7,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (27,5,8,3);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (28,6,8,2);
INSERT INTO voters_options (id, option_id, voter_id, rank) VALUES (29,7,8,1);
