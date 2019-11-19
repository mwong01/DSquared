// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const pollsRoutes = require("./routes/polls");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/polls", pollsRoutes(db));
app.use("/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

///////////////////////////////
// url library
///////////////////////////////

const url = require('url');

///////////////////////////////
///////////////////////////////

//////////////////////////////
// random generator library
//////////////////////////////

const uuidv4 = require('uuid/v4');

///////////////////////////////
///////////////////////////////

//////////////////////////
//mail-gun library
//////////////////////////

const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxb6a25036350f4605b9c501db6b4cee76.mailgun.org';
const mg = mailgun({apiKey: '04783a38c46ee64d48b42a58ee1227b2-09001d55-98b334e0', domain: DOMAIN});
const data = {
	from: 'Excited User <the_morbidus@hotmail.com>',
	to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
	subject: 'Hello',
	text: ''
};


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const tempVar = req.body;
  const email = tempVar['email'];

  const shortURL = uuidv4();  // creates a random number for shortURL

  const startURL = req.headers.referer; //obtains href to attach to generated numbers

  const voteURL = startURL + shortURL;  // voter url

  const creatorURL = uuidv4();    // generates a random number for the admin

  const adminURL = startURL + creatorURL;  // admin address

  data['to'] = email;
  data['text'] += 'Your poll name ' + tempVar.title + ' has been created. <br> Here is the voting link: ' + voteURL + ' .<br> Here is the admin link: ' + adminURL;
  mg.messages().send(data, function (error, body) {  // sends the email
    console.log(body);
  });
  data['text'] = '';  // data is a global var, needs to be emptied after usage


  if (req.body.title === "" || req.body.email === "") {
    res.status(400);
    res.send("400 error - Bad Request: No title or email entered. Please try again");   
  } else {
    
  }
  res.redirect("/polls")
});

app.listen(PORT, process.env.IP, function(){
  console.log(`Example app listening on port ${PORT}`);
});