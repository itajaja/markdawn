var Remarkable = require('remarkable');

var md = new Remarkable();

module.exports.markdawn = {

  // generate the document with the following input
  generate: (text) => {
    return md.render(text);
  }
};
