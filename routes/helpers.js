const url = require('url');

function fullURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
  });
} 

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
}

module.exports = {fullURL, buildChoicesObject};