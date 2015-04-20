var Remarkable = require('remarkable');
var pdf = require('html-pdf');
var hljs = require('highlight.js');
var fs = require('fs');

var md = new Remarkable({
  linkify: false,
  typographer:  true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

module.exports.markdawn = {

  // generate the pdf document with the following input
  generate: (text, out, css) => {

    var pdfOptions = {
      filename: `./${out}`,
      format: 'Letter'
    };

    var highlightCss = fs.readFileSync('node_modules/highlight.js/styles/solarized_light.css', 'utf8');

    var html = md.render(text);
    html = `<!DOCTYPE html>
      <html>
        <body>
          <article class="markdown-body">${html}</article>
        </body>
        <style>${css}</style>
        <style>
          ${highlightCss}
        </style>
      </html>`;

    console.log(html);

    pdf.create(html, pdfOptions).toFile(function(err, res) {
      if (err) return console.log(err);
    });
  }
};
