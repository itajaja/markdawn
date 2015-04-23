let Remarkable = require('remarkable');
let pdf = require('html-pdf');
let hljs = require('highlight.js');
let fs = require('fs');
let path = require('path');
let toc = require('markdown-toc');

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

function generateIndex(index, indexPath) {
  let indexText = fs.readFileSync(index, 'utf8');
  return `<!DOCTYPE html>
<base href="${indexPath}/" target="_blank, _self, _parent, _top">
${indexText}`;
}

// parse the multimarkdown-style metadata
function parseMetadata(text) {
  let lines = text.split('\n');
  let metadata = {};

  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!line || line.indexOf(':') === -1) {
      break;
    }
    let index = line.indexOf(':');
    let key = line.substr(0, index);
    let val = line.substr(index + 1);
    metadata[key] = val;
  }

  metadata.$count = i;
  return metadata;
}

function stripMetadata(text, count) {
  let lines = text.split('\n');
  lines.splice(0, count);
  return lines.join('\n');
}

function addToc(text, html) {
  let tocObj = {
    TOC: md.render(toc(text).content)
  };
  return utils.interpolate(html, tocObj);
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

    let indexPath = path.dirname(path.resolve(index));
    let html = generateIndex(index, indexPath);

    // process metedata
    let metadata = parseMetadata(text);
    text = stripMetadata(text, metadata.$count);
    html = utils.interpolate(html, metadata);

    // add TOC
    html = addToc(text, html);

    // insert markdown into index html
    html = utils.interpolate(html, {
      content: md.render(text)
    });

    let pdfOptions = require(path.resolve(indexPath, 'page.json'));
    pdfOptions.filename = `./${out}`;

    pdf.create(html, pdfOptions).toFile(function(err) {
      if (err) {
        return console.error(err);
      }
    });

    return html;
  }
};
