let Remarkable = require('remarkable');
let pdf = require('html-pdf');
let hljs = require('highlight.js');
let fs = require('fs');
let path = require('path');
let toc = require('markdown-toc');
let cheerio = require('cheerio');

let config = require('./config');
let utils = require('./utils');

let md = new Remarkable('full', {
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
  return `<!DOCTYPE html>
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

function absoultePaths(html, indexPath) {
  let $ = cheerio.load(html);
  let refs = $('*[href]')
    // .toArray()
    .filter(function(key, val) {
      // test that the href value is indeed a local resource
      let match = !(/^http:\/\/|^https:\/\/|^#/).test(val.attribs.href)
      return match;
    })
    .attr('href', function(){
      return path.resolve(indexPath, this.attribs.href);
    });
    return $.html();
}

module.exports = {

  /**
   * generate the pdf document with the following input
   * @param text the markdwon text to insert in the docuement
   * @param opts object containing configuration keys for generating the pdf
   *   - index: path to the index.html file that defines a theme
   *   - format: (e.g. "Letter", "A4") overrides the format specified in the theme
   *   - out: name of output file
   *   - theme: name of a preconfigured theme to use (this property has priority over the `index` property)
   * @return the html that generates the pdf, useful for debugging purposes
   */
  generate: (text, opts) => {

    // sanitize input
    opts = opts || {};
    if (!text) {
      console.warn('the input text is empty');
    }
    let out = opts.out || 'out.pdf';

    let index = opts.index;
    if (opts.theme) {
      // select the theme
      index = path.resolve(config.themePath, opts.theme, 'index.html');
    }

    // validate that the index file exists
    if (!index || !fs.existsSync(index)) {
      console.warn(`Warning: the index file provided (${index}) doesn't exist. Markdawn will use the default theme`);
      index = config.defaultTheme;
    }

    let indexPath = path.dirname(path.resolve(index));
    let html = generateIndex(index);

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

    html = absoultePaths(html, indexPath);

    let pdfOptions = {};
    try {
      pdfOptions = require(path.resolve(indexPath, 'page.json'));
    }catch(e) {
      console.warn(`Warning: missing file page.json in the index folder (${index}). Using default page settings`);
    }

    if (opts.format) {
      // overwrite the format
      pdfOptions.format = opts.format;
    }
    pdfOptions.filename = `./${out}`;

    pdf.create(html, pdfOptions).toFile(function(err) {
      if (err) {
        return console.error(err);
      }
    });

    return html;
  },

  /**
   * get the list of preconfigured thems that can be used
   * @return a list of strings, each string representing a name of a theme
   */
  getThemes: () => {
    return fs.readdirSync(config.themePath);
  }
};
