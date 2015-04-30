'use strict';

var Remarkable = require('remarkable');
var pdf = require('html-pdf');
var hljs = require('highlight.js');
var fs = require('fs');
var path = require('path');
var toc = require('markdown-toc');
var cheerio = require('cheerio');

var config = require('./config');
var utils = require('./utils');

var md = new Remarkable('full', {
  linkify: false,
  typographer: true,
  html: true,
  quotes: '“”‘’',
  _strict: false,
  highlight: function highlight(str, lang) {

    function logErr() {
      console.warn('highlighting failed for the following snippet ' + str);
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
  var indexText = fs.readFileSync(index, 'utf8');
  return '<!DOCTYPE html>\n' + indexText;
}

// parse the multimarkdown-style metadata
function parseMetadata(text) {
  var lines = text.split('\n');
  var metadata = {};

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line || line.indexOf(':') === -1) {
      break;
    }
    var index = line.indexOf(':');
    var key = line.substr(0, index);
    var val = line.substr(index + 1);
    metadata[key] = val;
  }

  metadata.$count = i;
  return metadata;
}

function stripMetadata(text, count) {
  var lines = text.split('\n');
  lines.splice(0, count);
  return lines.join('\n');
}

function addToc(text, html) {
  var tocObj = {
    TOC: md.render(toc(text).content)
  };
  return utils.interpolate(html, tocObj);
}

function absoultePaths(html, indexPath) {
  var $ = cheerio.load(html);
  var refs = $('*[href]')
  // .toArray()
  .filter(function (key, val) {
    // test that the href value is indeed a local resource
    var match = !/^http:\/\/|^https:\/\/|^#/.test(val.attribs.href);
    return match;
  }).attr('href', function () {
    return path.resolve(indexPath, this.attribs.href);
  });
  return $.html();
}

module.exports.markdawn = {

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
  generate: function generate(text, opts) {

    // sanitize input
    if (!text) {
      console.warn('the input text is empty');
    }
    var out = opts.out || 'out.pdf';

    var index = opts.index;
    if (opts.theme) {
      // select the theme
      index = path.resolve(config.themePath, opts.theme, 'index.html');
    }

    // validate that the index file exists
    if (!index || !fs.existsSync(index)) {
      console.warn('Warning: the index file provided (' + index + ') doesn\'t exist. Markdawn will use the default theme');
      index = config.defaultTheme;
    }

    var indexPath = path.dirname(path.resolve(index));
    var html = generateIndex(index);

    // process metedata
    var metadata = parseMetadata(text);
    text = stripMetadata(text, metadata.$count);
    html = utils.interpolate(html, metadata);

    // add TOC
    html = addToc(text, html);

    // insert markdown into index html
    html = utils.interpolate(html, {
      content: md.render(text)
    });

    html = absoultePaths(html, indexPath);

    var pdfOptions = {};
    try {
      pdfOptions = require(path.resolve(indexPath, 'page.json'));
    } catch (e) {
      console.warn('Warning: missing file page.json in the index folder (' + index + '). Using default page settings');
    }

    if (opts.format) {
      // overwrite the format
      pdfOptions.format = opts.format;
    }
    pdfOptions.filename = './' + out;

    pdf.create(html, pdfOptions).toFile(function (err) {
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
  getThemes: function getThemes() {
    return fs.readdirSync(config.themePath);
  }
};