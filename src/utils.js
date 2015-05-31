let cheerio = require('cheerio');
let path = require('path');

module.exports = {

  /**
   * Interpolate object values into the input using double curly braces interpolation
   */
  interpolate: (input, object) => {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var exp = new RegExp(`{{${key}}}`, 'g');
        input = input.replace(exp, object[key]);
      }
    }
    return input;
  },

  /**
   * Change extension of a file
   */
  changeExtension: (fileName, extension) => {
    var to = fileName.lastIndexOf('.');

    if (to < 0) {
      to = fileName.length;
    }

    var name = fileName.substr(0, to);
    return `${name}.${extension}`;
  },

  /**
   * rebase all the html attributes to a specified base path
   */
  rebaseAttribute: (html, basePath, attr) => {
    let $ = cheerio.load(html);
    $(`*[${attr}]`)
      .filter(function(key, val) {
        // test that the attribute value is indeed a local resource
        let match = !(/^http:\/\/|^https:\/\/|^#/).test(val.attribs[attr]);
        return match;
      })
      .attr(attr, function() {
        // rebase the attribute
        return 'file://' + path.resolve(basePath, this.attribs[attr]);
      });
    return $.html();
  }
};
