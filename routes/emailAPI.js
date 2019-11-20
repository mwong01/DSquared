const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const sendPollSubmittedEmail = function() {
  const poll = req.body;
  const email = poll['email'];
  const pollId = req.params.id 
  const startURL = req.headers.referer; //obtains href to attach to generated numbers
  const adminURL = startURL + pollId;  // admin page
  const publicURL = getPollByPublicId(req.params.id);
  data['to'] = email;
  data['text'] += 'Your poll name ' + poll.title + ' has been created. Here is the voting link: ' + publicURL  + ' . Here is the admin link: ' + adminURL;
  mg.messages().send(data, function (error, body) {  // sends the email
    console.log(body);
  });
  data['text'] = '';  // data is a global var, needs to be emptied after usage
}

module.exports = {sendPollSubmittedEmail};