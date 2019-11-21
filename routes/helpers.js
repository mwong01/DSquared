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
  sizeNumber = data.length -1;  // gives us the number for the last spot on array
  const lastArray = data[sizeNumber]; // copies the inner object at the end of the array
  const findChoices = lastArray['choices'];
  const changeInt = parseInt(findChoices);
  objectDATA['choices'] = changeInt;
  let choiceArray = [];
  data.forEach((value) => {
    choiceArray.push(value['choicesub']);
  });
  objectDATA['choiceSub'] = choiceArray;
  return objectDATA;
};

module.exports = {fullURL, buildChoicesObject};