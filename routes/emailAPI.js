const sendEmail = function() {
  const email = poll['email'];
  const pollId = req.params.id  // 
  const startURL = req.headers.referer; //obtains href to attach to generated numbers
  const voteURL = startURL + idURL;  // voter page
  const adminURL = startURL + pollId;  // admin page
  data['to'] = email;
  data['text'] += 'Your poll name ' + poll.title + ' has been created. <br> Here is the voting link: ' + voteURL + ' . Here is the admin link: ' + adminURL;
  mg.messages().send(data, function (error, body) {  // sends the email
    console.log(body);
  });
  data['text'] = '';  // data is a global var, needs to be emptied after usage
}