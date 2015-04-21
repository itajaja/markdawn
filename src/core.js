let Remarkable = require('remarkable');
let pdf = require('html-pdf');
let hljs = require('highlight.js');
let fs = require('fs');
let path = require('path');

let config = require('./config');
let utils = require('./utils');

let md = new Remarkable({
  linkify: false,
  typographer: true,
  html: true,
  quotes: '“”‘’',
  _strict: false,
  highlight: function (str, lang) {

    function logErr() {
      console.warn(`highlighting failed for the following snippet ${str}`);
    }

    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        logErr();
      }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {
      logErr();
    }

    return ''; // use external default escaping
  }
});

function generateIndex(index) {
  let indexText = fs.readFileSync(index, 'utf8');
  return `<base href="${path.resolve(index)}" target="_blank, _self, _parent, _top">
    ${indexText}`;
}

module.exports.markdawn = {

  /**
   * generate the pdf document with the following input
   * @param text the markdwon text to insert in the docuement
   * @param out the path to the output file
   * @param index the path to the `index.html` file
   * @return the html that generates the pdf, useful for debugging purposes
   */
  generate: (text, out, index) => {

    // sanitize input
    if (!text) {
      console.warn('the input text is empty');
    }
    out = out || 'out.pdf';
    if (!index || fs.existsSync(index)) {
      console.warn(`the index file provided (${index}) doesn't exist. Markdawn will use the default theme`);
      index = config.defaultTheme;
    }

    let indexText = generateIndex(index);

    let html = utils.interpolate(indexText, {
      content: md.render(text)
    });

    let pdfOptions = {
      filename: `./${out}`,
      format: 'Letter'
    };

    pdf.create(html, pdfOptions).toFile(function(err) {
      if (err) {
        return console.log(err);
      }
    });

    return html;
  }
};
