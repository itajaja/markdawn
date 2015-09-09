'use strict';

var cheerio = require('cheerio');
var path = require('path');

module.exports = {

  /**
   * Interpolate object values into the input using double curly braces interpolation
   */
  interpolate: function interpolate(input, object) {
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var exp = new RegExp('{{' + key + '}}', 'g');
        input = input.replace(exp, object[key]);
      }
    }
    return input;
  },

  /**
   * Change extension of a file
   */
  changeExtension: function changeExtension(fileName, extension) {
    var to = fileName.lastIndexOf('.');

    if (to < 0) {
      to = fileName.length;
    }

    var name = fileName.substr(0, to);
    return name + '.' + extension;
  },

  /**
   * rebase all the html attributes to a specified base path
   */
  rebaseAttribute: function rebaseAttribute(html, basePath, attr) {
    var $ = cheerio.load(html);
    $('*[' + attr + ']').filter(function (key, val) {
      // test that the attribute value is indeed a local resource
      var match = !/^http:\/\/|^https:\/\/|^#/.test(val.attribs[attr]);
      return match;
    }).attr(attr, function () {
      // rebase the attribute
      var absPath = path.resolve(basePath, this.attribs[attr]);
      // make sure it's a valid URI.
      return absPath[0] === '/' ? 'file://' + absPath : absPath;
    });
    return $.html();
  }
};