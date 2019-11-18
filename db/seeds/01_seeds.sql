-- Sample data

INSERT INTO polls (id, title, description, uid, email) VALUES (1, 'Lunch Plans', 'What should we have for lunch this Friday?', '123ABC', 'lunch@lunch.com');

INSERT INTO votes (id, poll_id, name) VALUES (1,1,'Homer');
INSERT INTO votes (id, poll_id, name) VALUES (2,1,'Marge');
INSERT INTO votes (id, poll_id, name) VALUES (3,1,'Ned');
INSERT INTO votes (id, poll_id, name) VALUES (4,1,'Apu');
INSERT INTO votes (id, poll_id, name) VALUES (5,1,'Mr. Burns');
INSERT INTO votes (id, poll_id, name) VALUES (6,1,'Moe');
INSERT INTO votes (id, poll_id, name) VALUES (7,1,NULL);

INSERT INTO options (id, poll_id, choice) VALUES (1,1,'{"Pizza", "Burgers","Salad","Thai","Roti"}');

INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (1,1,1,'{"Burgers","Pizza","Thai","Roti","Salad"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (2,1,2,'{"Pizza", "Burgers","Salad","Roti","Thai"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (3,1,3,'{"Salad","Burgers","Thai","Roti","Pizza"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (4,1,4,'{"Roti","Thai","Pizza","Salad","Burgers"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (5,1,5,'{"Pizza","Burgers","Salad","Roti","Thai"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (6,1,6,'{"Thai","Burgers","Roti","Pizza","Salad"}');
INSERT INTO votes_options (id, option_id, vote_id, rank) VALUES (7,1,7,'{"Pizza","Burgers","Roti","Thai","Salad"}');
