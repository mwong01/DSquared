const url = require('url');

function fullURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
  });
};


const buildChoicesObject = function (data){

  let objectDATA = {};
  let sizeNumber = 0;
  let choiceArray = [];
  data.forEach((value) => {
    choiceArray.push(value['choicesub']);
  });
  sizeNumber = choiceArray.length;
  objectDATA['choices'] = sizeNumber;
  objectDATA['choiceSub'] = choiceArray;

  return objectDATA;
};

const buildChoicesArray = function (data){
  let choiceArray = [];
  data.forEach((value) => {
    choiceArray.push(value['choicesub']);
  });
  return choiceArray;
};

// Copy links to clipboard
function copyAdminLink() {
  var copyText = document.getElementById("admin_link");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function copyPublicLink() {
  var copyText = document.getElementById("public_link");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

module.exports = {fullURL, buildChoicesObject, copyAdminLink, copyPublicLink, buildChoicesArray};
