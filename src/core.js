var Remarkable = require('remarkable');
var pdf = require('html-pdf');

var md = new Remarkable();

module.exports.markdawn = {

  // generate the pdf document with the following input
  generate: (text, out, css) => {

    var options = {
      filename: `./${out}`,
      format: 'Letter'
    };

    var html = md.render(text);
    html = `<!DOCTYPE html><html><body><article class="markdown-body">${html}</article></body><style>${css}</style></html>`

    pdf.create(html, options).toFile(function(err, res) {
      if (err) return console.log(err);
    });
  }
};
